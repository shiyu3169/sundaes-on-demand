import axios from 'axios'
import { useState, useEffect } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Button from 'react-bootstrap/Button'
import AlertBanner from '../common/alertBanner/AlertBanner'

export default function OrderCOnfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((error) => {
        setError(true)
      })
  }, [])

  if (error) {
    return <AlertBanner />
  }

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
