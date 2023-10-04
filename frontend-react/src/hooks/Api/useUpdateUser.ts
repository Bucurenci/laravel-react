import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User, UserUpdateType} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";

const updateUserData = async (userData: UserUpdateType) => {

    const {data} = await axiosClient.put(`/users/${userData.id}`, userData);
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
        onSuccess: (userData: User) => {

            if (userData.id == authUser?.id) {
                setAuthUser(userData);
            }

            queryClient.setQueriesData(['getUserData', userData.id], (oldQueryData) => {

                return {...oldQueryData, ...userData};
            });

            queryClient.setQueriesData(['getUsersData', page], (oldQueryData) => {

                let newQueryData = {...oldQueryData, ...{data: []}};

                oldQueryData.data.map((user, index) => {
                    if (user.id == userData.id) {
                        newQueryData.data[index] = userData;
                    } else {
                        newQueryData.data[index] = user;
                    }
                });

                return newQueryData;
            });
        }
    })
}
