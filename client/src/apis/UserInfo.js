// import axios from "axios";
import React, { useContext } from "react";
import UserLookUp from "./UserLookUp";

const isUserLoggedIn = localStorage.getItem("token");

const UserInfo = {

    getUserName : async () => {
        console.log("is user logged in: " + isUserLoggedIn)
        if(isUserLoggedIn) {
            // return UserLookUp.get('/username').then((res) => {{
            //     console.log("labas" + res)
            //     return res
                const response = await UserLookUp.get('/username', {
                    headers: {
                        token: isUserLoggedIn
                        }})
                console.log("lol" + response)

                return response.data
            }
         else {
            return console.log("no user logged in")
        }
    }
}

export default UserInfo;