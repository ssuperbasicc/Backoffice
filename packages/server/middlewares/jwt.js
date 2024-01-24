const { resFn } = require('../utilities/response')
const jwt = require('jsonwebtoken')
const { SERVER_TOKEN_SECRET } = process.env

const verifyJwt = (req, res, next) => {
    try {
        const header = req.header("Authorization")
        if (!header) {
            res.status(401).send(resFn(401, "Unauthorized"))
            return
        }

        const token = header.split(" ")
        const isVerified = jwt.verify(token[1], SERVER_TOKEN_SECRET)

        if (token[0] === "Bearer" && isVerified) {
            req.user = isVerified
            next()
        } else {
            res.status(401).send(resFn(401, "Unauthorized"))
        }
    } catch (error) {
        console.debug('ERROR =>', error)
        res.status(500).send(resFn(500, error.message))
    }
}

module.exports = verifyJwt