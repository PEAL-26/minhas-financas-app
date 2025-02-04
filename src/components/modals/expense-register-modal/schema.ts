import { numberFromString } from '@/helpers/zod';
import { z } from 'zod';

export const expenseSchema = z.object({
  id: z.number().optional(),
  need: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
    })
    .optional(),
  income: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
    })
    .optional(),
  category: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
    })
    .optional(),
  title: z.string({
    message: 'Campo Obrigatório!',
    required_error: 'Campo Obrigatório!',
    invalid_type_error: 'Título Inválido!',
  }),
  description: z.string().optional(),
  date: z
    .date({
      message: 'Campo Obrigatório.',
      required_error: 'Campo Obrigatório!',
      invalid_type_error: 'Data Inválida!',
    })
    .default(new Date()),
  amount: numberFromString({
    message: 'Campo Obrigatório.',
    required_error: 'Campo obrigatório!',
    invalid_type_error: 'Valor Inválido!',
  }),
  priority: z.number().default(1).optional(),
  type: z.enum(['unique', 'recurrent'], {
    message: 'Campo Obrigatório.',
    required_error: 'Campo obrigatório!',
    invalid_type_error: 'Valor Inválido!',
  }),
  recurrence: z.number().nullish(),
  customRecurrence: z.number().nullish(),
  status: z.enum(['pending', 'done']).default('pending').optional(),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
