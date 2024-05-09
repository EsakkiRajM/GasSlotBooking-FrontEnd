import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Registration from "./components/Registration";
import Login from "./components/Login";
import { createContext, useState } from 'react';
import ForgotPassword from './components/ForgotPassword';
import CreatePassword from './components/CreatePassword';
import OTPPage from './components/OTPPage';
import ConfirmPassword from './components/ConfirmPassword';
import Home from './components/Home';

export const ValueContext = createContext();


const App = () => {

  const [registerFormState, setRegisterFormState] = useState([])
  const [OTPPageState, setOTPPageState] = useState({});
  const [isAdminLogIn, setIsAdminLogIn] = useState(false);
  const [usernameLocalState, setUsernameLocalState] = useState("");
  const [sideBarValue, setSideBarValue] = useState("");
  const [adminSideBarValue, setAdminSideBarValue] = useState("");
  const [phoneNumberLocalState, setPhoneNumberLocalState] = useState("");
  const [bookingDateAndTime, setBookingDateAndTime] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [editBookingId, setEditBookingId] = useState("");
  const [ editBookingDetails, setEditBookingDetails ] = useState([])
  const [ editBookingPage, setEditBookingPage ] = useState(false);
  const [ customerDetails, setCustomerDetails ] = useState([]);


  const router = createBrowserRouter([
    {
      path: "",
      element: <Registration />,
      children: [
        {
          path: "register",
          element: <Registration />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />
    },
    {
      path: "/createpassword",
      element: <CreatePassword />
    },
    {
      path: "/OTPPage",
      element: <OTPPage />
    },
    {
      path: "/confirmPassword",
      element: <ConfirmPassword />
    },
    {
      path: "/Home",
      element: <Home />
    }

  ])

  return (
    <div>
      <ValueContext.Provider value={{
        registerFormState, setRegisterFormState,
        OTPPageState, setOTPPageState,
        isAdminLogIn, setIsAdminLogIn,
        usernameLocalState, setUsernameLocalState,
        sideBarValue, setSideBarValue,
        phoneNumberLocalState, setPhoneNumberLocalState,
        bookingDateAndTime, setBookingDateAndTime,
        bookingDetails, setBookingDetails,
        editBookingId, setEditBookingId,
        editBookingDetails, setEditBookingDetails,
        editBookingPage, setEditBookingPage,
        adminSideBarValue, setAdminSideBarValue,
        customerDetails, setCustomerDetails
      }}>
        <RouterProvider router={router} />
      </ValueContext.Provider>
    </div>
  )
}

export default App;