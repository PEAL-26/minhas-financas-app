import { z } from "zod";

export const needSchema = z.object({
  id: z.number().optional(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  title: z.string(),
  description: z.string().optional(),
  priority: z.number().default(1).optional(),
  type: z.enum(["unique", "recurrent"]),
  recurrence: z.number().nullish(),
  customRecurrence: z.number().nullish(),
  amount: z.number(),
  needPrices: z
    .array(
      z.object({
        local: z
          .object({
            id: z.number(),
            name: z.string(),
          })
          .optional(),
        amount: z.number(),
      })
    )
    .default([])
    .optional(),
});

export type NeedSchemaType = z.infer<typeof needSchema>;
