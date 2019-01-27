const prod = process.env.SERVER === 'production'
const staging = process.env.SERVER === 'staging'

const prodEndpoint = `http://localhost:2222`
const stagingEndpoint = `https://rlength-yoga-staging.herokuapp.com/`
const devEndpoint = `http://localhost:4444`

module.exports = {
  'process.env.ENDPOINT': prod
    ? prodEndpoint
    : staging
    ? stagingEndpoint
    : devEndpoint,
  'process.env.SERVER': process.env.SERVER,
}
