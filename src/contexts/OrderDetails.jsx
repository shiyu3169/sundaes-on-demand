import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { pricePerItem } from '../constants'

// format number as currency
function formatCurrency(amount) {
  const result = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
  return result
}

const OrderDetails = createContext()

// create custom hook
export function useOrderDetails() {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider',
    )
  }
  return context
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }
  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })
  const zeroCurrency = formatCurrency(0)
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts)
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts)
    const grandTotal = scoopsSubtotal + toppingsSubtotal

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts }
      // update option count for this item with the new value
      const optionCountsMap = newOptionCounts[optionType]
      optionCountsMap.set(itemName, parseInt(newItemCount))
      setOptionCounts(newOptionCounts)
    }
    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCOunt
    return [{ ...optionCounts, totals }, updateItemCount]
  }, [optionCounts, totals])

  return <OrderDetails.Provider value={value} {...props} />
}
