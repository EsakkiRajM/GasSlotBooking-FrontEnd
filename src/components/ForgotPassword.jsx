import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Alert, TextField } from '@mui/material';
import './Registration.css';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL
  // Local state
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [isShowAlertMsg, setIsShowAlertMsg] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      if (values) {
        const response = await axios.get(`${apiUrl}/findUserName?username=${values.username}`);
        if (response.data._id) {
          // alert("Username already exists try another name!")
          navigate("/createpassword")

        }
        setIsShowAlertMsg(false);
        //console.log(response.data._id, "response");
      }
    } catch (err) {
      const errorName = err.response.data.error
      console.log(errorName, "err");
        if (errorName === "User not found") {
          //alert('username not found')
          setIsShowAlertMsg(true);
          setAlertMsg("Incorrect Username")
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
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Username is Required';
            }
            return errors;
          }}

          onSubmit={(values) => handleFormSubmit(values)}

        >
          <Form>
            <h4 className="text-center text-primary">FORGOT PASSWORD !</h4>
            <div className="text-center mt-3">
              <Field name="username">
                {({ field }) => (
                  <>
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Enter your Email"
                      variant="outlined"
                      type="email"
                    />
                  </>
                )}
              </Field>{' '}
            </div>
            <ErrorMessage name="username" component="div" className="text-danger text-center" />
            {
              isShowAlertMsg && <div><Alert severity="error"> {alertMsg} </Alert></div>
            }
            <div className="text-center mt-3">

              {loading ? <LoadingPage />
                :
                <button type="submit" className="btn btn-primary">Reset Your Password</button>}

            </div>{' '}
            <br />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;