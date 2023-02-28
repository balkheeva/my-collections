import {post} from "../infrastructure/helpers/http";

export type TItem = {id: string, name: string, tags: string[]}

export function createItem(data: Record<string, unknown>) {
    return post<TItem[]>(`/items/create/${data.collectionId}`, data)
}