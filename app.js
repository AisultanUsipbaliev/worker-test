require('dotenv').config()

const express = require('express')
const http = require('http')

const utilities = require('./utilities')
const workerPoolController = require('./worker-pool/controller')
const workerController = require('./worker/controller')

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT
const PASSWORD = 'This is a long password'

app.get('/bcrypt-worker-pool', async (req, res) => {
  const workerPool = workerPoolController.get()
  const result = await workerPool.bcryptHash(PASSWORD)

  res.send(result)
})

app.get('/bcrypt-worker', async (req, res) => {
  const result = await workerController.bcryptHash(PASSWORD)

  res.send(result)
})

app.get('/bcrypt', async (req, res) => {
  const result = await utilities.bcryptHash(PASSWORD)

  res.send(result)
})

;(async () => {
  if (process.env.WORKER_POOL_ENABLED === '1') {
    const options = { minWorkers: 'max' }
    await workerPoolController.init(options)
  }

  server.listen(PORT, () => {
    console.log('NodeJS Performance Optimizations listening on: ', PORT)
  })
})()
