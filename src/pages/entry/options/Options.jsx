import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import AlertBanner from '../../common/alertBanner/AlertBanner'
import ScoopOption from '../scoopOption/ScoopOption'
import ToppingOption from '../toppingOption/ToppingOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
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

  const optionItems = items.map((option) => (
    <ItemComponent key={option.name} option={option} />
  ))

  return <Row>{optionItems}</Row>
}
