import React, { Fragment, useState, useEffect } from "react"
import { toast } from "react-toastify"

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
            const response = await fetch("https://jefiwash-backendas.onrender.com/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json()
            
            setName(parseRes.user_name)
            
        } catch (err) {
            toast.error(err.message);
            console.error(err.message);
        }
    }

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        getProfile();
    }), [];

    return (
        <Fragment>
        <h1>Dashboard {name}</h1>
        <button className="btn btn-primary" onClick={e => logOut(e)}>Logout</button>
        </Fragment>
    );
    }

export default Dashboard;