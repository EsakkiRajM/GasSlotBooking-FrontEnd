import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Alert, TextField } from '@mui/material';
import './Registration.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bcryptjs from 'bcryptjs';

const Login = () => {
  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg ] = useState("");
  const [isShowAlertMsg, setIsShowAlertMsg] = useState(false);
  
  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      if(values) {
        const response = await axios.get(`${apiUrl}/login?username=${values.username}&password=${values.password}`);
        console.log(response.data, "response");
        if(response.data.username === values.username){
            console.log("response data name is correct")
        }
        if(response.data.password) {
          console.log("password is true");
        }
        setIsShowAlertMsg(false);
        //console.log(response.data._id, "response");
      }
    } catch(err) {
      const errorName = err.response.data.message
      //console.log(errorName, "err");
      if(errorName === "Username not found") {
        //alert('username not found')
        setIsShowAlertMsg(true);
        setAlertMsg("username not found")
      } if(errorName === "Incorrect password"){
        //alert("Incorrect password")
        setAlertMsg("Incorrect password")
        setIsShowAlertMsg(true);
      }
      
  };
  setLoading(false);
}
  
  return (
    <div className="background-container">
      <div className="position-absolute top-50 start-50 translate-middle form-container">
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Username is Required';
            }
            if (!values.password) {
              errors.password = 'Password is Required';
            }
            return errors;
          }}
          
          onSubmit={(values) => handleFormSubmit(values)}

        >
          <Form>
            <h4 className="text-center text-primary">LOGIN HERE !</h4>
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
            </div> <br />
            {
              isShowAlertMsg && <div><Alert severity="error"> { alertMsg } </Alert></div>
            }
            <div className="mt-3">
              <p>
                Don't you have an account{' '}
                <Link to={'/register'} className="link-offset-2 link-underline link-underline-opacity-0">
                  Register
                </Link>
              </p>
              <p className='text-center'>
              <Link to={'/forgotPassword'} className="link-offset-2 link-underline link-underline-opacity-0">
                  Forgot Password
                </Link>
              </p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Login Loading...' : 'Login'}
              </button>
            </div>{' '}
            <br />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;