import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OrderLookUp from '../apis/OrderLookUp'
import { useNavigate } from "react-router-dom";


const EditOrder = () => {
    const {id} = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await OrderLookUp.get(`/${id}`)
            setName(response.data.data.orders.name)
            setEmail(response.data.data.orders.email)
            setPassword(response.data.data.orders.password)
        }
        fetchData()
    }, []) // empty array means only run once

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedOrder = await OrderLookUp.put(`/${id}`, {
            name: name,
            email: email,
            password: password
        })
        navigate(`/`)
    }

  return (
    <div>
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                value={name}
                onChange={e => setName(e.target.value)}
                id="name"
                className="form-control"
                type="text"
                />

                <label htmlFor="email">Email</label>
                <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                className="form-control"
                type="text"
                />

                <label htmlFor="password">Password</label>
                <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
                className="form-control"
                type="text"
                />
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default EditOrder