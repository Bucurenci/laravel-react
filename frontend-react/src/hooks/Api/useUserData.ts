import {useQuery, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {IUser} from "../../models/User";
import {IUsersCollectionResponse} from "../../models/ServerResponse";

const getUserData = async (userId: number) => {
    const {data} = await axiosClient.get<IUser>(`/users/${userId}`);
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
            const queryData = queryClient.getQueryData<IUsersCollectionResponse>(['PaginatedUsersData', page]);

            let userData = undefined;
            if (queryData) {
                userData = queryData.data.find((user: IUser) => id === user?.id)
            }
            return userData
        }
    });
}
