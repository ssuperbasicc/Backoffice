const { resFn } = require('../../../utilities/response')
const { PrismaClient } = require('@prisma/client')

const metadata = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const [
            totalEmployee,
            totalPosition,
            totalWorkUnit,
            totalLogin
        ] = await db.$transaction([
            db.employee.count(),
            db.position.count(),
            db.workUnit.count(),
            db.authHistory.count()
        ])

        res.status(200).send(resFn(200, "Successfully.", {totalEmployee, totalPosition, totalWorkUnit, totalLogin}))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const topTenLogin = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const serializeRows = []

        let rows = []

        if (req.query.startDate && req.query.endDate) {
            rows = await db.$queryRaw`
                select 
                    b.name,
                    count(a.id) as "totalLogin"
                from 
                    app."AuthHistory" as a,
                    app."Employee" as b
                where
                    a.uid = b.id
                    and a."createTimestamp" between cast(${req.query.startDate} as timestamp) and cast(${req.query.endDate} as timestamp)
                group by 
                    a.uid,
                    b.name
                having
                    count(a.id) > 25
                order by 
                    "totalLogin" desc
                limit
                    10
            `
        } else {
            rows = await db.$queryRaw`
                select 
                    b.name,
                    count(a.id) as "totalLogin"
                from 
                    app."AuthHistory" as a,
                    app."Employee" as b
                where
                    a.uid = b.id
                group by 
                    a.uid,
                    b.name
                having
                    count(a.id) > 25
                order by 
                    "totalLogin" desc
                limit
                    10
            `
        }

        // forced to serialize number as string, cuz prisma fail to serialize big int
        rows.forEach(data => {
            serializeRows.push({...data, totalLogin: data.totalLogin.toString()})
        })

        res.status(200).send(resFn(200, "Successfully.", serializeRows))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const filterEmployee = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        let customRows = []
        const { startDate, endDate } = req.query

        const datetimeStartDate = new Date(startDate)
        const datetimeEndDate = new Date(endDate)

        const rows = await db.employee.findMany({
            where: {
                createTimestamp: {
                    gte: datetimeStartDate,
                    lte: datetimeEndDate
                }
            }
        })

        // exclude column password
        async function generateCustomRows () {
            rows.forEach(({ password, ...item }) => {
                customRows.push({...item})
            })
        }

        await generateCustomRows()

        res.status(200).send(resFn(200, "Successfully.", customRows))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

const filterAuth = async (req, res, next) => {
    const db = new PrismaClient()
    try {
        const { startDate, endDate } = req.query
        const serializeRows = []
        let rows = []

        const datetimeStartDate = new Date(startDate)
        const datetimeEndDate = new Date(endDate)

        rows = await db.authHistory.findMany({
            where: {
                createTimestamp: {
                    gte: datetimeStartDate,
                    lte: datetimeEndDate
                }
            }
        })

        // forced to serialize number as string, cuz prisma fail to serialize big int
        // exclude token for security reason
        rows.forEach(({token, ...data}) => {
            serializeRows.push({...data, id: data.id.toString()})
        })

        res.status(200).send(resFn(200, "Successfully.", serializeRows))
    } catch (error) {
        console.debug("ERROR => ", error)
        res.status(500).send(resFn(500, error.message))
    } finally {
        db.$disconnect()
    }
}

module.exports = {
    metadata,
    topTenLogin,
    filterEmployee,
    filterAuth
}