const { workerData, parentPort } = require('worker_threads')

const bcrypt = require('bcryptjs')

;(async () => {
  const result = await bcrypt.hash(workerData, 8)

  parentPort.postMessage(result)
})()
