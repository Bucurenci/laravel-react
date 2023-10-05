import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import {IUser} from "../../models/User";
import {IUsersCollectionResponse} from "../../models/ServerResponse";

const deleteUserAvatarData = async (userId: number) => {
    const {data} = await axiosClient.patch<IUser>(`/users/${userId}/delete-image`, {avatar: null});
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
        onSuccess: (userData: IUser) => {

            if (userData.id == authUser?.id) {
                setAuthUser({...authUser, ...userData});
            }

            queryClient.setQueriesData<IUser>(['UserData', userData.id], () => {

                return userData;
            });

            queryClient.setQueriesData<IUsersCollectionResponse>(['PaginatedUsersData', page], (oldQueryData) => {

                let newQueryData = {} as IUsersCollectionResponse;

                if (oldQueryData) {
                    newQueryData = {...oldQueryData, ...{data: []}};

                    oldQueryData.data.map((user: IUser, index: number) => {
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
