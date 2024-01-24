"use strict"

const { SERVER_EMPLOYEE_DEFAULT_PASSWORD } = process.env
const { bcryptHash } = require('../../utilities/bcrypt')


const employeeSeeder = async function (db) {
    
    const hashPassword = await bcryptHash(SERVER_EMPLOYEE_DEFAULT_PASSWORD)

    const data = [
        {
            id: 1,
            name: "Harper Mitchell",
            username: "harper_mitchell",
            password: hashPassword,
            workUnitId: 11
        },
        {
            id: 2,
            name: "Ava Turner",
            username: "ava_turner",
            password: hashPassword,
            workUnitId: 8
        },
        {
            id: 3,
            name: "Caleb Rodriguez",
            username: "caleb_rodriguez",
            password: hashPassword,
            workUnitId: 6
        },
        {
            id: 4,
            name: "Zoey Patel",
            username: "zoey_patel",
            password: hashPassword,
            workUnitId: 8
        },
        {
            id: 5,
            name: "Leo Hayes",
            username: "leo_hayes",
            password: hashPassword,
            workUnitId: 6
        },
        {
            id: 6,
            name: "Jasmine Kim",
            username: "jasmine_kim",
            password: hashPassword,
            workUnitId: 1
        },
        {
            id: 7,
            name: "Mason Thompson",
            username: "mason_thompson",
            password: hashPassword,
            workUnitId: 1
        },
        {
            id: 8,
            name: "Isabella Hart",
            username: "isabella_hart",
            password: hashPassword,
            workUnitId: 2
        },
        {
            id: 9,
            name: "Adrian Foster",
            username: "adrian_foster",
            password: hashPassword,
            workUnitId: 2
        },
        {
            id: 10,
            name: "Riley Chen",
            username: "riley_chen",
            password: hashPassword,
            workUnitId: 10
        }
    ]

    for (let index = 0; index < data.length; index++) {
        const dt = data[index]

        await db.employee.upsert({
            where: {
                id: dt.id,
                username: dt.username
            },
            update: {},
            create: {
                name: dt.name,
                username: dt.username,
                password: dt.password,
                workUnitId: dt.workUnitId
            }
        })
        
    }
}

module.exports = employeeSeeder
