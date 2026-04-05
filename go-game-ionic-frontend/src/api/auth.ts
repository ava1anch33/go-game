import type { User } from '@/types'
import { FetchPost, FetchPut } from './httpClient'

export async function apiRegister(email: string, password: string) {
    return FetchPost<{ user: User; accessToken: string }>('/register', {
        payloadType: 'json',
        body: { email, password },
    })
}

export async function apiLogin(email: string, password: string) {
    return FetchPost<{ user: User; accessToken: string }>('/login', {
        payloadType: 'json',
        body: { email, password },
    })
}

export async function apiLogout() {
    return FetchPost('/logout', {
        payloadType: 'json',
    })
}

export async function apiLookForUserInfo() {
    return FetchPost<{ user: User }>('/user', {
        payloadType: 'json',
    })
}

export async function uploadAvatarApi(file: Base64URLString) {
    return FetchPut('/user/avatar', {
        payloadType: 'json',
        body: { file },
    })
}
