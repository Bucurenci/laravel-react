interface UserAvatar {
    full: string;
    medium: string;
    thumb: string;
}

export interface NewUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
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
