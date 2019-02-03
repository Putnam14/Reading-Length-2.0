const formatMoney = amount => {
  // Amount is stored and handled as cents
  const parsedAmount = parseInt(amount)
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }
  // Leave off the .00 for round numbers
  if (parsedAmount % 100 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat('en-US', options)
  return formatter.format(parsedAmount / 100)
}

// This could be moved to the backend as a 'Price' object type with money formatting on the front end.
const priceFormatter = (prices, isbn) => {
  const formatted = []
  prices.forEach(price => {
    const marketPattern = new RegExp(/([^:]+)/)
    const pricePattern = new RegExp(/([0-9]+)/)
    const marketplace = marketPattern.exec(price)[0]
    let affiliateLink = ''
    if (marketplace === 'Amazon')
      affiliateLink = `https://www.amazon.com/dp/${isbn}?tag=${
        process.env.AMAZON_AFF
      }`
    const formattedPrice = formatMoney(pricePattern.exec(price)[0])
    formatted.push({
      affiliateLink,
      marketplace,
      formattedPrice,
    })
  })
  return formatted
}
export default priceFormatter
