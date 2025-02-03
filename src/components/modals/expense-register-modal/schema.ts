import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().optional(),
  need: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  income: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  category: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  title: z.string({
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
  }),
  description: z.string().optional(),
  date: z.date({
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
  }),
  amount: z.number({
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
  }),
  priority: z.number().default(1).optional(),
  type: z.enum(["unique", "recurrent"], {
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
  }),
  recurrence: z.number().nullish(),
  customRecurrence: z.number().nullish(),
  status: z.enum(["pending", "done"]).default("pending").optional(),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
