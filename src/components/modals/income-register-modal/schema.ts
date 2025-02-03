import { z } from "zod";

export const incomeSchema = z.object({
  id: z.number().optional(),
  title: z.string({
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
  }),
  description: z.string().optional(),
  currency: z.string().default("AOA").optional(),
  date: z.date({
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
    invalid_type_error: "Data inválida!",
  }),
  amount: z.number({
    message: "Campo Obrigatório.",
    required_error: "Campo obrigatório!",
    invalid_type_error: "Valor inválido!",
  }),
  type: z
    .enum(["unique", "recurrent"], {
      message: "Campo Obrigatório.",
      required_error: "Campo obrigatório!",
      invalid_type_error: "Tipo inválido!",
    })
    .default("unique"),
  recurrence: z
    .number({
      invalid_type_error: "Valor inválido!",
    })
    .nullish(),
  customRecurrence: z
    .number({
      invalid_type_error: "Valor inválido!",
    })
    .nullish(),
  status: z.enum(["pending", "done"]).default("pending").optional(),
});

export type IncomeSchemaType = z.infer<typeof incomeSchema>;
