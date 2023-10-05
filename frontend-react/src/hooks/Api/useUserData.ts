import {useQuery, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User, UsersCollectionResponse} from "../../models/User";

const getUserData = async (userId: number) => {
    const {data} = await axiosClient.get<User>(`/users/${userId}`);
    return data;
}

interface UseUserDataParams {
    id: number,
    page?: number,
}

export const useUserData = ({id, page = 1}: UseUserDataParams) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['UserData', id],
        queryFn: () => getUserData(id),
        initialData: () => {
            const queryData = queryClient.getQueryData<UsersCollectionResponse>(['PaginatedUsersData', page]);

            let userData = undefined;
            if (queryData) {
                userData = queryData.data.find((user: User) => id === user?.id)
            }
            return userData
        }
    });
}
