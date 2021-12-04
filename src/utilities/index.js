/**
 *
 * @param {number} amount
 * @returns {string} number formatted as currency
 */
export function formatCurrency(amount) {
  const result = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
  return result
}
