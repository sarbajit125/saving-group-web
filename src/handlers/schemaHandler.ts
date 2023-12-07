import { z } from 'zod';

export const loginRequestSchema = z.object({
     username: z.string().min(4, 'Minimum length of username should be 4').max(13, 'Maximum allowed length is 13'),
     password: z.string().min(7, 'Minimum length for password is 7').max(13, 'Maximum length for password is 13'),
});

export type LoginRequestType = z.infer<typeof loginRequestSchema>;
