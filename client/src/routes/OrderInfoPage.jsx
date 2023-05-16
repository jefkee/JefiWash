import React from 'react'

const OrderInfoPage = () => {
  const { id } = useParams()
  const { selectOrder, selectedOrder } = useContext(OrdersContext)

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await OrderLookUp.get(`/${id}`)
        selectOrder(response.data.data.order)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
        {selectedOrder && selectedOrder.name}
    </div>
  )
}

export default OrderInfoPage