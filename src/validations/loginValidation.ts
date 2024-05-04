import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().refine((password) => password.length > 0, {
    message: "Le mot de passe est obligatoire",
    path: ["password"],
  }),
});

export default LoginSchema;
