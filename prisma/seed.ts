const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const courses = require('../data/courses.json');

async function main() {
  await prisma.course.createMany({
    data: courses
  });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })