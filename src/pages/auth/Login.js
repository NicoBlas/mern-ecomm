import React, {useState, useEffect} from 'react'
import {auth, googleAuthProvider} from "../../firebase"
import {toast} from "react-toastify"
import {Button} from "antd"
import {MailOutlined, LoadingOutlined, GoogleOutlined} from "@ant-design/icons"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"


const Login = ({history}) => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {user} = useSelector((state) => ({...state}))
  

  useEffect(()=>{
      if ( user && user.token ) navigate("/")
  },[user])

  let dispatch = useDispatch()
  

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const {user} = result
      const idTokenResult = await user.getIdTokenResult()

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token
        }
      })

      navigate("/")
    } catch(error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  const googleLogin = async () =>{
    auth.signInWithPopup(googleAuthProvider)
    .then( async (result) =>{
      const user = result
      const idTokenResult = await user.getIdTokenResult()

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token
        }
      
      })
      navigate("/")
    })
    .catch(err => {
      console.log(err)
      toast.error(err)
    })
  }

  const loginForm = () => <form onSubmit={handleSubmit} >
    <div className='form-group mb-4'>
      <input type="email" className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" autoFocus/>
    </div>
    
    <div className='form-group'>
      <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" />
    </div>
    
    <br />
    <Button onClick={handleSubmit} type="primary" className='mb-3' block shape='round' icon={<MailOutlined />} disabled={!email || password.length < 6} size="large">Login with Email/Password</Button>
    <Button onClick={googleLogin} type="danger" className='mb-3' block shape='round' icon={<GoogleOutlined />} size="large">Login with Google</Button>
    <Link to="/forgot/password" className='float-end text-danger'>Forgot Password</Link>
  </form>


  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3' />
          {!loading?(
            <h4>Login</h4>
          ) : (
            <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} />
          )
          }
          {loginForm()}
          

      </div>

    </div>
  )
}

export default Login