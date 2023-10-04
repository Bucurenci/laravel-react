import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";

const deleteUserAvatarData = async (userId: number) => {
    const {data} = await axiosClient.patch(`/users/${userId}/delete-image`);
    return data;
}

interface UseDeleteUserAvatarParams {
    userId: number,
    page: number
}

export const useDeleteUserAvatar = ({userId, page = 1}: UseDeleteUserAvatarParams) => {
    const {authUser, setAuthUser} = useStateContext();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUserAvatarData,
        onSuccess: () => {

            if (userId == authUser?.id) {
                setAuthUser({...authUser, avatar: null});
            }

            queryClient.setQueriesData(['getUserData', userId], (oldQueryData) => {

                return {...oldQueryData, avatar: null};
            });

            queryClient.setQueriesData(['getUsersData', page], (oldQueryData) => {

                let newQueryData = {...oldQueryData, ...{data: []}};

                oldQueryData.data.map((user, index) => {
                    if (user.id == userId) {
                        newQueryData.data[index].avatar = null;
                    } else {
                        newQueryData.data[index] = user;
                    }
                });

                return newQueryData;
            });
        }
    })
}
