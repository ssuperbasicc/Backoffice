const { resFn } = require('../../../utilities/response')
const { PrismaClient } = require('@prisma/client')

const login = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        res.status(200).send(resFn(200, "Successfully."))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

module.exports = {
    login
}