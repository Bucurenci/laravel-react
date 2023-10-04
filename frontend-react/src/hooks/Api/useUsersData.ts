import {useQuery} from "@tanstack/react-query";
import axiosClient from "../../axios-client";

const getUsersData = async (page: number) => {
    let requestUrl = `/users`;
    if (page) {
        requestUrl = `/users?page=${page}`;
    }

    const {data} = await axiosClient.get(requestUrl);
    return data;
}

interface UseUsersDataParams {
    page: number,
}

export const useUsersData = ({page}: UseUsersDataParams) => {

    return useQuery({
        queryKey: ['getUsersData', page],
        queryFn: () => getUsersData(page),
        keepPreviousData: true
    });
}
