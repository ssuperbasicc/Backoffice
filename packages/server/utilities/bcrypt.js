const bcrypt = require("bcrypt")

const saltRounds = 10

async function bcryptHash (plainPass) {
    const result = await bcrypt.hash(plainPass, saltRounds)

    return result
}

async function bcryptCompare (plainPass, hashedPass) {
    const result = await bcrypt.compare(plainPass, hashedPass)

    return result
}

module.exports = {
    bcryptHash, 
    bcryptCompare
}