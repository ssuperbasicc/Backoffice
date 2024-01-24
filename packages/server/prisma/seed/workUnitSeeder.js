"use strict"

const workUnitSeeder = async function (db) {

    const data = [
        {
            id: 1,
            name: "Departemen Gawat Darurat",
            description: "Unit Kerja Departemen Gawat Darurat"
        },
        {
            id: 2,
            name: "Unit Bedah",
            description: "Unit Kerja Unit Bedah"
        },
        {
            id: 3,
            name: "Unit Perawatan Intersif",
            description: "Unit Kerja Perawatan Intersif"
        },
        {
            id: 4,
            name: "Unit Persalinan dan Kandungan",
            description: "Unit Kerja Persalinan dan Kandungan"
        },
        {
            id: 5,
            name: "Unit Medis Bedah",
            description: "Unit Kerja Medis Bedah"
        },
        {
            id: 6,
            name: "Unit Departemen Radiologi",
            description: "Unit Kerja Departemen Radiologi"
        },
        {
            id: 7,
            name: "Unit Farmasi",
            description: "Unit Kerja Farmasi"
        },
        {
            id: 8,
            name: "Unit Departemen Laboratorium",
            description: "Unit Kerja Departemen Laboratorium"
        },
        {
            id: 9,
            name: "Unit Departemen Terapi Fisik",
            description: "Unit Kerja Departemen Terapi Fisik"
        },
        {
            id: 10,
            name: "Unit Manajemen Rumah Sakit",
            description: "Unit Kerja Manajemen Rumah Sakit"
        },
        {
            id: 11,
            name: "Unit Layanan Nutrisi dan Diet",
            description: "Unit Kerja Layanan Nutrisi dan Diet"
        },
        {
            id: 12,
            name: "Unit Layanan Pasien",
            description: "Unit Kerja Layanan Pasien"
        },
    ]

    for (let index = 0; index < data.length; index++) {
        const dt = data[index]

        await db.workUnit.upsert({
            where: { 
                id: dt.id,
                name: dt.name 
            },
            update: {},
            create: {
                name: dt.name,
                description: dt.description
            }
        })
        
    }
}

module.exports = workUnitSeeder