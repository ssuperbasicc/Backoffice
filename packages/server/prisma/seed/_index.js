"use strict"

const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

const positionSeeder = require('./positionSeeder')
const workUnitSeeder = require('./workUnitSeeder')
const employeeSeeder = require('./employeeSeeder')

async function seed () {
    await positionSeeder(db)
    await workUnitSeeder(db)
    await employeeSeeder(db)
}

seed()
.then(async () => {
    await db.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
})