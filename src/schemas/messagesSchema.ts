import { z } from "zod";

export const OrgMessageListItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  organizationId: z.string(),
  contextUserId: z.string(),
  userId: z.string(), // Add this line
  contextUserName: z.string().nullable(),
  contextUserEmail: z.string().nullable(),
  contextUserPicture: z.string().nullable(),
  lastMessage: z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
    senderUserId: z.string(),
  }),
});
