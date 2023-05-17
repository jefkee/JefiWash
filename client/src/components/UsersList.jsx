import React, {useContext, useEffect} from "react";
import UserLookUp from "../apis/UserLookUp";
import { UsersContext } from "../context/UsersContext";
import { useNavigate } from "react-router-dom";

const UserList = (props) => {

    const {users, setUsers} = useContext(UsersContext)

    let navigate = useNavigate()

    useEffect( () => {
        const fecthData = async () => {
            try {
                const response = await UserLookUp.get("/")
                setUsers(response.data.data.users)
            }
            catch(err) {
                console.log(err)
            }
        }

        fecthData()
    }, [])

    return {

    }
}