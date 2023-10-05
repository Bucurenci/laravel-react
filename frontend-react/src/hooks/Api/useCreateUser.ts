import {useMutation} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {IUser, UserCreateType} from "../../models/User";
import {TUsersExpectedError} from "../../models/ServerError";

const postUserData = async (userData: UserCreateType) => {

    const {data} = await axiosClient.post<IUser>("/users", userData);
    return data;
}

export const useCreateUser = () => {
    return useMutation({
        mutationFn: postUserData,
        onError: (error: TUsersExpectedError) => error
    });
}
