import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(3, {
    message: "Le nom d'utilisateur doit faire au moins 3 caractères",
  }),
});

export default UserSchema;
