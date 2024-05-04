import { z } from "zod";

const UserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Le nom d'utilisateur doit faire au moins 3 caractères",
    })
    .refine((value) => !/\s/.test(value), {
      message: "Le nom d'utilisateur ne doit pas contenir d'espaces",
    }),
});

export default UserSchema;
