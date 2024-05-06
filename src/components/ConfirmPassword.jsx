import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from '@mui/material';
import './Registration.css';
import axios from 'axios';
import bcryptjs from 'bcryptjs';
import LoadingPage from './LoadingPage';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const ConfirmPassword = () => {
  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const username = localStorage.getItem("username")

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {

        const hashPassword = await bcryptjs.hash(values.password, 0);

        if(values.username && values.password) {
            const response = await axios.patch(`${apiUrl}/changePassword?username=${values.username}&password=${hashPassword}`);
            //console.log(response.data);
            alert("Password changed successfully")
            navigate("/login")
        }
      
      setLoading(false);
      // Clear form after successful submission
      values.username = '';
      values.password = '';
      values.confirmPassword = '';
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  const handleClickShowPassword = (field) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  return (
    <div className="background-container">
      <div className="position-absolute top-50 start-50 translate-middle form-container">
        <Formik
          initialValues={{
            username: username,
            password: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Username is Required';
            }
            if (!values.password) {
              errors.password = 'Password is Required';
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Confirm Password is Required';
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
          }}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          <Form>
            <h4 className="text-center text-primary">CONFIRM PASSWORD !</h4>
            <div className="text-center">
              <Field name="username">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    disabled
                  />
                )}
              </Field>{' '}
              <br />

              <Field name="password">
                {({ field }) => (
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword('password')}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                )}
              </Field>{' '}
              <br />
              <ErrorMessage name="password" component="div" className="text-danger" />

              <Field name="confirmPassword">
                {({ field }) => (
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword('confirmPassword')}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                )}
              </Field>{' '}
              <br />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <div className="text-center">
              {loading ? <LoadingPage /> : <button type="submit" className="btn btn-primary">Submit</button>}
            </div>{' '}
            <br />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ConfirmPassword;
