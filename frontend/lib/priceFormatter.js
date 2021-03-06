const formatMoney = (amount, currency) => {
  // Amount is stored and handled as cents
  const parsedAmount = parseInt(amount)
  if (currency == null) return null
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }
  // Leave off the .00 for round numbers
  if (parsedAmount % 100 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat('en-US', options)
  return formatter.format(parsedAmount / 100)
}

const priceFormatter = prices => {
  const formatted = []
  prices.forEach(price => {
    const { marketplace, affiliateLink } = price
    if (price != null && price.MSRP != null && price.currency != null) {
      const formattedMSRP = formatMoney(price.MSRP, price.currency)
      const formattedOffer = formatMoney(price.offerPrice, price.currency)
      formatted.push({
        affiliateLink,
        marketplace,
        formattedMSRP,
        formattedOffer,
      })
    }
  })
  return formatted
}
export default priceFormatter
