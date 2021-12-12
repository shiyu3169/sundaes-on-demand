import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { isScoopInputValid } from '../../../utilities'

export default function ScoopOption({ option, updateItemCount }) {
  const { imagePath, name } = option
  const [isValid, setIsValid] = useState(true)

  const handleChange = (e) => {
    const isValid = isScoopInputValid(parseFloat(e.target.value))
    setIsValid(isValid)
    if (isValid) {
      updateItemCount(name, e.target.value)
    }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
