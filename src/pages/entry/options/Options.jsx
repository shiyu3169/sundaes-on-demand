import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { pricePerItem } from '../../../constants'
import { useOrderDetails } from '../../../contexts/OrderDetails'
import AlertBanner from '../../common/alertBanner/AlertBanner'
import ScoopOption from '../scoopOption/ScoopOption'
import ToppingOption from '../toppingOption/ToppingOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()
  //TODO: enum optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((e) => {
        setError(true)
      })
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((option) => (
    <ItemComponent
      key={option.name}
      option={option}
      updateItemCount={(itemName, newItemCount) => {
        updateItemCount(itemName, newItemCount, optionType)
      }}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}
