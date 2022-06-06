import React, {useState, useEffect} from 'react'
import {auth} from "../../firebase"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = () => {

  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  const {user} = useSelector((state) => ({...state}))
  

  useEffect(()=>{
      if ( user && user.token ) navigate("/")
  },[user])
  

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const config ={
  
      url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }
    
    await auth.sendSignInLinkToEmail(email, config )
    toast.success("A confirmation Email was sent to "+ email," Click the link to complete your Registration")

    //save email on localStorage
    window.localStorage.setItem("emailForRegistration", email)

    //clear state
    setEmail("")

  }


  const registerForm = () => <form onSubmit={handleSubmit} >
    <input type="email" className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" autoFocus/>
    <br />
    <button type='submit' className='btn btn-light mt-4'>Register {email}</button>
  </form>


  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3' />
          <h4>Register</h4>
          
          {registerForm()}

      </div>

    </div>
  )
}

export default Register