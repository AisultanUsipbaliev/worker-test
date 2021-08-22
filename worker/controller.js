const { Worker } = require('worker_threads')

const bcryptHash = (workerData) => {
  return new Promise((resolve, reject) => {

    const worker = new Worker(__dirname + '/thread-functions.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`stopped with  ${code} exit code`));
    })
  })
}

// EXPORTS
exports.bcryptHash = bcryptHash
