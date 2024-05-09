import React, { useContext, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from '@mui/material';
import './Registration.css';
import { Link } from 'react-router-dom';
import { ValueContext } from '../App';
import axios from 'axios';
import bcryptjs from 'bcryptjs';
import LoadingPage from './LoadingPage';

const Registration = () => {
  const { registerFormState, setRegisterFormState } = useContext(ValueContext);
  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL

  //console.log(registerFormState, "username");

  const [loading, setLoading] = useState(false);
  const [usernameExistsMsg, setUsernameExistsMsg] = useState('');

  // const hash = async () => {
  //   const hashPassword =await bcryptjs.hash("password", 0);
  //     console.log(hashPassword);

  // }


  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      if (values) {
        const response = await axios.get(`${apiUrl}/findUserName?username=${values.username}`);
        if (response.data._id) {
          alert("Username already exists try another name!")
        }
        //console.log(response.data._id, "response");
      }
    } catch (err) {
      const errorName = err.response.data.error
      console.log(err.response.data.error, "err");

      if (errorName === "User not found") {
        const hashPassword = await bcryptjs.hash(values.password, 0);
        //console.log(hashPassword, "hashPassword");
        // const compare = await bcryptjs.compare(values.password, hashPassword)
        // console.log(compare, "compare");
        await axios.post(`${apiUrl}/registration`, {
          username: values.username,
          password: hashPassword,
          phonenumber: values.phonenumber,
        });
        setRegisterFormState(
          ...registerFormState,
          values);
        // Reset form after successful submission
        values.username = '';
        values.password = '';
        values.phonenumber = '';
      }

    }
    setLoading(false);
  };

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
          onSubmit={(values) =>
            handleFormSubmit(values)
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

              {loading ? <LoadingPage />
               : 
               <button type="submit" className="btn btn-primary" disabled={loading}>
                Register
              </button>}

            </div>{' '}
            <br />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Registration;