import React, { useContext } from 'react'
import { ValueContext } from '../../App'

const CustomerBooking = () => {

    //Global State
    const { sideBarValue, setSideBarValue } = useContext(ValueContext);



    return (
        <div>
            <div className='text-center'>
                <h4>
                    {sideBarValue ? sideBarValue : "Welcome to Gas Booking Select Your page"}
                </h4>
            </div>
        </div>
    )
}

export default CustomerBooking