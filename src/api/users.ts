import {post} from "../infrastructure/helpers/http";
export type TUser = {
    id: string
    name: string,
    email: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    adminrole: boolean
}
export function loadUsers() {
    return post<TUser[]>('/users/')
}
export function blockUser(id: string) {
    return post<TUser>('/users/block', {id})
}
export function unblockUser(id: string) {
    return post<TUser>('/users/unblock', {id})
}
export function deleteUser(id: string) {
    return post<TUser>('/users/delete', {id})
}
export function makeAdmin(data: Record<string, unknown>) {
    return post<TUser>('/users/change-role', data)
}

export function impersonate(data: Record<string, unknown>) {
    return post<{ token: string }>('/users/impersonate', data)
}