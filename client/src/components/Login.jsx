import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserLookUp from "../apis/UserLookUp";

const Login = ({setAuth, onLoginSuccess}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {email, password};

            const response = await UserLookUp.post('/auth/login', body);
            
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                toast.success("Logged in successfully")
                window.location.reload(true)
            } else {
                setAuth(false)
                toast.error(response)
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        <Fragment>
        <h1 className="text-center my-5">Login</h1>
        <form onSubmit={onSubmitForm}>
            <input type="email" name="email" placeholder="email" value={email} onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)} className="form-control my-3"/>
            <button className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to="/register">Register</Link>
        </Fragment>
    );
    }

export default Login;