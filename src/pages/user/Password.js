import React, {useState} from 'react'
import UserNav from '../../components/nav/UserNav'
import {auth} from "../../firebase"
import {toast} from "react-toastify"
import {LoadingOutlined} from "@ant-design/icons"
const Password = () => {

    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        await auth.currentUser.updatePassword(password)
        .then( ()=> {
            setLoading(false)
            toast.success("Password Updated")
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message)
            console.log(err.message)
        })
    }

    const passwordUpdateForm = () => 
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Your Password</label>
                <input type="password" disabled={loading} value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder='Enter new password' ></input>
                <button className='btn btn-primary mt-3' disabled={!password || loading || password.length < 6} >Change Password</button>

            </div>
        </form>

    return (
        <div className='container-fluid'>
            <div className='row'>
            <div className='col-md-2'>
                <UserNav />
            </div>

            <div className='col'>
                {loading ? <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} /> : <h4>Password Update</h4>}
                {passwordUpdateForm()}
            </div>
            
            </div>
        </div>
    )
}

export default Password