// import axios from "axios";
import UserLookUp from "./UserLookUp";

const isUserLoggedIn = localStorage.getItem("token");

const UserInfo = {

    getUserInfo : async () => {
        if(isUserLoggedIn) {
            const response = await UserLookUp.get('/getUser', {
                headers: {
                    token: isUserLoggedIn
                }})
                return response.data
            }
            else {
                return console.log("no user logged in")
            }
    },

    updateUserInfo : async (data) => {
        if(isUserLoggedIn) {
            const response = await UserLookUp.put('/updateUser', data, {
                headers: {
                    token: isUserLoggedIn
                }})
                return response.data
            }
            else {
                return console.log("no user logged in")
            }
    },

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
    },

    isAdmin : async () => {
        if(isUserLoggedIn) {
            const response = await UserLookUp.get('/role', {
                headers: {
                    token: isUserLoggedIn
                    }})
            if(response.data[0] === 'ADMIN') {
                return true
            }
            else {
                return false
            }
        } else {
            return console.log("no user logged in")
        }
    }

}

export default UserInfo;