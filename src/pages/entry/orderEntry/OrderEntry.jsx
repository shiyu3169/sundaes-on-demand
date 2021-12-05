import { useOrderDetails } from '../../../contexts/OrderDetails'
import Options from '../options/Options'
import Button from 'react-bootstrap/Button'

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails()

  const disableOrderButton = orderDetails.totals.scoops === '$0.00'
  return (
    <>
      <h1>Design Your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={disableOrderButton}
        onClick={() => setOrderPhase('review')}
      >
        Order Sundae!
      </Button>
    </>
  )
}
