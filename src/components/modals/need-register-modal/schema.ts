import { numberFromString } from '@/helpers/zod';
import { z } from 'zod';

export const needSchema = z.object({
  id: z.number().optional(),
  category: z
    .object({
      id: z.number().optional(),
      name: z.string().optional(),
    })
    .optional(),
  title: z.string({
    message: 'Campo Obrigatório.',
    required_error: 'Campo obrigatório!',
  }),
  description: z.string().optional(),
  priority: z.number().default(1).optional(),
  type: z.enum(['unique', 'recurrent'], {
    message: 'Campo Obrigatório.',
    required_error: 'Campo obrigatório!',
    invalid_type_error: 'Tipo Inválido!',
  }),
  recurrence: z.number().nullish(),
  customRecurrence: z.number().nullish(),
  amount: numberFromString({
    message: 'Campo Obrigatório.',
    required_error: 'Campo obrigatório!',
    invalid_type_error: 'Valor Inválido!',
  }).optional(),
  needPrices: z
    .array(
      z.object({
        local: z.object({
          id: z.number().optional(),
          name: z.string(),
        }),
        amount: z.number(),
      }),
    )
    .default([])
    .optional(),
  status: z.enum(['pending', 'done']).default('pending').optional(),
});

export type NeedSchemaType = z.infer<typeof needSchema>;
