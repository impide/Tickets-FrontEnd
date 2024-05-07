import { z } from "zod";

const TicketAdminSchema = z.object({
  response: z
    .string()
    .min(3, {
      message: "La réponse doit faire au moins 3 caractères",
    })
    .max(1000, {
      message: "La réponse doit faire au plus 1000 caractères",
    }),
});

export default TicketAdminSchema;
