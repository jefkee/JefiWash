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

    // updateUserInfo : async (data, photo) => {
    //     if(isUserLoggedIn) {
    //         const response = await UserLookUp.put('/updateUser', data, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //                 token: isUserLoggedIn
    //             }})
    //             return response.data
    //         }
    //         else {
    //             return console.log("no user logged in")
    //         }
    // },

    updateUserInfo : async (data, photo) => {
        console.log("nebenuoriu", photo.name);
        if (isUserLoggedIn) {
          const formData = new FormData();
            formData.append("user_photo", photo.name);
            formData.append("user_name", data.user_name);
            formData.append("user_email", data.user_email);
            formData.append("user_phone_number", data.user_phone_number);
          try {
            const response = await UserLookUp.put("/updateUser", formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                token: isUserLoggedIn,
              },
            });
      
            return response.data;
          } catch (error) {
            console.error("Error updating user info:", error);
            return null;
          }
        } else {
          console.log("No user logged in");
          return null;
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