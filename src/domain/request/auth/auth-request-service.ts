import z from 'zod';

export const AuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const AuthMeSchema = z.object({
  _id: z.string().email(),
  name: z.string(),
});

export type AuthLoginReq = z.infer<typeof AuthLoginSchema>;
export type AuthMeReq = z.infer<typeof AuthMeSchema>;
