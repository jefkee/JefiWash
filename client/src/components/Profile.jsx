import React, { useState, useEffect } from 'react';
import UserInfo from '../apis/UserInfo';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState({
        user_name: '',
        user_email: '',
        user_phone_number: '',
        user_type: '',
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserInfo.getUserInfo();

                setUser({
                    user_type: response.user_type,
                    user_name: response.user_name,
                    user_email: response.user_email,
                    user_phone_number: response.user_phone_number,
                });
            } catch (error) {
                toast.error(error.response.data)
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
            const response = await UserInfo.updateUserInfo(user);

            setUser({
                user_name: response.user_name,
                user_email: response.user_email,
                user_phone_number: response.user_phone_number,
            });
            toast.success("Profile updated successfully")
            window.location.reload();
    } catch (error) {
        toast.error(error.response.data)
        console.error(error);
    }
    };

    const { user_name, user_email, user_phone_number } = user;

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
    </div>
  );
};

export default Profile;