import {post} from "../infrastructure/helpers/http";

export function login(data: Record<string, unknown>) {
    return post<{token: string}>('/auth/login', data, {withToken: false})
}

export function register(data: Record<string, unknown>) {
    return post<{token: string}>('/auth/register', data, {withToken: false})
}