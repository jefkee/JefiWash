import React, {useContext, useEffect} from "react";
import OrderLookUp from "../apis/OrderLookUp";
import { OrdersContext } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";

const OrdersList = (props) => {

    const {orders, setOrders} = useContext(OrdersContext)

    let navigate = useNavigate()

    useEffect( () => {
        const fecthData = async () => {
            try {
                    const response = await OrderLookUp.get("/")  //   "/" kad prikabintu prie baseURL
                    setOrders(response.data.data.orders)
            }
            catch(err) {
                console.log(err)
            }
        }

        fecthData()

    }, [])  //[] tam kad use effectas suveiktu tik viena karta kai mountinasi komponentas

    const handleEdit = (e, id) => {
        e.stopPropagation()
        navigate(`/orders/${id}/edit`)
    }


    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await OrderLookUp.delete(`/${id}`)
            setOrders(orders.filter(order => {
                return order.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleOrderSelect = (id) => {
        navigate(`/orders/${id}`)
    }


    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>id</th>
                        <th scope='col'>name</th>
                        <th scope='col'>email</th>
                        <th scope='col'>password</th>
                        <th scope='col'>edit</th>
                        <th scope='col'>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order) => { //&& tikrina ar orders yra, jei ne, tai nevykdo toliau
                        return(
                            <tr onClick={() => handleOrderSelect(order.id)} key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.password}</td>
                                <td><button onClick={(e) => handleEdit(e, order.id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick={(e) => handleDelete(e, order.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )})}
                    {/* <tr>
                        <td>1</td>
                        <td>jeff</td>
                        <td>jeff@jeff.com</td>
                        <td>slaptas</td>
                        <td><button className="btn btn-warning">Edit</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>jeff</td>
                        <td>jeff@jeff.com</td>
                        <td>slaptas</td>
                        <td><button className="btn btn-warning">Edit</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
    }
export default OrdersList