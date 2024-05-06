import React, { useContext } from 'react'
import { ValueContext } from '../App'

const Home = () => {

    const { isAdminLogIn } = useContext(ValueContext);

  return (
    <div>
        {
            isAdminLogIn ? <div>Welcome to admin page</div> : <div>Welcome to user page</div>
        }
    </div>
  )
}

export default Home