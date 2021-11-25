import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import SummaryForm from './SummaryForm.jsx'
import userEvent from '@testing-library/user-event'

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
  userEvent.click(checkbox)
  expect(confirmButton).toBeEnabled()
  userEvent.click(checkbox)
  expect(confirmButton).toBeDisabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)
  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i,
  )
  expect(nullPopover).not.toBeInTheDocument()
  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument() // this is not necessary since we are using getByText above. This is for best practice about readability
  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(
    screen.queryByText(/no ice cream will actually be delivered/i),
  )
  // expect(nullPopoverAgain).not.toBeInTheDocument()
})
