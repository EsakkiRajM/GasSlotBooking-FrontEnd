import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from '@mui/material';
import './Registration.css'
import { Link } from 'react-router-dom'
import { ValueContext } from '../App';
import axios from 'axios';

const Registration = () => {

  const { registerFormState, setRegisterFormState } = useContext(ValueContext);

  const apiUrl = import.meta.env.VITE_BE_URL;

  console.log(registerFormState, "registerFormState");

  const handleFormState = async () => {
    if (registerFormState.username && registerFormState.password && registerFormState.phonenumber) {
      await axios.post(`${apiUrl}/registration`, {
        username: registerFormState.username,
        password: registerFormState.password,
        phonenumber: registerFormState.phonenumber,
      })
    }
  }

  return (
    <div className="background-container">
      <div className="position-absolute top-50 start-50 translate-middle form-container">

        <Formik
          initialValues={{
            username: "",
            password: "",
            phonenumber: ""
          }}

          validate={
            (values) => {
              const errors = {};

              if (!values.username) {
                errors.username = "Username is Required"
              }
              if (!values.password) {
                errors.password = "Password is Required"
              }
              if (!values.phonenumber) {
                errors.phonenumber = "Phone Number No is Required"
              }
              return errors;
            }

          }

          onSubmit={(values, { resetForm }) => {
            setRegisterFormState(
              ...registerFormState,
              values
            )
            resetForm()
            handleFormState();
          }}

        >
          <Form>
            <h4 className='text-center text-primary'>REGISTER HERE !</h4>
            <div className='text-center'>
              <Field name="username">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="standard-basic"
                    label="Enter your Email"
                    variant="standard"
                    type="email"
                  />
                )}
              </Field> <br />
              <ErrorMessage name='username' component='div' className='text-danger' />

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
              </Field> <br />
              <ErrorMessage name='password' component='div' className='text-danger' />
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
              </Field> <br />
              <ErrorMessage name='phonenumber' component='div' className='text-danger' />

            </div>
            <div className='mt-3'>
              <p>Already you have an account <Link to={"/login"} className='link-offset-2 link-underline link-underline-opacity-0' >login</Link></p>
            </div>
            <div className='text-center'>
              <button type='submit' className='btn btn-primary'
                
              >Register</button>
            </div> <br />

          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Registration