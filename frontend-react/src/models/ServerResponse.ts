import {IUser} from "./User";

interface IResponseCollectionMetaLinks {
    active: boolean,
    label: string,
    url: string
}

interface IResponseCollectionMeta {
    current_page: number,
    last_page: number,
    from: number,
    path: string,
    per_page: number,
    to: number,
    total: number,
    links: IResponseCollectionMetaLinks[]
}

interface IResponseCollectionLinks {
    first: string | null,
    last: string | null,
    next: string | null,
    prev: string | null
}

export interface IUsersCollectionResponse {
    data: IUser[],
    links: IResponseCollectionLinks,
    meta: IResponseCollectionMeta
}
