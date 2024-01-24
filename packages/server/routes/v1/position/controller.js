const { resFn } = require('../../../utilities/response')
const { PrismaClient } = require('@prisma/client')

const allPosition = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const positionRows = await db.position.findMany()

        res.status(200).send(resFn(200, "Successfully.", positionRows))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const createPosition = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { name, description } = req.body

        await db.position.create({
            data: {
                name,
                description
            }
        })

        res.status(200).send(resFn(200, "Successfully"))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const readSinglePosition = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id } = req.query

        const positionRow = await db.position.findUnique({
            where: { id: parseInt(id) }
        })

        res.status(200).send(resFn(200, "Successfully", positionRow))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const updatePosition = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id, name, description } = req.body

        await db.position.update({
            where: { id },
            data: {
                name,
                description
            }
        })

        res.status(200).send(resFn(200, "Successfully"))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const deletePosition = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id } = req.body

        await db.position.delete({
            where: { id }
        })

        res.status(200).send(resFn(200, "Successfully"))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

module.exports = {
    allPosition, 
    createPosition,
    readSinglePosition,
    updatePosition,
    deletePosition
}