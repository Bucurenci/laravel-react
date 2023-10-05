import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User, UsersCollectionResponse, UserUpdateType} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";
import {TUsersExpectedError} from "../../models/Error";

const updateUserData = async (userData: UserUpdateType): Promise<User> => {

    const {data} = await axiosClient.put<User>(`/users/${userData.id}`, userData);
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
