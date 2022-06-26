import { prisma } from "../api/v1/db";

interface Output {
  success: boolean;
  message: string;
}

export const checkAndCreateUser = (uid: string): Output => {
  const user = prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });

  if (!user) {
    try {
      prisma.user.create({
        data: {
          uid: uid,
        },
      });
      console.log("User was not present but was created");
      return { success: true, message: "User was not present but was created" };
    } catch (err) {
      console.log(err);
      return { success: false, message: err };
    }
  } else {
    console.log("User was present");
    return { success: true, message: "User was present" };
  }
};
