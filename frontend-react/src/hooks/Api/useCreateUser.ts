import {useMutation} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {UserCreateType} from "../../models/User";

const postUserData = async (userData: UserCreateType) => {

    const {data} = await axiosClient.post("/users", userData);
    return data;
}

export const useCreateUser = () => {
    return useMutation({
        mutationFn: postUserData
    });
}
