import { PrismaClient } from "@prisma/client";

function prismaClientSingleton() {
  const prisma = new PrismaClient();
  // .$extends({
  //   query: {
  //     message: {
  //       create: async ({ args, query }) => {
  //         const result = await query(args);

  //         const messageThreadId = args.data.messageThreadId ?? undefined;

  //         if (messageThreadId) {
  //           await prisma.messageThread.update({
  //             where: { id: messageThreadId },
  //             data: { updatedAt: new Date() },
  //           });
  //         }

  //         return result;
  //       },
  //       createMany: async ({ args, query }) => {
  //         const result = await query(args);
  //         if (Array.isArray(args.data)) {
  //           const messageThreadIds = args.data
  //             .map(
  //               (message: Prisma.MessageCreateManyInput) =>
  //                 message.messageThreadId,
  //             )
  //             .filter(
  //               (id: string | null | undefined): id is string =>
  //                 id !== null && id !== undefined,
  //             );

  //           if (messageThreadIds.length > 0) {
  //             await prisma.messageThread.updateMany({
  //               where: { id: { in: messageThreadIds } },
  //               data: { updatedAt: new Date() },
  //             });
  //           }
  //         } else {
  //           const messageThreadId = args.data.messageThreadId ?? undefined;
  //           if (messageThreadId) {
  //             await prisma.messageThread.update({
  //               where: { id: messageThreadId },
  //               data: { updatedAt: new Date() },
  //             });
  //           }
  //         }
  //         return result;
  //       },
  //     },
  //   },
  // });
  return prisma;
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
