import React, {useEffect} from "react"
import {Routes, Route} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//components import
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import Header from "./components/nav/Header"
import RegisterComplete from "./pages/auth/RegisterComplete"
import ForgotPassword from "./pages/auth/ForgotPassword"
import History from "./pages/user/History"
import UserRoute from "./components/routes/UserRoute"
import Password from "./pages/user/Password"
import WishList from "./pages/user/WishList"
import AdminDashboard from "./pages/admin/AdminDashboard"

import {auth} from "./firebase"
import {useDispatch} from "react-redux"
import {currentUser} from "./functions/auth"
import AdminRoute from "./components/routes/AdminRoute"




function App() {

  const dispatch = useDispatch()


  // Check Firebase auth state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user) =>{
      if(user) {
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
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
          .catch(err => console.log(err))

      }
    })

    return () => unsubscribe()
  },[])


  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/user/history" element={ <UserRoute><History /></UserRoute> } />
        <Route path="/user/password" element={ <UserRoute><Password /></UserRoute> } />
        <Route path="/user/wishlist" element={ <UserRoute><WishList /></UserRoute> } />
        <Route path="/admin/dashboard" element={ <AdminRoute><AdminDashboard /></AdminRoute> } />
        
      </Routes>
    </>
  );
}

export default App;
