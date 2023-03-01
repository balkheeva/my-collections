export function post<ResponseBody extends Record<string, unknown> | Array<Record<string, unknown>>>(
    url: string, data: Record<string, unknown> = {}, options: {withToken?: boolean} = {}
): Promise<ResponseBody> {
    return  request<ResponseBody>(url, data, {...options, method: 'post'})
}

export function get<ResponseBody extends Record<string, unknown>>(
    url: string, options: {withToken?: boolean} = {}
): Promise<ResponseBody> {
    return request(url, null, {...options, method: 'get'})
}

function request<ResponseBody>(
    url: string, data: Record<string, unknown> | null, options: {withToken?: boolean, method: 'get' | 'post'}
): Promise<ResponseBody> {
    const callback = (token: string | void) => {
        const headers: Record<string, string> = {'content-type': 'application/json'}
        if (token) headers.Authorization = token

        return fetch(url, {headers, body: data ? JSON.stringify(data) : undefined, method: options.method})
    }
    return (options.withToken === false ? callback() : withToken(callback)).then(handleResponse)
}
const UNAUTHORIZED = "Unauthorized"

function handleResponse(response: Response | typeof UNAUTHORIZED) {
    if (response === UNAUTHORIZED || response.status === 401) {
        localStorage.removeItem("token")
        window.location.replace(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
        return Promise.reject(UNAUTHORIZED)
    } else if (!response.ok) return response.text().then((t: string) => Promise.reject(t))
    return response.json()
}

function withToken(fn: (token: string) => Promise<any>) {
    const token = localStorage.getItem("token") || ''
    return fn(token)
}