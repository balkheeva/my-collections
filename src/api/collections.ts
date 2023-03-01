import {post} from "../infrastructure/helpers/http";
import {TItem} from "./items";


export function create(data: Record<string, unknown>) {
    return post('/collections/create', data)
}

export type TCollection = {
    id: string,
    name: string,
    description: string,
    image: string,
    optionalFields: any,
    author: any,
    themes: any[],
    items: any[],
    createdAt: string,
    updatedAt:string
}

export function loadAllCollections() {
    return post<TCollection[]>('/collections/')
}

export function loadByUser(userId: string ) {
    return post<TCollection[]>('/collections/get-by-user', {userId})
}
export function getCollection(id: string) {
    return post<TCollection>(`/collections/${id}`)
}
export function deleteCollection(data: Record<string, unknown>) {
    return post<TCollection>('/collections/delete', data)
}
export function editCollection(data: Record<string, unknown>) {
    return post<TCollection>('/collections/edit', data)

}
export function addField(data: Record<string, unknown>){
    return post<TItem>(`/collections/add-field/${data.id}`, data)
}

