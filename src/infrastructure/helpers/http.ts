export function post(url:string, data = {}) {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json', Authorization: localStorage.getItem("token")}
    })
        .then(handleResponse)
}

export function get(url:string) {
    return fetch(url, {headers: {Authorization: localStorage.getItem("token")}})
        .then(handleResponse)
}

function handleResponse(response:any) {
    if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.replace(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
    }
    else if (!response.ok) return response.text().then((t:string) => Promise.reject(t))
    return response.json()
}