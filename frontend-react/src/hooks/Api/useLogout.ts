import {useMutation} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {IAuthUser} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";

const logout = async () => {
    const {data} = await axiosClient.post<IAuthUser>(`/logout`);
    return data;
}

export const useLogout = () => {
    const {setAuthUser, setToken} = useStateContext();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            setAuthUser(null);
            setToken(null);
        }
    });
}
