import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import OrderInfoPage from './routes/OrderInfoPage'
import Home from './routes/Home'
import './App.css'
import { UsersContextProvider } from './context/UsersContext'
import EditOrderPage from './routes/EditOrderPage'

import * as bootstrap from 'bootstrap'

//components
import ResponsiveAppBar from './components/NavBar'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Order from './components/Order'
import OrdersList from './components/OrdersList'

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Profile from './components/Profile'
// import UserLookUp from './apis/UserLookUp'
import UserInfo from './apis/UserInfo'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState("")
  
  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  }
  
  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      })
      
      const parseRes = await response.json()
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
      
    } catch (err) {
      console.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const checkUser = async () => {
    try {
      const response = await UserInfo.getUserInfo();

      setUser(response);
  

    } catch (err) {
      console.error(err.message)
    }
  }


  useEffect(() => {
    isAuth()
    checkUser()
    // checkAdmin()
    }, [])
  
  if (loading) {
    return <div className='loader'></div>
  }

  return (
    <UsersContextProvider>
    <Fragment>
      <Router>
      <div className="navbar w-100">
      <ResponsiveAppBar setAuth={setAuth} isAuthenticated={isAuthenticated} isAdmin={isAdmin}/>
      </div>
          <div className="router vw-100 vh-100 p-0">
          <Routes>
            {/* <Route exact path="/orders/:id/edit" element={<EditOrderPage/>} />
            <Route exact path="/orders/:id" element={<OrderInfoPage />} /> */}
            <Route exact path="/orders" element={isAuthenticated ? <OrdersList user={user}/> : <Navigate to="/login"/>} />
            <Route exact path="/profile" element={isAuthenticated ? <Profile/> : <Navigate to="/login"/>}/>
            <Route exact path="/dashboard" element= {isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login"/>}/>
            <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login"/>} />
            <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/"/>} />
            <Route exact path="/order" element={isAuthenticated ? <Order /> : <Navigate to="/login"/>} />
            <Route exact path="/" element={<Home setAuth={setAuth}/>} />
          </Routes>
          </div>
      </Router>
      <ToastContainer />
    </Fragment>
    </UsersContextProvider>
  )
}

export default App