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
          <p>
            {price.marketplace}:{' '}
            <a href={price.affiliateLink}>
              {priceData[i].MSRP > priceData[i].lowestNewPrice ? (
                <>
                  <strike>{price.formattedMSRP}</strike> {price.formattedOffer}
                </>
              ) : (
                price.formattedMSRP
              )}
            </a>
          </p>
        ))}
      </div>
    )
  }
}

export default Prices
