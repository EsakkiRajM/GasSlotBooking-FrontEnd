import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Registration from "./components/Registration";
import Login from "./components/Login";


const App = () => {

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
          path: "login",
          element: <Login />
        }
    ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;