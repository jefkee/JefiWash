import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserLookUp from "../apis/UserLookUp";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        user_email: "",
        user_password: ""
    });

    const {user_email, user_password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {user_email, user_password};

            const response = await UserLookUp.post('/auth/login', body);
            
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                toast.success("Logged in successfully")
                window.location.reload(true)
            } else {
                setAuth(false)
                toast.error(response.status.json())
            }
            
        } catch (err) {
            console.error(err.message)
            // toast.error("Failed to login")
        }
    }
    
    return (
        <Fragment>
        <h1 className="text-center my-5 text-white">Login</h1>
        <form onSubmit={onSubmitForm}>
            <input type="email" name="user_email" placeholder="email" value={user_email} onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="password" name="user_password" placeholder="password" value={user_password} onChange={e => onChange(e)} className="form-control my-3"/>
            <button className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to="/register">Register</Link>
        </Fragment>
    );
    }

export default Login;