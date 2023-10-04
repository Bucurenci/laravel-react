import {useQuery, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User} from "../../models/User";

const getUserData = async (userId: number) => {
    const {data} = await axiosClient.get(`/users/${userId}`);
    return data;
}

interface UseUserDataParams {
    id: number,
    page?: number,
}

export const useUserData = ({id, page = 1}: UseUserDataParams) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['getUserData', id],
        queryFn: () => getUserData(id),
        initialData: () => {

            // @ts-ignore
            const queryData = queryClient.getQueryData(['getUsersData', page])?.data;

            let userData = undefined;
            if (queryData) {
                userData = queryData.find((user: User) => id === user?.id)
            }
            return userData
        }
    });
}
