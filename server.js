// const express = require('express')
// const next = require('next')
// require('dotenv').config();

// const app = next({ dev: process.env.NODE_ENV !== 'production' })
// const handle = app.getRequestHandler();
// (async () => {
//   await app.prepare()
//   const server = express()
//   server.get('*', (req, res) => handle(req, res))

//   await server.listen(process.env.PORT || 3000)
//   console.log('> Ready on http://localhost:3000')
// })()

const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')
require('dotenv').config();

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // handle GET request to /service-worker.js
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)

        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
      .listen(3000, () => {
        console.log(`> Ready on http://localhost:${3000}`)
      })
  })