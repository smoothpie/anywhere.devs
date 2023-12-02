const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const courses = require('../data/courses.json');

async function main() {
  await prismaClient.course.createMany({
    data: courses
  });
}
main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })