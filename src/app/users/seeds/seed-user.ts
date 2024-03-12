import { seed } from "@mongez/warlock";
import { User } from "../models/user";

async function seedUsers() {
  await User.factory.create(1100, (faker, index) => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "password",
    // make just 100 admin, the rest are normal users
    isAdmin: index < 100,
  }));

  await User.create({
    name: "Hasan Zohdy",
    email: "hassanzohdy@gmail.com",
    password: "password",
    isAdmin: true,
  });
}

export default seed({
  name: "Seeding Users",
  once: true,
  execute: seedUsers,
});
