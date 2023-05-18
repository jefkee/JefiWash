// import axios from "axios";
import React, { useContext } from "react";
import UserLookUp from "./UserLookUp";

const isUserLoggedIn = localStorage.getItem("token");

const UserInfo = {

    getUserName : async () => {
        if(isUserLoggedIn) {
                const response = await UserLookUp.get('/username', {
                    headers: {
                        token: isUserLoggedIn
                        }})
                return response.data
            }
         else {
            return console.log("no user logged in")
        }
    }
}

export default UserInfo;