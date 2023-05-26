import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserLookUp from "../apis/UserLookUp";

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
        user_phone_number: "",
    })

    const {user_name, user_email, user_password, user_phone_number} = inputs

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = {user_email, user_password, user_name, user_phone_number}
            // console.log(body)
            const response = await UserLookUp.post("/auth/register", body)
            console.log(response)
            
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                toast.success("Registered successfully")
                window.location.reload(true)
            } else {
                setAuth(false)
                toast.error("Failed to register")
            }

        } catch (err) {
            console.error(err.message)
            toast.error(err.response.data)
        }
    }

    return (
        <Fragment>
        <h1 className="text-center my-5 text-white">Register</h1>
        <form onSubmit={onSubmitForm}>
            <input type="name" name="user_name" placeholder="name" className="form-control my-3" value={user_name} onChange={e => onChange(e)}/>
            <input type="email" name="user_email" placeholder="email" className="form-control my-3" value={user_email} onChange={e => onChange(e)}/>
            <input type="password" name="user_password" placeholder="password" className="form-control my-3" value={user_password} onChange={e => onChange(e)}/>
            <input type="number" name="user_phone_number" placeholder="phone number" className="form-control my-3" value={user_phone_number} onChange={e => onChange(e)}/>
            <button className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to="/login">Login</Link>
        </Fragment>
    );
}

export default Register;