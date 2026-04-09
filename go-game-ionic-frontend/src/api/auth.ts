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
    return FetchPut<{ user: User }>('/user/avatar', {
        payloadType: 'json',
        body: { file },
    })
}

export async function updateUserProfile(profileData: {
    firstName?: string
    lastName?: string
    phoneCode?: string
    phone?: string
}) {
    return FetchPut<{ user: User }>('/user', {
        payloadType: 'json',
        body: profileData,
    })
}
