const bcrypt = require('bcryptjs')

const bcryptHash = async (password) => {
  return await bcrypt.hash(password, 8)
}

exports.bcryptHash = bcryptHash
