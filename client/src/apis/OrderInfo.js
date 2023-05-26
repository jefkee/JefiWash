import OrderLookUp from "./OrderLookUp";

const isUserLoggedIn = localStorage.getItem('token')

const OrderInfo = {

    getOrders : async (user_type, user_id) => {
        if(isUserLoggedIn) {
            const response = await OrderLookUp.get('/getOrders', {
                headers: {
                    token: isUserLoggedIn,
                    user_type: user_type,
                    user_id: user_id
                    }})
                return response
            }
            else {
                return console.log("no user logged in")
            }
    },

    updateOrder : async (customer_id, customer_first_name, customer_last_name) => {
        if(isUserLoggedIn) {
            const response = await OrderLookUp.post('/updateOrder', {
                customer_id: customer_id,
                customer_first_name: customer_first_name,
                customer_last_name: customer_last_name
            }, {
                headers: {
                    token: isUserLoggedIn
                    }})
                return response
            }
            else {
                return console.log("no user logged in")
            }
    }

}

export default OrderInfo
