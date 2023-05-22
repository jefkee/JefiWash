import React from 'react'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='home p-0 m-0'>
        <button className="startOrder" onClick={() => navigate("/order")}>Start Order</button>
    </div>
  )
}

export default Home