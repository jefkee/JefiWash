import React, {useState, useEffect} from "react";
import OrderInfo from "../apis/OrderInfo";
import { toast } from "react-toastify";

import { create } from "xmlbuilder2";

const OrdersList = ({ user }) => {
    const [ orders, setOrders ] = useState([])
    const [ editingOrderId, setEditingOrderId ] = useState(null)
    const [ editedFirstName, setEditedFirstName ] = useState(null)
    const [ editedLastName, setEditedLastName ] = useState(null)
    
    const fecthOrders = async (user) => {
        try {
            const response = await OrderInfo.getOrders(user.user_type, user.user_id)  //   "/" kad prikabintu prie baseURL
            setOrders(response.data)
        }
        catch(err) {
            toast.error("Error fetching orders")
            console.log(err)
        }
    }

    const handleSave = async (customer_id, customer_first_name, customer_last_name) => {
        try {
            const response = await OrderInfo.updateOrder(customer_id, customer_first_name, customer_last_name)
            toast.success("Order updated successfully")
            setEditingOrderId(null)
            fecthOrders(user)
            window.location.reload();
        } catch (err) {
            toast.error("Error updating order")
            console.log(err)
        }
    }
    
    useEffect (() => {
        fecthOrders(user);

    }, []);


    const handleDelete = async (order_id) => {
        try {
            const response = await OrderInfo.deleteOrder(order_id)
            toast.success("Order deleted successfully")
            window.location.reload();
        } catch (err) {
            toast.error("Error deleting order")
            console.log(err)
        }
    }

    const handleDownloadXML = async () => {
        try {
          const response = await axios.get("/api/dataXmlPdf/dataJson");
          const data = response;
          console.log("Data received:", data);
      
          // Convert JSON to XML format
          const xmlString = create(
            { version: "1.0", encoding: "UTF-8" },
            { root: data }
          ).end({ prettyPrint: true });
      
          // Trigger a file download with the XML content
          downloadFile(xmlString, "data.xml", "application/xml");
        } catch (error) {
          console.error("Error downloading XML data:", error);
        }
      };

    return (
        <div className="container text-white">
        <button variant="contained" onClick={handleDownloadXML}>
          Download XML
        </button>
        <h2>Orders</h2>
        <ul className="list-group list-group-flush">
            {orders.map((order) => (
                <li key={order.order_id} className="list-group-item border rounded bg-transparent text-white d-flex justify-content-between align-items-center">
                    <div>
                    Order ID:{" "}
              {editingOrderId === order.order_id ? (
                <input
                  type="text"
                  defaultValue={order.order_id}
                  className="form-control"
                />
              ) : (
                order.order_id
              )}{" "}
              - Customer:{" "}
              {editingOrderId === order.order_id ? (
                <>
                  <input
                    type="text"
                    defaultValue={order.customer.customer_first_name}
                    className="form-control"
                    onChange={(e) => 
                        setEditedFirstName(e.target.value)
                    }
                  />{" "}
                  <input
                    type="text"
                    defaultValue={order.customer.customer_last_name}
                    className="form-control"
                    onChange={(e) =>
                        setEditedLastName(e.target.value)
                    }
                  />
                </>
              ) : (
                `${order.customer.customer_first_name} ${order.customer.customer_last_name}`
              )}
            </div>
            {user.user_type[0] === "ADMIN" && (
              <div>
                {editingOrderId === order.order_id ? (
                  <button
                    onClick={() => handleSave(order.customer.customer_id, editedFirstName, editedLastName)}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingOrderId(order.order_id)}
                    className="btn btn-warning"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(order.order_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
                )}
            </li>
            ))}
        </ul>
    </div>
    )
    }

export default OrdersList