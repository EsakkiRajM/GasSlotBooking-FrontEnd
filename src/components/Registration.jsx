import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from '@mui/material';
import './Registration.css'
import { Link } from 'react-router-dom'

const Registration = () => {
  return (
    <div className="background-container">
      <div className="position-absolute top-50 start-50 translate-middle form-container">

        <Formik
          initialValues={{
            username: "",
            password: "",
            phonenumber: ""
          }}
        >
          <Form>
            <h4 className='text-center'>REGISTER HERE!</h4>
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
            <Field name="phonenumber">
              {({ field }) => (
                <TextField
                  {...field}
                  id="standard-basic"
                  label="Enter your Mob-no"
                  variant="standard"
                  type="number"
                />
              )}
            </Field> <br /> <br />
            <div>
              <p>Already have an account <Link to={"/login"} className='link-offset-2 link-underline link-underline-opacity-0' >login</Link></p>
            </div>
            <div className='text-center'>
              <button className='btn btn-primary'>Register</button>
            </div> <br />

          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Registration