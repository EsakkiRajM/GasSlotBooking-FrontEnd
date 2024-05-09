import React, { useContext, useEffect } from 'react';
import { ValueContext } from '../../App';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const MyBooking = () => {
    const { sideBarValue, bookingDetails, setBookingDetails, usernameLocalState } = useContext(ValueContext);
    const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL

    // useEffect(() => {
    //     const fetchBookingDetails = async () => {
    //         try {
                // const response = await axios.get(`${apiUrl}/getBookingDetails?username=${usernameLocalState}`);
                // setBookingDetails(response.data);
    //         } catch (error) {
    //             console.error('Error fetching booking details:', error);
    //         }
    //     };

    //     fetchBookingDetails(); // Fetch booking details when the component mounts
    // }, [apiUrl, usernameLocalState, setBookingDetails]); // Empty dependency array ensures it runs only once on mount

    console.log(usernameLocalState);

    const handleViewBooking = async () => {
        const response = await axios.get(`${apiUrl}/getBookingDetails?username=${usernameLocalState}`);
            setBookingDetails(response.data);
    }

    const handleGetEditButton = (customerId) => {
      console.log(customerId, "customerId");
    }

    console.log(bookingDetails, "bookingDetails");
    return (
        <div>
            <div className='text-center'>
                <h4>{sideBarValue ? sideBarValue : "Welcome to Gas Booking Select Your page"}</h4>
            </div>
            <div className='text-center'>
                <button className='btn btn-primary' onClick={handleViewBooking} >View Your Bookings</button>
            </div>
            {/* <div>
                {bookingDetails && Array.isArray(bookingDetails) && bookingDetails.map((data) => {
                    return <div key={data.id}>{data.email}</div>; // Replace "someProperty" with the property you want to display
                })}
            </div> */}
            <div className='table-responsive mt-3'>
          <table className='table table-bordered table-info table-striped'>
            <thead>
              <tr className='text-center'>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gas Provider Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            {
              bookingDetails.map((customerDetails, index) => {
                //console.log(book, "book");
                return <tbody key={index}>
                  <tr className='text-center'>
                    <th scope="row"> {index + 1} </th>
                    <td> {customerDetails.firstName +" "+ customerDetails.lastName} </td>
                    <td> {customerDetails.email} </td>
                    <td> {customerDetails.gasProviderName} </td>
                    <td> {customerDetails.phoneNumber} </td>
                    <td> {`${customerDetails.addressOne},  ${customerDetails.addressTwo} -
                    ${customerDetails.pinCode}
                    `} </td>
                    <td className='text-center'> <button className='btn btn-info' onClick={() => handleGetEditButton(customerDetails._id)} >
                      <FontAwesomeIcon icon={faPen} />
                    </button> </td>
                    {/* <td className='text-center'> <button className='btn btn-info'
                      onClick={() => handleDelete(author.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button> </td> */}
                  </tr>
                </tbody>

              })

            }
          </table>
        </div>

        </div>
    );
}

export default MyBooking;
