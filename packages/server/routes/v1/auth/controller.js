const { resFn } = require('../../../utilities/response')
const { PrismaClient } = require('@prisma/client')
const { bcryptCompare } = require('../../../utilities/bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const {
    SERVER_TOKEN_SECRET,
    SERVER_TOKEN_EXP,
    SERVER_TOKEN_ALG
} = process.env

const login = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { username, password } = req.body

        const userRow = await db.employee.findUnique({
            where: { username }
        })

        if (userRow === null) {
            res.status(401).send(resFn(401, "Unauthrized. Invalid username."))
            return
        }

        const checkPassword = await bcryptCompare(password, userRow.password)

        if (!checkPassword) {
            res.status(401).send(resFn(401, "Unauthrized. Invalid password."))
            return
        }

        // jti -> jwt id
        // uid -> user id

        const jti = uuidv4()

        const token = jwt.sign({
            jti,
            uid: userRow.id
        }, 
        SERVER_TOKEN_SECRET,
        {
            algorithm: SERVER_TOKEN_ALG,
            expiresIn: SERVER_TOKEN_EXP
        })

        await db.authHistory.create({
            data: {
                jti,
                uid: userRow.id,
                token
            }
        })

        res.status(200).send(resFn(200, "Successfully.", token))
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