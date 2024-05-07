import React, { useContext, useState } from 'react';
import { ValueContext } from '../../App';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Autocomplete, TextField } from '@mui/material';
import LoadingPage from '../LoadingPage';

const CustomerBooking = () => {
    //Global State
    const { sideBarValue, phoneNumberLocalState, usernameLocalState, setBookingDetails } = useContext(ValueContext);

    //console.log(usernameLocalState);

    const userId = localStorage.getItem("id")

    // Local state
    const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL
    const [loading, setLoading] = useState(false);
    const [gasProviderName, setGasProviderName] = useState("");

    //console.log(gasProviderName, "gasProviderName");

    const handleFormSubmit = async (values,  { resetForm }) => {
        setLoading(true);
        console.log(values);
        try {
            if (values) {
                const response = await axios.post(`${apiUrl}/createBooking?username=${usernameLocalState}`, {
                    firstName: values.firstname,
                    lastName: values.lastname,
                    email: values.email,
                    addressOne: values.address1,
                    addressTwo: values.address2,
                    phoneNumber: values.phonenumber,
                    pinCode: values.pincode,
                    gasProviderName: gasProviderName,
                    signUpId: userId
                })
                //console.log(response.data.message);
                if(response.data.message){
                    resetForm();
                    setGasProviderName("");
                }
                console.log(response.data, "response data");
                console.log(values, "values");
            }
        } catch (err) {
            const errorName = err.response.data;

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
                                    gasprovider: gasProviderName,
                                }}

                                validate={(values) => {
                                    const errors = {};
                                    if (!values.firstname) {
                                        errors.firstname = 'Firstname is Required';
                                    }
                                    if (!values.lastname) {
                                        errors.lastname = 'Lastname is Required';
                                    }
                                    if (!values.phonenumber) {
                                        errors.phonenumber = 'Phone Number is Required';
                                    }
                                    if (!values.pincode) {
                                        errors.pincode = 'Pincode Numberis Required';
                                    }
                                    if (!values.address1) {
                                        errors.address1 = 'Address1 is Required';
                                    }
                                    if (!values.address2) {
                                        errors.address2 = 'Address1 is Required';
                                    }
                                    // if (!values.gasprovider) {
                                    //     errors.gasprovider = 'Gas Provider is Required';
                                    // }
                                    return errors;
                                }}

                                onSubmit={(values, { resetForm }) => handleFormSubmit(values, { resetForm })}
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
                                                            type="number"
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
                                                            type="text"
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
                                                            type="text"
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
                                                            {...field}
                                                            freeSolo
                                                            id="free-solo-2-demo"
                                                            disableClearable
                                                            options={gasProviders.map((option) => option.label)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Gas providers"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        type: 'text',
                                                                    }}
                                                                />
                                                            )}
                                                            onChange={(event, newValue) => {
                                                                field.onChange(newValue); // Update form field value
                                                                setGasProviderName(newValue)
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </Field>

                                            <br />
                                        </div>
                                    </div>


                                    {/* <div className='row m-3'>
                                        <div className='text-center'>
                                            <div>
                                                <Date />
                                                Render Date component with handleDateSelection prop

                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="text-center m-2">
                                        {loading ? <LoadingPage /> :
                                            <button type="submit" className="btn btn-primary" disabled={loading} >Make Booking</button>

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
