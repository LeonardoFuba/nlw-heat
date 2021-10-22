import prismaClient from "../prisma";

const executeGet3LastMessages = async () => {
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

export { executeGet3LastMessages }
