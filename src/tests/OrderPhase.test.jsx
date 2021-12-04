import { render, screen } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'

test('order phases for happy path', async () => {
  // Render app
  render(<App />)

  // Add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  const chocolateInput = screen.getByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesCheckbox)

  // Find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  })
  userEvent.click(orderSummaryButton)

  // Check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  })
  expect(toppingsHeading).toBeInTheDocument()

  // Check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  // Accept terms and conditions and click button to confirm order
  const tcCheckBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  userEvent.click(tcCheckBox)

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  })
  userEvent.click(confirmOrderButton)

  // Confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  })
  expect(thankYouHeader).toBeInTheDocument()

  const orderNumber = await screen.findByAltText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  // Click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  userEvent.click(newOrderButton)

  // Check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()

  // wait for items to appear so that testing library doesn't get angry
  // await screen.findByRole('spinbutton', { name: 'Vanilla' })
  // await screen.findByRole('checkbox', { name: 'Cherries' })
})
