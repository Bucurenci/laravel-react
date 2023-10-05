import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User, UsersCollectionResponse} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";
import {TUsersExpectedError} from "../../models/Error";

const updateUserAvatarData = async (formData: FormData, userId: number) => {
    const {data} = await axiosClient.post<User>(`/users/${userId}/upload-image`, formData, {
        headers: {"Content-Type": "multipart/form-data"}
    });
    return data;
}

interface UseUpdateUserAvatarParams {
    userId: number,
    page: number
}

export const useUpdateUserAvatar = ({userId, page = 1}: UseUpdateUserAvatarParams) => {
    const {authUser, setAuthUser} = useStateContext();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => updateUserAvatarData(formData, userId),
        onError: (error: TUsersExpectedError) => error,
        onSuccess: (userData: User) => {

            if (userData.id == authUser?.id) {
                setAuthUser({...authUser, ...userData});
            }

            queryClient.setQueriesData<User>(['getUserData', userData.id], () => {

                return userData;
            });

            queryClient.setQueriesData<UsersCollectionResponse>(['getUsersData', page], (oldQueryData) => {
                let newQueryData = {} as UsersCollectionResponse;

                if (oldQueryData) {

                    oldQueryData.data.map((user, index) => {
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
