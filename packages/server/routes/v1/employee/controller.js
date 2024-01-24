const { bcryptHash } = require("../../../utilities/bcrypt")
const { resFn } = require("../../../utilities/response")
const { PrismaClient } = require('@prisma/client')
const { 
    SERVER_EMPLOYEE_DEFAULT_PASSWORD
 } = process.env

const allEmployee = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        let customRows = []

        const employeeRows = await db.employee.findMany({
            include: {
                workUnit: true
            }
        })

        // exclude column password
        async function generateCustomRows () {
            employeeRows.forEach(({ password, ...item }) => {
                customRows.push({...item})
            })
        }

        await generateCustomRows()

        res.status(200).send(resFn(200, "Successfully.", customRows))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const createEmployee = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const {
            name,
            username,
            workUnitId,
            listPositionId
        } = req.body

        let customList = []

        const hashPassword = await bcryptHash(SERVER_EMPLOYEE_DEFAULT_PASSWORD)

        const row = await db.employee.create({
            data: {
                name,
                username,
                password: hashPassword,
                workUnitId
            }
        })

        async function generateCustomList () {
            listPositionId.forEach((d) => {
                customList.push({ employeeId: row.id, positionId: d })
            })
        }

        await generateCustomList()

        await db.employeePosition.createMany({
            data: customList
        })

        res.status(200).send(resFn(200, "Successfully."))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const readSingleEmployee = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id } = req.query

        const employeeRow = await db.employee.findUnique({
            where: { id: parseInt(id) },
            include: {
                workUnit: true,
                EmployeePosition: {
                    include: {
                        position: true
                    }
                }
            }
        })

        // exclude column password
        delete employeeRow.password

        res.status(200).send(resFn(200, "Successfully.", employeeRow))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        await db.$disconnect()
    }
}

const updateEmployee = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id, name, username, workUnitId, listPositionIdToCreate, listPositionIdToDelete } = req.body

        let customListCreate = []

        async function generateCustomList () {
            listPositionIdToCreate.forEach((d) => {
                customListCreate.push({ employeeId: id, positionId: d })
            })
        }

        await generateCustomList()

        await db.employee.update({
            where: { id },
            data: {
                name,
                username,
                workUnitId
            }
        })

        if (listPositionIdToCreate.length > 0) {
            await db.employeePosition.createMany({
                data: customListCreate
            })
        }

        if (listPositionIdToDelete.length > 0) {
            await db.employeePosition.deleteMany({
                where: {
                    positionId: {
                        in: listPositionIdToDelete
                    }
                }
            })
        }

        res.status(200).send(resFn(200, "Successfully."))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const deleteEmployee = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { id } = req.body

        await db.employee.delete({
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
    allEmployee,
    createEmployee,
    readSingleEmployee,
    updateEmployee,
    deleteEmployee
}