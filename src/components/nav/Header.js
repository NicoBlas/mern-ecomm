import React, {useState} from 'react'
import {Menu} from "antd"
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"
import firebase from "firebase"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"


const {SubMenu, Item} = Menu



const Header = () => {

    const [current, setCurrent] = useState("")

    let dispatch = useDispatch()
    let {user} = useSelector((state) =>({ ...state}))
    let navigate = useNavigate()

    const handleClick = (e) =>{
        setCurrent(e.key)
    }

    const logout = () =>{
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null
        })

        navigate("/login")
    }

    return (
        <Menu mode="horizontal" defaultSelectedKeys={[current]} onClick={handleClick}>
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-end">
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-end">
                    <Link to="/login">Login</Link>
                </Item>
            )}

            
            {user && (
                <SubMenu className="float-end" key="SubMenu" title={user.email && user.email.split("@")[0]} icon={<SettingOutlined />}>
                    {user && user.role === "subscriber" && (
                        <Item>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}

                    {user && user.role === "admin" && (
                        <Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}
                    
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
             </SubMenu>
            )}
        </Menu>
    )
}

export default Header