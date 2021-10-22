import prismaClient from "../prisma";

const executeGetUserProfile = async (user_id: string) => {
  const user = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    }
  });

  return user;
}

export { executeGetUserProfile }
