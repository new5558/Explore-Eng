const express = require('express')
const next = require('next')
require('dotenv').config();

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();
(async () => {
  await app.prepare()
  const server = express()
  server.get('*', (req, res) => handle(req, res))

  await server.listen(process.env.PORT || 3000)
  console.log('> Ready on http://localhost:3000')
})()