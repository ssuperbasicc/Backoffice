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

        const rows = await db.$queryRaw`
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

module.exports = {
    metadata,
    topTenLogin
}