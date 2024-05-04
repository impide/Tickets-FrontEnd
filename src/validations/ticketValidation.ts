import { z } from "zod";

const TicketSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Le sujet doit faire au moins 3 caractères",
    })
    .max(100, {
      message: "Le sujet doit faire au plus 100 caractères",
    }),
  description: z
    .string()
    .min(3, {
      message: "La description doit faire au moins 3 caractères",
    })
    .max(1000, {
      message: "La description doit faire au plus 1000 caractères",
    }),
});

export default TicketSchema;
