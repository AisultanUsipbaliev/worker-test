require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')

const utilities = require('./utilities')
const workerPoolController = require('./worker-pool/controller')
const workerController = require('./worker/controller')

app.get('/bcrypt-worker-pool', async (req, res) => {
  const password = 'This is a long password'
  const workerPool = workerPoolController.get()
  const result = await workerPool.bcryptHash(password)

  res.send(result)
})

app.get('/bcrypt-worker', async (req, res) => {
  const password = 'This is a long password'
  const result = await workerController.bcryptHash(password)

  res.send(result)
})

app.get('/bcrypt', async (req, res) => {
  const password = 'This is a long password'
  const result = await utilities.bcryptHash(password)

  res.send(result)
})

const port = process.env.PORT
const server = http.createServer(app)

;(async () => {
  if (process.env.WORKER_POOL_ENABLED === '1') {
    const options = { minWorkers: 'max' }
    await workerPoolController.init(options)
  }

  server.listen(port, () => {
    console.log('NodeJS Performance Optimizations listening on: ', port)
  })
})()
