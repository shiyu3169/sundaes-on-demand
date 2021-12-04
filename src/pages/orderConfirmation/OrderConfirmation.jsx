import axios from 'axios'
import { useState, useEffect } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Button from 'react-bootstrap/Button'

export default function OrderCOnfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    axios
      .post('https://localhost:3030/order')
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((error) => console.error(error))
  }, [])

  const handleClick = () => {
    resetOrder()
    setOrderPhase('inProgress')
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}
