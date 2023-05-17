import React, {useState, createContext} from "react";

export const UsersContext = createContext();

export const UsersContextProvider = props => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)


    const addUsers = (user) => {
        setUsers([...users, user])
    }

    return (
        <UsersContext.Provider value={{users, setUsers, addUsers, selectedUser, setSelectedUser}}>
            {props.children}
        </UsersContext.Provider>
    )
}