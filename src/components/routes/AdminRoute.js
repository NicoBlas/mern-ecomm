import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect"
import {currentAdmin, currentUser} from "../../functions/auth"


const AdminRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}));

    const [ok, setOk] = useState(false)

    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then((res) => {
                console.log("Current Admin Res", res)
                setOk(true)
            })
            .catch( (err) => {
                console.log("Admi route error", err)
                setOk(false)
            })
        }
    },[user])

    return ok ? (
        children
    ) : (
     <LoadingToRedirect />
    );
};
 
export default AdminRoute;