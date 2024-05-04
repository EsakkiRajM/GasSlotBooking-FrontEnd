import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Registration from "./components/Registration";
import Login from "./components/Login";
import { createContext, useState } from 'react';
import ForgotPassword from './components/ForgotPassword';

export const ValueContext = createContext();


const App = () => {

  const [ registerFormState, setRegisterFormState ] = useState([])

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
    ])

  return (
    <div>
      <ValueContext.Provider value={ {registerFormState, setRegisterFormState,
        
      } }>
      <RouterProvider router={router} />
      </ValueContext.Provider>
    </div>
  )
}

export default App;