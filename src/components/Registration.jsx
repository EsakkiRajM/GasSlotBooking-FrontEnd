import React, { useContext, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from '@mui/material';
import './Registration.css';
import { Link } from 'react-router-dom';
import { ValueContext } from '../App';
import axios from 'axios';

const Registration = () => {
  const { registerFormState, setRegisterFormState } = useContext(ValueContext);
  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL

  const [loading, setLoading] = useState(false);
  const [usernameExistsMsg, setUsernameExistsMsg] = useState('');

  const handleFormSubmit = async (values) => {
    setLoading(true);
    
    try {
      const handleCheckUserName = await handleCheckUserName();
      if (handleCheckUserName) {
        alert("Username Already Exists try another one!")
      }
      else {
        await axios.post(`${apiUrl}/registration`, {
          username: values.username,
          password: values.password,
          phonenumber: values.phonenumber,
        });
        setRegisterFormState(values);
        // Reset form after successful submission
        values.username = '';
        values.password = '';
        values.phonenumber = '';
      }

    } catch (error) {
      console.error('Error occurred while registering user:', error);
      // Handle error, show error message to the user
    }
    setLoading(false);
  };

  const handleCheckUserName = async (username) => {

    const response = await axios.get(`${apiUrl}/findUserName?username=${username}`);
    console.log(response.data);
    if (response.data) {
      setUsernameExistsMsg('Username already exists');
    } else {
      setUsernameExistsMsg('');
    }
  };

  const handleFocus = () => {
    setUsernameExistsMsg("");
  }

  return (
    <div className="background-container">
      <div className="position-absolute top-50 start-50 translate-middle form-container">
        <Formik
          initialValues={{
            username: '',
            password: '',
            phonenumber: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Username is Required';
            }
            if (!values.password) {
              errors.password = 'Password is Required';
            }
            if (!values.phonenumber) {
              errors.phonenumber = 'Phone Number No is Required';
            }
            return errors;
          }}
          onSubmit={(values) => {
            handleFormSubmit(values)
          }
          }
        >
          <Form>
            <h4 className="text-center text-primary">REGISTER HERE !</h4>
            <div className="text-center">
              <Field name="username">
                {({ field }) => (
                  <>
                    <TextField
                      {...field}
                      id="standard-basic"
                      label="Enter your Email"
                      variant="standard"
                      type="email"
                      onBlur={() => handleCheckUserName(field.value)}
                    />
                    {usernameExistsMsg ? <div className="text-danger">{usernameExistsMsg}</div> : ""}
                  </>
                )}
              </Field>{' '}
              <br />
              <ErrorMessage name="username" component="div" className="text-danger" />

              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="standard-basic"
                    label="Enter your Password"
                    variant="standard"
                    type="password"
                    onFocus={handleFocus}
                  />
                )}
              </Field>{' '}
              <br />
              <ErrorMessage name="password" component="div" className="text-danger" />
              <Field name="phonenumber">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="standard-basic"
                    label="Enter your Mobile No"
                    variant="standard"
                    type="number"
                  />
                )}
              </Field>{' '}
              <br />
              <ErrorMessage name="phonenumber" component="div" className="text-danger" />
            </div>
            <div className="mt-3">
              <p>
                Already you have an account{' '}
                <Link to={'/login'} className="link-offset-2 link-underline link-underline-opacity-0">
                  login
                </Link>
              </p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>{' '}
            <br />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
