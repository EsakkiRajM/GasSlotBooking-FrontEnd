import React, { useContext, useEffect } from 'react';
import { ValueContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyBooking = () => {
  const { sideBarValue, bookingDetails,
    setEditBookingDetails, usernameLocalState,
    setEditBookingPage, setEditBookingId
  } = useContext(ValueContext);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BE_URL; // Ensure the correct backend URL

  const handleGetEditButton = async (bookingId) => {
    setEditBookingPage(true);
    const response = await axios.get(`${apiUrl}/getEditBookingDetails?username=${usernameLocalState}&bookingId=${bookingId}`)
    //console.log(response.data);
    setEditBookingDetails(response.data);
    setEditBookingId(bookingId);
  }

  //console.log(editBookingDetails, "editBookingDetails");
  return (
    <div>
      <div className='text-center'>
        <h4>{sideBarValue ? sideBarValue : "Welcome to Gas Booking Select Your page"}</h4>
      </div>
      <div className='table-responsive mt-3'>
        <table className='table table-bordered table-info table-striped'>
          <thead>
            <tr className='text-center'>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gas Provider Name</th>
              <th scope="col">Date</th>
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
                  <td> {customerDetails.firstName + " " + customerDetails.lastName} </td>
                  <td> {customerDetails.email} </td>
                  <td> {customerDetails.gasProviderName} </td>
                  <td> {customerDetails.DateTime} </td>
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
