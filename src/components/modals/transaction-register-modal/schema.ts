import { z } from "zod";

export const transactionSchema = z.object({
  id: z.number().optional(),
  type: z.enum(["income", "expense"], {
    invalid_type_error: "Tipo Inválido!",
    required_error: "Campo Obrigatório!",
    message: "Campo Obrigatório!",
  }),
  income: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  expense: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  incomeExpense: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  local: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  date: z.date({
    invalid_type_error: "Data Inválida!",
    required_error: "Campo Obrigatório!",
    message: "Campo Obrigatório!",
  }),
  amount: z.number({
    invalid_type_error: "Valor Inválido!",
    required_error: "Campo Obrigatório!",
    message: "Campo Obrigatório!",
  }),
  observation: z.string().optional(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
