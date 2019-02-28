const prod = process.env.SERVER === 'production'
const staging = process.env.SERVER === 'staging'

const endpoints = {
  dev: 'http://localhost:4444',
  staging: 'https://rlength-yoga-staging.herokuapp.com/',
  prod: 'https://yoga.readinglength.com/',
}

const urls = {
  dev: 'http://localhost:3000',
  staging: 'https://staging.readinglength.com',
  prod: 'https://www.readinglength.com',
}

const affiliates = {
  amazon: 'readleng-20',
}

let endpoint = endpoints.dev
let url = urls.dev

if (staging) {
  endpoint = endpoints.staging
  url = urls.staging
}
if (prod) {
  endpoint = endpoints.prod
  url = urls.prod
}

module.exports = {
  target: 'serverless',
  env: {
    ENDPOINT: endpoint,
    SERVER: process.env.SERVER,
    AMAZON_AFF: affiliates.amazon,
    URL: url,
    GATAG: 'UA-63567761-5',
  },
}
