import {UserFormErrors} from "./User";

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
            errors: UserFormErrors
        }
    }
}
