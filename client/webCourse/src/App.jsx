import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import OrderInfoPage from './routes/OrderInfoPage'
import Home from './routes/Home'
import './App.css'
import { OrdersContextProvider } from './context/OrdersContext'
import EditOrderPage from './routes/EditOrderPage'

//components
import NavBar from './components/NavBar'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <OrdersContextProvider>
    <Fragment>
      <NavBar />
      <Router>
          <div className="container">
          <Routes>
            <Route exact path="/" element={isAuthenticated ? <Home setAuth={setAuth}/> : <Navigate to="/login"/>} />
            <Route exact path="/orders/:id" element={<OrderInfoPage />} />
            <Route exact path="/orders/:id/edit" element={<EditOrderPage/>} />
            <Route exact path="/dashboard" element= {isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login"/>} />
            <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/"/>} />
            <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login"/>} />
          </Routes>
          </div>
      </Router>
      <ToastContainer />
    </Fragment>
    </OrdersContextProvider>
  )
}

export default App