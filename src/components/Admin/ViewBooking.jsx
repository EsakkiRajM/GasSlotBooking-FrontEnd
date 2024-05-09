import React, { useContext } from 'react'
import { ValueContext } from '../../App'

const ViewBooking = () => {

    const { customerDetails, adminSideBarValue } = useContext(ValueContext);

    //console.log(customerDetails, "customerDetails");

  return (
    <div>
        <div className='text-center'>
        <h4>{adminSideBarValue ? adminSideBarValue : "Welcome to Gas Booking Select Your page"}</h4>
      </div>
      <div className='table-responsive mt-3'>
        <table className='table table-bordered table-info table-striped'>
          <thead>
            <tr className='text-center'>
              <th scope="col">S.No</th>
              <th scope="col">Order-Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gas Provider Name</th>
              <th scope="col">Date</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          {
            customerDetails.map((customerDetails, index) => {
              //console.log(book, "book");
              return <tbody key={index}>
                <tr className='text-center'>
                  <th scope="row"> {index + 1} </th>
                  <td scope="row"> { customerDetails._id } </td>
                  <td> {customerDetails.firstName + " " + customerDetails.lastName} </td>
                  <td> {customerDetails.email} </td>
                  <td> {customerDetails.gasProviderName} </td>
                  <td> {customerDetails.DateTime} </td>
                  <td> {customerDetails.phoneNumber} </td>
                  <td> {`${customerDetails.addressOne},  ${customerDetails.addressTwo} -
                    ${customerDetails.pinCode}
                    `} </td>
                </tr>
              </tbody>

            })

          }
        </table>
      </div>
  
    </div>
  )
}

export default ViewBooking