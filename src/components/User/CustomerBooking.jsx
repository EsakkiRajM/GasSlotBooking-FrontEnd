import React, { useContext, useState } from 'react';
import { ValueContext } from '../../App';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { Autocomplete, TextField } from '@mui/material';
import LoadingPage from '../LoadingPage';
import Date from './Date';

const CustomerBooking = () => {
    //Global State
    const { sideBarValue, phoneNumberLocalState, usernameLocalState } = useContext(ValueContext);
    const formik = useFormikContext(); // Access Formik context

    // Local state
    const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (values) => {
        values.preventDefault();
        setLoading(true);

        try {
            if (values) {
                const response = await axios.get(`${apiUrl}/findUserName?username=${values.username}`);
                if (response.data._id) {
                    alert("Username already exists try another name!")
                }
            }
        } catch (err) {
            const errorName = err.response.data.error;

            // Handle error appropriately
            console.error(errorName);

            // Ensure to properly set state or perform other actions after error handling
        }

        setLoading(false);
    };

    const gasProviders = [
        { label: '' }, // Empty option
        { label: 'J J Gas Agency' },
        { label: 'Thiru Super Gas Agency' },
        { label: 'Deepak Agency' },
        { label: 'Book MY LPG' },
        { label: 'Deepam Gas Link' },
        { label: "Rsr Bharatgas Agency" },
        { label: 'Super Gas Thiru Enterprises' },
        { label: 'Green Gas Agency' },
        { label: 'Sathya Gas Agency' },
    ]

    const handleDateSelection = (selectedDate) => {
        formik.setFieldValue('selectedDate', selectedDate); // Update form value with selected date
        //formik.resetForm(); // Reset the form
    };


    return (
        <div>
            <div className='text-center'>
                <h4>
                    {sideBarValue ? sideBarValue : "Welcome to Gas Booking Select Your page"}
                </h4>
            </div>
            {sideBarValue &&
                <div>
                    <div className='card'>
                        <div>
                            <Formik
                                initialValues={{
                                    firstname: '',
                                    lastname: "",
                                    email: usernameLocalState,
                                    phonenumber: phoneNumberLocalState,
                                    pincode: "",
                                    address1: "",
                                    address2: "",
                                    gasprovider: "",
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
                                onSubmit={(values) => handleFormSubmit(values)}
                            >
                                <Form>
                                    <div className="row m-3">
                                        <div className='col-sm-6 col-12'>
                                            <Field name="firstname">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="First Name"
                                                            variant="outlined"
                                                            type="firstname"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="firstname" component="div" className="text-danger" />
                                        </div>
                                        <div className='col-sm-6 col-12'>
                                            <Field name="lastname">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="Last Name"
                                                            variant="outlined"
                                                            type="lastname"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="lastname" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="row m-3">
                                        <div className='col-sm-6 col-12'>
                                            <Field name="email">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="Email"
                                                            variant="outlined"
                                                            type="email"
                                                            style={{ width: '100%' }}
                                                            disabled
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className='col-sm-6 col-12'>
                                            <Field name="phonenumber">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="Phone Number"
                                                            variant="outlined"
                                                            type="phonenumber"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="phonenumber" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row m-3">
                                        <div className='col-sm-6 col-12'>
                                            <Field name="address1">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="Address 1"
                                                            variant="outlined"
                                                            type="address1"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="address1" component="div" className="text-danger" />
                                        </div>
                                        <div className='col-sm-6 col-12'>
                                            <Field name="address2">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="Address 2"
                                                            variant="outlined"
                                                            type="address2"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="address2" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="row m-3">
                                        <div className='col-sm-6 col-12'>
                                            <Field name="pincode">
                                                {({ field }) => (
                                                    <>
                                                        <TextField
                                                            {...field}
                                                            id="outlined-basic"
                                                            label="Pincode"
                                                            variant="outlined"
                                                            type="number"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                            <ErrorMessage name="pincode" component="div" className="text-danger" />
                                        </div>
                                        <div className='col-sm-6 col-12'>
                                            <Field name="gasprovider">
                                                {({ field }) => (
                                                    <>
                                                        <Autocomplete
                                                            freeSolo
                                                            id="free-solo-2-demo"
                                                            disableClearable
                                                            options={gasProviders.map((option) => option.label)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...field}
                                                                    {...params}
                                                                    label="Gas providers"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        type: 'text',
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </>
                                                )}
                                            </Field>{' '}
                                            <br />
                                        </div>
                                    </div>


                                    <div className='row m-3'>
                                        <div className='text-center'>
                                            <div>
                                                <Date handleDateSelection={handleDateSelection} />
                                                {/* Render Date component with handleDateSelection prop */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center m-2">
                                        {loading ? <LoadingPage /> :
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                Make Booking
                                            </button>
                                        }
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CustomerBooking;
