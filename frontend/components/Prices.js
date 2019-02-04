import React from 'react'
import priceFormatter from '../lib/priceFormatter'

class Prices extends React.Component {
  render() {
    const { priceData } = this.props
    const prices = priceFormatter(priceData)
    return (
      <div>
        <strong>Price</strong>
        {prices.map((price, i) => (
          <a href={price.affiliateLink}>
            <p>
              {price.marketplace}:{' '}
              {priceData[i].MSRP > priceData[i].lowestNewPrice ? (
                <>
                  <strike>{price.formattedMSRP}</strike> {price.formattedOffer}
                </>
              ) : (
                price.formattedMSRP
              )}
            </p>
          </a>
        ))}
      </div>
    )
  }
}

export default Prices
