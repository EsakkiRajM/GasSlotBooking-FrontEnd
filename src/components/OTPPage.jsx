import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Alert, TextField } from '@mui/material';
import './Registration.css';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';


const OTPPage = () => {
  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend 

  // Local state
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [isShowAlertMsg, setIsShowAlertMsg] = useState(false);
  const navigate = useNavigate();

  const OTP = localStorage.getItem("OTP");
  const username = localStorage.getItem("username")

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      if (values) {
        const response = await axios.get(`${apiUrl}/submitOTP?username=${username}&otp=${OTP}`);
        //console.log(response.data);
        if (values.OTP) {
          navigate("/confirmPassword")
          localStorage.removeItem("OTP")
        }
        setIsShowAlertMsg(false);
        //console.log(response.data._id, "response");
      }
    } catch (err) {
      const errorName = err.response.data.error
      console.log(errorName, "err");
        // if (errorName === "User not found") {
        //   //alert('username not found')
        //   setIsShowAlertMsg(true);
        //   setAlertMsg("Incorrect Username")
        // }
    };
    setLoading(false);
  }

  return (
    <div className="background-container">
      <div className="position-absolute top-50 start-50 translate-middle form-container">
        <Formik
          initialValues={{
            OTP: OTP.toString(),
          }}
          validate={(values) => {
            const errors = {};
            if (!values.OTP) {
              errors.OTP = 'OTP is Required';
            }
            return errors;
          }}

          onSubmit={(values) => handleFormSubmit(values)}

        >
          <Form>
            <h4 className="text-center text-primary">ENTER VALID OTP !</h4>
            <div className="text-center mt-3">
              <Field name="OTP">
                {({ field }) => (
                  <>
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Enter Your OTP"
                      variant="outlined"
                      type="text"
                    />
                  </>
                )}
              </Field>{' '}
            </div>
            <ErrorMessage name="OTP" component="div" className="text-danger text-center" />
            {
              isShowAlertMsg && <div><Alert severity="error"> {alertMsg} </Alert></div>
            }
            <div className="text-center mt-3">

              {loading ? <LoadingPage />
                :
                <button type="submit" className="btn btn-primary">Submit OTP</button>}

            </div>{' '}
            <br />
          </Form>
        </Formik>
      </div>
    </div>
    // MUI 
  );
};

export default OTPPage;