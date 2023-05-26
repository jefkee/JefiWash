import React, { useState, useContext } from 'react'
import OrderLookUp from '../apis/OrderLookUp'
import { OrdersContext } from '../context/OrdersContext'

const AddOrder = () => {
    const {addOrders} = useContext(OrdersContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await OrderLookUp.post("/", {
                name: name,
                email: email,
                password: password
            })
            addOrders(response.data.data.orders)
            // console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='mb-4'>
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" placeholder="email"/>
                    </div>
                    <div className="col">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="text" className="form-control" placeholder="password"/>
                    </div>
                    <div className="col">
                        <button onClick={handleSubmit} type='submit' className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddOrder