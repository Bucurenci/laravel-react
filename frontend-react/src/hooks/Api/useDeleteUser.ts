import {useMutation} from "@tanstack/react-query";
import axiosClient from "../../axios-client";

const deleteUserData = async (userId: number) => {

    const {data} = await axiosClient.delete(`/users/${userId}`);
    return data;
}

export const useDeleteUser = () => {

    return useMutation({
        mutationFn: deleteUserData
    });
}
