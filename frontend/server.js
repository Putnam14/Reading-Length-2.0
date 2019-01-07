const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()
const matchWPM = route('/wpm/:id')

app.prepare().then(() => {
  createServer((req, res) => {
    let { pathname, query } = parse(req.url, true)
    const trailingSlash = pathname.length > 1 && pathname.slice(-1) === '/'
    if (trailingSlash) {
      pathname = pathname.slice(0, -1)
    }
    const paramsWPM = matchWPM(pathname)
    if (paramsWPM) {
      // assign the `query` into the params
      app.render(req, res, '/wpm', Object.assign(paramsWPM, query))
    } else if (trailingSlash) {
      app.render(req, res, pathname, query)
    } else {
      handle(req, res)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
