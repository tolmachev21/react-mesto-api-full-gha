const baseUrl = 'https://api.mesto-pet-project.nomoredomainsicu.ru';


function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
};

export function registration(data) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email,
        })
    })
        .then(res => {
            return getResponseData(res)
        })
};

export function authorization(data) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email,
        })
    })
        .then((res) => {
            return getResponseData(res)
        })

};

export function getUserData(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            return getResponseData(res)
        })
};