const { resFn } = require('../../../utilities/response')
const { PrismaClient } = require("@prisma/client")

const allWorkUnit = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const workUnitRows = await db.workUnit.findMany()

        res.status(200).send(resFn(200, "Successfully.", workUnitRows))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const createWorkUnit = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { name, description } = req.body

        await db.workUnit.create({
            data: {
                name,
                description
            }
        })

        res.status(200).send(resFn(200, "Successfully."))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const readSingleWorkUnit = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id } = req.query

        const workUnitRow = await db.workUnit.findUnique({
            where: { id: parseInt(id) }
        })

        res.status(200).send(resFn(200, "Successfully.", workUnitRow))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const updateWorkUnit = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id, name, description } = req.body

        await db.workUnit.update({
            where: { id },
            data: {
                name,
                description
            }
        })

        res.status(200).send(resFn(200, "Successfully."))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const deleteWorkUnit = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id } = req.body

        await db.workUnit.delete({
            where: { id }
        })

        res.status(200).send(resFn(200, "Successfully."))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

module.exports = {
    allWorkUnit,
    createWorkUnit,
    readSingleWorkUnit,
    updateWorkUnit,
    deleteWorkUnit
}