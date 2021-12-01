import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../options/Options'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import OrderEntry from '../orderEntry/OrderEntry'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />)

  // Total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // Update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // Update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />)

  // Total starts out $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // add Cherries and check the subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // add hot fudge check the subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  })
  userEvent.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // remove hot fudge and check the subtotal
  userEvent.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    // check that the grand total starts out at 0
    expect(grandTotal).toHaveTextContent('0.00')

    //update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    // update cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    // update cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    //update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    // update cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)

    //update vanilla scoops to 2
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')

    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
