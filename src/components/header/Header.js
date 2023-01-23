import React,{useEffect} from 'react'
import "./header.css"
import { FaHome } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
import {auth} from "../../config/firebaseConfig"
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth';

function Header() {

  const categories = ["Health", "Food", "Travel", "Technology"];
  let navigate=useNavigate();
  const [user]=useAuthState(auth)



  

  return (
    <div className='header-container'>
      <FaHome className='home-icon' onClick={()=>navigate("/")}/>
      <div className='categories-container'>
        {
          categories.map(item=>{
            return <Link className='nav-link' to={`/categories/${item}`}>{item}</Link>
          })
        }
      </div>
     {
      user
      ? <div>
          <span className='username'>{user?.displayName ? user?.displayName : user?.email}</span>
          <button className='auth-link' onClick={()=>signOut(auth)}>Logout</button>
        </div>
      : <Link className='auth-link' to={`/auth`}>Signup</Link>
     }

    </div>
  )
}

export default Header