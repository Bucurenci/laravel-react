import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {User} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";

const updateUserAvatarData = async (formData: FormData, userId: number) => {
    const {data} = await axiosClient.post(`/users/${userId}/upload-image`, formData, {
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
        mutationFn: (data) => updateUserAvatarData(data, userId),
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
