"use strict"

const positionSeeder = async function (db) {

    const data = [
        {
            id: 1,
            name: "Perawat",
            description: "Jabatan Perawat"
        },
        {
            id: 2,
            name: "Dokter",
            description: "Jabatan Dokter"
        },
        {
            id: 3,
            name: "Ahli Gizi",
            description: "Jabatan Ahli Gizi"
        },
        {
            id: 4,
            name: "Farmasi",
            description: "Jabatan Farmasi"
        },
        {
            id: 5,
            name: "Tenaga Laboratorium Medis",
            description: "Jabatan Tenaga Laboratorium Medis"
        },
        {
            id: 6,
            name: "Terapis Fisik",
            description: "Jabatan Terapis Fisik"
        },
        {
            id: 7,
            name: "Manajemen Rumah Sakit",
            description: "Jabatan Manajemen Rumah Sakit"
        },
        {
            id: 8,
            name: "Pelayanan Pasien",
            description: "Jabatan Pelayanan Pasien"
        },
        {
            id: 9,
            name: "Teknisi Radiologi",
            description: "Jabatan Teknisi Radiologi"
        }
    ]

    for (let index = 0; index < data.length; index++) {
        const dt = data[index]

        await db.position.upsert({
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

module.exports = positionSeeder