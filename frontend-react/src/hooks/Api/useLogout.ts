import {useMutation} from "@tanstack/react-query";
import axiosClient from "../../axios-client";
import {AuthUser} from "../../models/User";
import {useStateContext} from "../../contexts/ContextProvider";

const logout = async () => {
    const {data} = await axiosClient.post<AuthUser>(`/logout`);
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
