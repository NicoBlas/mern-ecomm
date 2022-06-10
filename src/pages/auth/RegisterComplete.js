import React, {useState, useEffect} from 'react'
import {auth} from "../../firebase"
import {toast} from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'


const RegisterComplete = ({history}) => {

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {user} = useSelector((state) => ({...state}))
  let dispatch = useDispatch()
  


  useEffect(()=>{
    setEmail(window.localStorage.getItem("emailForRegistration"))
    
  },[])
  

  const handleSubmit = async (e) =>{
    e.preventDefault()

    //validations

    if (!email || !password){
        toast.error("Email and Password are required")
        return
    }

    if (password.length < 6){
        toast.error("Password must be at least 6 characters long")
        return
    }

    try {
        const result = auth.signInWithEmailLink(email, window.location.href )
        console.log("result==>",result)
        if((await result).user.emailVerified){
            // remove user from local storage
            window.localStorage.removeItem("emailForRegistration")
            //get user id token
            let user = auth.currentUser
            await user.updatePassword(password)
            const idTokenResult = await user.getIdTokenResult()
            console.log("user token is", idTokenResult)
            //redux store

            createOrUpdateUser(idTokenResult.token)
              .then( (res) => {
                dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id
                  }
                })
              })
              .catch()

            //redirect
            history.push("/")
        }

    } catch(error){
        //
        console.log(error)
        toast.error(error.message)
    }
    

  }


  const completeRegistrationForm = () => <form onSubmit={handleSubmit} >
    <input type="email" className='form-control' value={email}  disabled/>

    <input type="password" className='form-control' value={password}  onChange={e => setPassword(e.target.value)} placeholder="password" autoFocus/>

    <button type='submit' className='btn btn-light mt-4'>Complete Registration</button>
  </form>


  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3' />
          <h4>Register Complete</h4>
          
          {completeRegistrationForm()}

      </div>

    </div>
  )
}

export default RegisterComplete