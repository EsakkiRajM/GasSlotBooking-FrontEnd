import React, { useContext } from 'react'
import { ValueContext } from '../App'
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './User/UserDashboard';
import { Link } from 'react-router-dom';

const Home = () => {

    const { isAdminLogIn } = useContext(ValueContext);

    const username = localStorage.getItem("username");

    //console.log(username);

  return (
    <div>
        {
            username ? isAdminLogIn ? <AdminDashboard /> : <UserDashboard />
            : 
            <div>Something went wrong go to <Link to={"/login"}>login</Link> page</div>
        }
    </div>
  )
}

export default Home