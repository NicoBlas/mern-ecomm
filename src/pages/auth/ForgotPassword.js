import React, {useState, useEffect} from 'react'
import {auth} from "../../firebase"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import {CodeSandboxCircleFilled, LoadingOutlined} from "@ant-design/icons"
import Password from 'antd/lib/input/Password'

const ForgotPassword = ({history}) =>{
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}))
    const navigate = useNavigate()

    useEffect(()=>{
        if ( user && user.token ) navigate("/")
    },[user])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)

        const config ={
  
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
        .then(()=>{
            setEmail("")
            setLoading(false)
            toast.success("Check your email to reset your Password")

        }).catch((error)=>{
            setLoading(false)
            toast.error(error.message)
            console.log("Error message in forgot password: ",error.message)
        })
    }

    return (
        <div className='container col-md-6 offset-md-3 p-5'>
            {!loading?(
            <h4>Forgot Password</h4>
          ) : (
            <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} />
          )
          }

        <form onSubmit={handleSubmit}>
            <input type="email" className='form-control' value={email} onChange={e => setEmail(e.target.value)} autoFocus placeholder='Type your email'></input>
          <br />
          <button className='btn btn-raised' disabled={!email}> Reset Password </button>
        </form>

        </div>
    )


}

export default ForgotPassword