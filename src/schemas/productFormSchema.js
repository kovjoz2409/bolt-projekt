import { Unit } from '@/models/unit.js';
import { toTypedSchema } from '@vee-validate/zod';
import { number, preprocess, z } from 'zod';

export const productFormSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1).max(40).trim(),
      price: z.number().positive().finite(),
      stock: z.number().nonnegative().finite(),
      amount: z
        .object({
          value: preprocess((v) => Number(v), number().positive().finite()),
          unit: z.nativeEnum(Object.values(Unit)),
        })
        .required(),
    })
    .required(),
);
