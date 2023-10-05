import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {IUser} from "../../models/User";
import {IUsersCollectionResponse} from "../../models/ServerResponse";
import {useStateContext} from "../../contexts/ContextProvider";
import {TUsersExpectedError} from "../../models/ServerError";

const updateUserAvatarData = async (formData: FormData, userId: number) => {
    const {data} = await axiosClient.post<IUser>(`/users/${userId}/upload-image`, formData, {
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
