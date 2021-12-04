import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { OrderDetailsProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/orderEntry/OrderEntry'
import OrderConfirmation from './pages/orderConfirmation/OrderConfirmation'
import OrderSummary from './pages/summary/OrderSummary/OrderSummary'
function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress')

  let Component = OrderEntry // default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry
      break
    case 'review':
      Component = OrderSummary
      break
    case 'completed':
      Component = OrderConfirmation
      break
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  )
}

export default App
