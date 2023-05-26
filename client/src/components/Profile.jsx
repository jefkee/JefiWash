import React, { useState, useEffect } from 'react';
import UserInfo from '../apis/UserInfo';
import { toast } from 'react-toastify';
// import OrdersList from './OrdersList';

const Profile = () => {
    const [user, setUser] = useState({
        user_name: '',
        user_email: '',
        user_phone_number: '',
        user_type: '',
    });
    
    // Get user's data from the database
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your API endpoint to get the user's data
                const response = await UserInfo.getUserInfo();
                // console.log(response);
                setUser({
                    user_type: response.user_type,
                    user_name: response.user_name,
                    user_email: response.user_email,
                    user_phone_number: response.user_phone_number,
                });
                // console.log(user);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchData();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    
    const handleSaveChanges = async () => {
        try {
            // Replace with your API endpoint to update the user's data
            const response = await UserInfo.updateUserInfo(user);
            // console.log(response);
            // Update frontend state with the backend response's data
            setUser({
                user_name: response.user_name,
                user_email: response.user_email,
                user_phone_number: response.user_phone_number,
            });
            toast.success("Profile updated successfully")
            window.location.reload();
    } catch (error) {
        toast.error("Error updating profile")
        console.error(error);
    }
    };

    const { user_name, user_email, user_phone_number } = user;

    // console.log("useris",user)

  return (
    <div className="container text-white">
      <h2>Profile</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="user_name"
            value={user_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="user_email"
            value={user_email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="user_phone_number"
            value={user_phone_number}
            onChange={handleChange}
          />
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleSaveChanges}>
        Save Changes
      </button>
      {/* <OrdersList user={{ user_type: user.user_type[0], user_id: user.user_id }} /> */}
      
    </div>
  );
};

export default Profile;