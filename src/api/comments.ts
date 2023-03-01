import {post} from "../infrastructure/helpers/http";

export type TComment = {
    id: string,
    comment: string,
    itemId: string,
    userId: string,
    author: {
        name: string
    },
    createdAt: string
}

export function createComment(data: Record<string, unknown>) {
    return post<TComment>(`/comments/create/${data.id}`, data)
}
export function loadComments(id: string) {
    return post<TComment[]>(`/comments/${id}`)
}