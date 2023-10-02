import {z} from "zod";

export const UserLoginSchema = z.object({
    email: z
        .string().trim().toLowerCase()
        .email("This email address is invalid!"),
    password: z
        .string().nonempty("Password must contain at least 1 character(s)"),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;

const UserBaseSchema = z.object({
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
});

type UserBaseType = z.infer<typeof UserBaseSchema>;

export const UserCreateSchema = UserBaseSchema.extend({
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
        path: ["password_confirmation"],
    });

export type UserCreateType = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = UserBaseSchema.extend({
    id: z
        .number(),
    password: z
        .union([
            z
                .string()
                .min(8, "Password must contain at least 8 characters")
                .max(20, "Password must contain maximum 20 characters")
                .regex(new RegExp(/(?=.*[a-z])/), "The password must contain at least 1 lowercase alphabetical character")
                .regex(new RegExp(/(?=.*[A-Z])/), "The password must contain at least 1 uppercase alphabetical character")
                .regex(new RegExp(/(?=.*\d)/), "The password must contain at least 1 numeric character")
                .regex(new RegExp(/(?=.*[^A-Za-z0-9])/), "The password must contain at least 1 special character"),
            z
                .string().length(0)
        ])
        .transform(val => val === "" ? undefined : val),
    password_confirmation: z
        .union([
            z
                .string(),
            z
                .string().length(0)
        ])
        .transform(val => val === "" ? undefined : val),
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type UserUpdateType = z.infer<typeof UserUpdateSchema>

interface UserAvatar {
    full: string;
    medium: string;
    thumb: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: UserAvatar | null;
    created_at?: string;
}

export interface AuthUser extends User {

}

export interface UserFormErrors {
    first_name?: string[],
    last_name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
    avatar?: string[],

}
