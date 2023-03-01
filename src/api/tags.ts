import {post} from "../infrastructure/helpers/http";

export type TTags = {id: string, name: string}

export function loadTags() {
    return post<TTags[]>('/tags/')
}
export function findTags(data: Record<string, unknown>) {
    return post<TTags[]>('/tags/find', data)
}
export function createTag(data: Record<string, unknown>) {
    return post<TTags>('/tags/create', data)
}
