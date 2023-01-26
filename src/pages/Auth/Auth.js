import React, {useState} from 'react'
import "./auth.css"
import {auth} from "../../config/firebaseConfig"
import { createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function Auth() {
let navigate = useNavigate();
const [existingUser,setExistingUser]=useState(true)
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const [userinfo, setUserInfo]=useState({
  name:"",
  email:"",
  password:"",
})



const handleLogin=(e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password)
  .then(res=>{
    navigate("/")
  })
  .catch(err=>{
    alert(err.message)
  })
}
const handleSignup=(e)=>{
  e.preventDefault();
  
  createUserWithEmailAndPassword(auth,email,password)
  .then(res=>{
    navigate("/")
    updateProfile(auth.currentUser,{displayName:name})
    setExistingUser(true)
  })
  .catch(err=>{
    console.log(err)
  })

}

  return (
    <div>
      {
        existingUser 
        ? <form className='auth-form' onSubmit={handleLogin}>
            <h1>Login with your email</h1>
            <div className='form-group'>
              <input type="email"  value={email || "" }placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} required />
              <input  value={password || "" } type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
            <p>Don't have an account? <span onClick={()=>setExistingUser(false)}>SignUp</span></p>
            </form> 
          : <form className='auth-form' onSubmit={handleSignup}>
            <h1>Signup with your email</h1>
            <div className='form-group'>
              <input value={name || "" } type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} required />
              <input  value={email || "" } type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} required />
              <input value={password || "" } type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
            </div>
          <button type="submit">Submit</button>
          <p>Already have an account? <span onClick={()=>setExistingUser(true)}>Login</span></p>
          </form>

      }


    </div>
  )
}

export default Auth