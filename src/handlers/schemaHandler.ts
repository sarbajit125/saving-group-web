import { z } from 'zod';
// zod enums
export const currencyZodEnum = z.enum(['INR', 'USD']);

export const loginRequestSchema = z.object({
  username: z
    .string()
    .min(4, 'Minimum length of username should be 4')
    .max(13, 'Maximum allowed length is 13'),
  password: z
    .string()
    .min(7, 'Minimum length for password is 7')
    .max(13, 'Maximum length for password is 13'),
});

export const registerUISchema = z
  .object({
    username: z
      .string()
      .min(4, 'Minimum length of username should be 4')
      .max(13, 'Maximum allowed length is 13'),
    password: z
      .string()
      .min(7, 'Minimum length for password is 7')
      .max(13, 'Maximum length for password is 13'),
    email: z.string().email('Invalid email'),
    confirm: z
      .string()
      .min(7, 'Minimum length for password is 7')
      .max(13, 'Maximum length for password is 13'),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });
export const createGroupSchema = z.object({
  groupname: z.string().max(20, 'Group name cannot exceeds 20 characters').trim(),
  groupDesc: z.string().max(40, 'Group desc cannot exceed 50 characters').trim().nullable(),
  groupCurrency: currencyZodEnum,
  targetAmount: z.number().lte(50000, 'Amount cannot be greater than 50000').safe().nullable(),
  targetDate: z.date().nullable(),
});
// Types
export type LoginRequestType = z.infer<typeof loginRequestSchema>;
export type RegisterRequestType = z.infer<typeof registerUISchema>;
export type createGroupRequestType = z.infer<typeof createGroupSchema>;
export type allowedCurrencyEnums = z.infer<typeof currencyZodEnum>;
