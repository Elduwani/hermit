const { PrismaClient } = require("@prisma/client")
const courses = require("../utils/seedData")

const prisma = new PrismaClient()

async function main() {
    await prisma.course.createMany({
        data: courses,
        skipDuplicates: true
    })
}

main().catch(err => {
    console.log(err)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})