const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const main = async () => {
    for (let i = 0; i < 100; i++) {
        await prisma.vehicles.create({
            data: {
                make: faker.vehicle.manufacturer(),
                model: faker.vehicle.model(),
                year: faker.vehicle.year(),
                customerId: faker.datatype.uuid(),
            },
        });
    }
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }
    );