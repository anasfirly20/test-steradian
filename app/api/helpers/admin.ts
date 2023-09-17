import { faker } from "@faker-js/faker";
import prisma from "@/prisma/client";

export async function createAdmin() {
  return prisma.admin.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });
}
