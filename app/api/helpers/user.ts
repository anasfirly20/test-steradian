import { faker } from "@faker-js/faker";
import prisma from "@/prisma/client";

export async function createUser() {
  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      city: faker.location.city(),
      zip: parseInt(faker.location.zipCode()),
      message: faker.person.bio(),
      password: faker.internet.password(),
      username: faker.person.firstName(),
      address: faker.location.state(),
    },
  });
}
