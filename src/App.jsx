import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Registration from "./components/Registration";
import Login from "./components/Login";
import { createContext, useState } from 'react';
import ForgotPassword from './components/ForgotPassword';
import CreatePassword from './components/CreatePassword';
import OTPPage from './components/OTPPage';
import Demo from './components/Demos';
import ConfirmPassword from './components/ConfirmPassword';

export const ValueContext = createContext();


const App = () => {

  const [ registerFormState, setRegisterFormState ] = useState([])
  const [ OTPPageState, setOTPPageState ] = useState({});

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
          path: "/Demo",
          element: <Demo />
        },
        {
          path: "/confirmPassword",
          element: <ConfirmPassword />
        }
    ])

  return (
    <div>
      <ValueContext.Provider value={ {registerFormState, setRegisterFormState,
        OTPPageState, setOTPPageState
      } }>
      <RouterProvider router={router} />
      </ValueContext.Provider>
    </div>
  )
}

export default App;