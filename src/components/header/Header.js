import React from 'react'
import "./header.css"
import { FaHome } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"

function Header() {

  const categories = ["Health", "Food", "Travel", "Technology"];
  let navigate=useNavigate();

  return (
    <div className='header-container'>
      <FaHome className='home-icon' onClick={()=>navigate("/")}/>
      {
        categories.map(item=>{
          return <Link className='nav-link' to={`/categories/${item}`}>{item}</Link>
        })
      }
      <Link className='auth-link' to={`/auth`}>Signup</Link>
    </div>
  )
}

export default Header