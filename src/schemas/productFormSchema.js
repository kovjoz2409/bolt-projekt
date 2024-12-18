import { Unit } from '@/models/unit';
import { toTypedSchema } from '@vee-validate/zod';
import { number, preprocess, z } from 'zod';

export const productFormSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1).max(40).trim(),
      price: preprocess((v) => Number(v), number().positive().finite()),
      stock: preprocess((v) => Number(v), number().nonnegative().finite()),
      amount: z
        .object({
          value: preprocess((v) => Number(v), number().positive().finite()),
          unit: z.nativeEnum(Object.values(Unit)),
        })
        .required(),
    })
    .required(),
);
