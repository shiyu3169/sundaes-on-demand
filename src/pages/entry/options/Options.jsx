import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import ScoopOption from '../scoopOption/ScoopOption'
import ToppingOption from '../toppingOption/ToppingOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  //TODO: enum optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((e) => console.error(e))
  }, [optionType])

  // TODO: replace 'null' with "toppingOption" when it's available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const optionItems = items.map((option) => (
    <ItemComponent key={option.name} option={option} />
  ))

  return <Row>{optionItems}</Row>
}
