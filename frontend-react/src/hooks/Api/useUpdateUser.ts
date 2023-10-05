import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {IUser, UserUpdateType} from "../../models/User";
import {IUsersCollectionResponse} from "../../models/ServerResponse";
import {useStateContext} from "../../contexts/ContextProvider";
import {TUsersExpectedError} from "../../models/ServerError";

const updateUserData = async (userData: UserUpdateType): Promise<IUser> => {

    const {data} = await axiosClient.put<IUser>(`/users/${userData.id}`, userData);
    return data;
}

interface UseUpdateUserParams {
    page: number
}

export const useUpdateUser = ({page = 1}: UseUpdateUserParams) => {
    const {authUser, setAuthUser} = useStateContext();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserData,
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
