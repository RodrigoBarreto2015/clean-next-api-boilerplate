import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password too short"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;