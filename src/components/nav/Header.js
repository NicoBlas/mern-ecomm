import React, {useState} from 'react'
import {Menu} from "antd"
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"

const {SubMenu, Item} = Menu



const Header = () => {

    const [current, setCurrent] = useState("")

    const handleClick = (e) =>{
        setCurrent(e.key)
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
            </SubMenu>
        </Menu>
    )
}

export default Header