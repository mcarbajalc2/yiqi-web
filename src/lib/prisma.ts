import { PrismaClient } from "@prisma/client";

function prismaClientSingleton() {
  const prisma = new PrismaClient();

  prisma.$use(async (params, next) => {
    const result = await next(params);

    if (
      params.model === "Message" &&
      (params.action === "create" || params.action === "createMany")
    ) {
      if (params.action === "create") {
        await prisma.messageThread.update({
          where: { id: params.args.data.messageThreadId },
          data: { updatedAt: new Date() },
        });
      } else if (params.action === "createMany") {
        const messageThreadIds = params.args.data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (message: any) => message.messageThreadId,
        );
        await prisma.messageThread.updateMany({
          where: { id: { in: messageThreadIds } },
          data: { updatedAt: new Date() },
        });
      }
    }

    return result;
  });

  return prisma;
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
