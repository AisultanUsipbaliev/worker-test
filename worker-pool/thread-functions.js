const workerPool = require('workerpool')
const utilities = require('../utilities')

const bcryptHash = (password) => {
  return utilities.bcryptHash(password)
}

workerPool.worker({ bcryptHash })
