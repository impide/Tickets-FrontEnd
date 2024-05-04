import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => !/\s/.test(value), {
      message: "L'email ne doit pas contenir d'espaces",
    }),
  password: z.string().refine((password) => password.length > 0, {
    message: "Le mot de passe est obligatoire",
    path: ["password"],
  }),
});

export default LoginSchema;
