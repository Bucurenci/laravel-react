export interface IUserFormErrors {
    first_name?: string[],
    last_name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
    avatar?: string[],

}

export interface IBaseErrorResponse {
    code: string,
    message: string,
    response: {
        data: {
            message: string
        },
        status: number,
        statusText: string
    }
}

export type TUsersExpectedError = IBaseErrorResponse & {
    response: {
        data: {
            errors: IUserFormErrors
        }
    }
}
