import z from "zod";

export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password too short' }),
}).strict().refine(data => data.email && data.password, {
    message: 'Email and password are required',
});

export type LoginSchema = z.infer<typeof loginSchema>;