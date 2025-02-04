import { numberFromString } from '@/helpers/zod';
import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.number().optional(),
  type: z
    .enum(['income', 'expense'], {
      invalid_type_error: 'Tipo Inválido!',
      required_error: 'Campo Obrigatório!',
      message: 'Campo Obrigatório!',
    })
    .default('expense'),
  income: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  expense: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  incomeExpense: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
  date: z
    .date({
      invalid_type_error: 'Data Inválida!',
      required_error: 'Campo Obrigatório!',
      message: 'Campo Obrigatório!',
    })
    .default(new Date()),
  title: z.string().optional(),
  amount: numberFromString({
    message: 'Campo Obrigatório.',
    required_error: 'Campo obrigatório!',
    invalid_type_error: 'Valor Inválido!',
  }),
  local: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
    })
    .optional(),
  observation: z.string().optional(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
