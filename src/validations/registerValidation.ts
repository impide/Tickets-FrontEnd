import { z } from "zod";

const RegisterSchema = z
  .object({
    username: z.string().refine((username) => username.length > 2, {
      message: "Le nom d'utilisateur doit faire au moins 3 caractères",
      path: ["username"],
    }),
    email: z.string().email(),
    password: z
      .string()
      .refine((password) => password.length >= 8, {
        message: "Le mot de passe doit faire au moins 8 caractères",
        path: ["password"],
      })
      .refine(
        (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
            password
          ),
        {
          message:
            "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
          path: ["password"],
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passes ne correspondent pas",
    path: ["confirmPassword"],
  });

export default RegisterSchema;
