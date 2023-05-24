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
        setInputs({...inputs, [e.target.user_name] : e.target.value})
    }

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = {user_email, user_password, user_name, user_phone_number}
            console.log(body)
            const response = await UserLookUp.post("/auth/register", body)

            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                toast.success("Registered successfully")
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
        <h1 className="text-center my-5">Register</h1>
        <form onSubmit={onSubmitForm}>
            <input type="text" name="name" placeholder="name" className="form-control my-3" value={name} onChange={e => onChange(e)}/>
            <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
            <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
            <input type="telNumber" name="telNumber" placeholder="phone number" className="form-control my-3" value={telNumber} onChange={e => onChange(e)}/>
            <button className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to="/login">Login</Link>
        </Fragment>
    );
}

export default Register;