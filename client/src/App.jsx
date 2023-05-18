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

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  
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
  
  useEffect(() => {
    isAuth()
    // console.log("useEffect: " + isAuthenticated)
    // console.log("useEffect: " + localStorage.token)
    }, [])
  
  if (loading) {
    return <div className='loader'></div>
  }

  return (
    <UsersContextProvider>
    <Fragment>
      <Router>
      <div className="navbar w-100">
      <ResponsiveAppBar setAuth={setAuth} isAuthenticated={isAuthenticated}/>
      </div>
          <div className="router vw-100 vh-100 p-0">
          <Routes>
            <Route exact path="/orders/:id/edit" element={<EditOrderPage/>} />
            <Route exact path="/orders/:id" element={<OrderInfoPage />} />
            <Route exact path="/dashboard" element= {isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/register"/>}/>
            <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login"/>} />
            <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/"/>} />
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