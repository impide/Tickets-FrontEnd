import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
});

export default LoginSchema;
