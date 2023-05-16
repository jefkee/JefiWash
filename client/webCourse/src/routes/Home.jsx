import React from 'react'
import '../styles/home.css'
import home_bg from '../assets/home_lambo.jpg'
import OrdersList from '../components/OrdersList'
import AddOrder from '../components/AddOrder'
import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <div>
        {/* <img src={home_bg} className="img-responsive overflow-hidden"/> */}
        <button className="startOrder">Start Order</button>

        {/* <NavBar /> */}


        {/* <AddOrder />
        <OrdersList /> */}
    </div>
  )
}

export default Home