const formatMoney = function(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat('en-US', options)
  return formatter.format(amount / 100)
}

const priceFormatter = (prices, isbn) => {
  const formatted = []
  prices.forEach(price => {
    const marketPattern = new RegExp(/([^:]+)/)
    const pricePattern = new RegExp(/([0-9]+)/g)
    const marketplace = marketPattern.exec(price)
    let affiliateLink = ''
    if (marketplace === 'Amazon')
      affiliateLink = `https://www.amazon.com/dp/${isbn}?tag=${
        process.env.AMAZON_AFF
      }`
    const formattedPrice = formatMoney(pricePattern.exec(price))
    formatted.push({
      affiliateLink,
      marketplace,
      formattedPrice,
    })
  })
  return formatted
}
export default priceFormatter
