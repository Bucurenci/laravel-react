import {useQuery} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {IAuthUser} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";

const getAuthUserData = async () => {
    const {data} = await axiosClient.get<IAuthUser>(`/user`);
    return data;
}

export const useAuthUserData = () => {
    const {setAuthUser} = useStateContext();

    return useQuery({
        queryKey: ['AuthUserData'],
        queryFn: getAuthUserData,
        onSuccess: (userData: IAuthUser) => {
            setAuthUser(userData);
        }
    });
}
