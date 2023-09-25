import {z} from "zod";

export const UserCreateSchema = z.object({
    first_name: z
        .string().trim()
        .min(3, "First name must contain at least 3 characters")
        .max(20, "First name must contain maximum 20 characters"),
    last_name: z
        .string().trim()
        .min(3, "Last name must contain at least 3 characters")
        .max(20, "Last name must contain maximum 20 characters"),
    email: z
        .string().trim().toLowerCase()
        .email("This email address is invalid!"),
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(20, "Password must contain maximum 20 characters")
        .regex(new RegExp(/(?=.*[a-z])/), "The password must contain at least 1 lowercase alphabetical character")
        .regex(new RegExp(/(?=.*[A-Z])/), "The password must contain at least 1 uppercase alphabetical character")
        .regex(new RegExp(/(?=.*\d)/), "The password must contain at least 1 numeric character")
        .regex(new RegExp(/(?=.*[^A-Za-z0-9])/), "The password must contain at least 1 special character"),
    password_confirmation: z
        .string(),
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password"],
    });

export type UserCreateType = z.infer<typeof UserCreateSchema>
