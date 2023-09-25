import {z} from "zod";

export const UserLoginSchema = z.object({
    email: z
        .string().trim().toLowerCase()
        .email("This email address is invalid!"),
    password: z
        .string(),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>
