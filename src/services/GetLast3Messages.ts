import prismaClient from "../prisma";

const execute = async () => {
  const messages = await prismaClient.message.findMany({
    take: 3,
    orderBy: {
      created_at: "desc"
    },
    include: {
      user: true,
    }
  })

  return messages;
}

export { execute }
