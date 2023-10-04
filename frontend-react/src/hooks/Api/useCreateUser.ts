import {useMutation} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User, UserCreateType} from "../../models/User";
import {TUsersExpectedError} from "../../models/Error";

const postUserData = async (userData: UserCreateType) => {

    const {data} = await axiosClient.post<User>("/users", userData);
    return data;
}

export const useCreateUser = () => {
    return useMutation({
        mutationFn: postUserData,
        onError: (error: TUsersExpectedError) => error
    });
}
