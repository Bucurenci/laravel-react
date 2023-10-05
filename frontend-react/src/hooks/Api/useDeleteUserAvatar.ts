import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {User, UsersCollectionResponse} from "../../models/User";

const deleteUserAvatarData = async (userId: number) => {
    const {data} = await axiosClient.patch<User>(`/users/${userId}/delete-image`, {avatar: null});
    return data;
}

interface UseDeleteUserAvatarParams {
    page: number
}

export const useDeleteUserAvatar = ({page = 1}: UseDeleteUserAvatarParams) => {
    const {authUser, setAuthUser} = useStateContext();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUserAvatarData,
        onSuccess: (userData: User) => {

            if (userData.id == authUser?.id) {
                setAuthUser({...authUser, ...userData});
            }

            queryClient.setQueriesData<User>(['UserData', userData.id], () => {

                return userData;
            });

            queryClient.setQueriesData<UsersCollectionResponse>(['PaginatedUsersData', page], (oldQueryData) => {

                let newQueryData = {} as UsersCollectionResponse;

                if (oldQueryData) {
                    newQueryData = {...oldQueryData, ...{data: []}};

                    oldQueryData.data.map((user: User, index: number) => {
                        if (user.id == userData.id) {
                            newQueryData.data[index] = userData;
                        } else {
                            newQueryData.data[index] = user;
                        }
                    });
                }

                return newQueryData;
            });
        }
    })
}
