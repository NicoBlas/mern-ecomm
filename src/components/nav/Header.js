import React, {useState} from 'react'
import {Menu} from "antd"
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"
import firebase from "firebase"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"


const {SubMenu, Item} = Menu



const Header = () => {

    const [current, setCurrent] = useState("")

    let dispatch = useDispatch()
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

            <Item key="register" icon={<UserAddOutlined />} className="float-end">
                <Link to="/register">Register</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-end">
                <Link to="/login">Login</Link>
            </Item>

            
            <SubMenu key="SubMenu" title="Username" icon={<SettingOutlined />}>
                <Item key="two" icon={<AppstoreOutlined />}>
                    Navigation Two
                </Item>
                <Item key="three" icon={<AppstoreOutlined />}>
                    Navigation Three
                </Item>
                <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
            </SubMenu>
        </Menu>
    )
}

export default Header