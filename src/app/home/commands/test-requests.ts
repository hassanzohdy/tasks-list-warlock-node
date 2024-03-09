import { faker } from "@faker-js/faker";
import { collect } from "@mongez/collection";
import Endpoint from "@mongez/http";
import { Random } from "@mongez/reinforcements";
import { PreloadConsole } from "@mongez/warlock";
import { User } from "app/users/models/user";

export const preload: PreloadConsole[] = ["database", "watch"];

export const name = "e2e";

async function createUsersInParallel(totalUsersToCreate: number) {
  let totalCreatedUsers = 0;
  for (let i = 0; i < totalUsersToCreate; i++) {
    setTimeout(
      () => {
        console.log("Creating User ", i + 1, " of ", totalUsersToCreate);

        User.create({
          name: faker.person.fullName(), // Adjust according to your faker version if needed
          email: faker.internet.email(),
          password: "123456",
          isAdmin: faker.datatype.boolean(),
        }).then(() => {
          console.log("User ", i + 1, " of ", totalUsersToCreate, " created");

          totalCreatedUsers++;
        });
      },
      Random.int(100, 20000),
    );
  }

  // wait until all users are created
  while (totalCreatedUsers < totalUsersToCreate) {
    console.log(
      "Total users created: ",
      totalCreatedUsers,
      " of ",
      totalUsersToCreate,
    );

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function getMeAdminUser() {
  const user = await User.first({
    email: "hassanzohdy@gmail.com",
  });

  return (
    user ||
    (await User.create({
      name: "Hassan Zohdy",
      email: "hassanzohdy@gmail.com",
      password: "123123123",
      isAdmin: true,
    }))
  );
}

export async function action() {
  // await createUsersInParallel(1000);
  const users = collect(await User.list());

  const maxTasks = 10000;

  const endpoint = new Endpoint({
    baseURL: "http://localhost:2025",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const admin = await getMeAdminUser();

  const accessToken = await admin.generateAccessToken();

  for (let i = 0; i < maxTasks; i++) {
    const data = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: faker.datatype.boolean() ? "open" : "closed",
      assignedTo: users.filter(u => u.get("isAdmin") === false).random().id,
      admin: users.filter(u => u.get("isAdmin") === true).random().id,
    };

    await endpoint.post("/admin/tasks", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
