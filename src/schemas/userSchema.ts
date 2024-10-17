import { z } from "zod";
import { Roles } from "@prisma/client";

export const UserRoleSchema = {
  USER: "USER";
  ADMIN: "ADMIN";
  ANDINO_ADMIN: "ANDINO_ADMIN";
  NEW_USER: "NEW_USER";
}

// inputs and output must always be zod based so that we can export
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable(),
  picture: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  role: UserRoleSchema,
});
