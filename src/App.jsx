import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Registration from "./components/Registration";


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
        }
    ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;