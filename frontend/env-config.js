const prod = process.env.SERVER === 'production'
const staging = process.env.SERVER === 'staging'

const endpoints = {
  dev: 'http://localhost:4444',
  staging: 'https://rlength-yoga-staging.herokuapp.com/',
  prod: 'https://localhost:2222',
}

let endpoint = endpoints.dev
if (staging) endpoint = endpoints.staging
if (prod) endpoint = endpoints.prod

module.exports = {
  'process.env.ENDPOINT': endpoint,
  'process.env.SERVER': process.env.SERVER,
}
