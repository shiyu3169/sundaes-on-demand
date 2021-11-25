import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from './SummaryForm.jsx'

test('Initial condition', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  expect(checkbox).not.toBeChecked()
  const confirmButton = screen.getByRole('button', {
    name: /Confirm order/i,
  })
  expect(confirmButton).toBeDisabled()
})

test('Checkbox disabled button on first click and enables on second click', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const confirmButton = screen.getByRole('button', {
    name: /Confirm order/i,
  })
  fireEvent.click(checkbox)
  expect(confirmButton).toBeEnabled()
  fireEvent.click(checkbox)
  expect(confirmButton).toBeDisabled()
})
