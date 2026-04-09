import { apiLogin, apiLogout, apiLookForUserInfo, apiRegister, changePassword, updateUserProfile, uploadAvatarApi } from '@/api'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
	const token = ref<string | null>(null)
	const currentUser = ref<User | null>(null)

	function hasToken(): boolean {
		syncTokenWithStore()
		return token.value !== null
	}

	function setToken(newToken: string) {
		token.value = newToken
		localStorage.setItem('accessToken', newToken)
	}

	function clearToken() {
		token.value = null
		localStorage.removeItem('accessToken')
	}

	function syncTokenWithStore() {
		token.value = localStorage.getItem('accessToken')
	}

	async function logout() {
		try {
			await apiLogout()
		} finally {
			localStorage.clear()
			window.location.href = '/login'
		}
	}

	async function handleAuthApi(res: { user: User; accessToken: string }) {
		if (res) {
			const { accessToken } = res
			setToken(accessToken)
			await getUserDetail()
		} else {
			throw new Error('Network Error')
		}
	}

	async function login(email: string, password: string) {
		const res = await apiLogin(email, password)
		handleAuthApi(res)
	}

	async function register(email: string, password: string) {
		const res = await apiRegister(email, password)
		handleAuthApi(res)
	}

	async function getUserDetail() {
		try {
			const res = await apiLookForUserInfo()
			if (res) {
				currentUser.value = res.user
			}
		} catch {
			localStorage.clear()
			window.location.href = '/login'
		}
	}

	async function uploadAvatar(file: File) {
        const base64 = await new Promise<Base64URLString>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(file)
        })
        const { user } = await uploadAvatarApi(base64)
        currentUser.value = user
    }

    async function modifyUserProfile(profileData: {
        firstName?: string
        lastName?: string
        phoneCode?: string
        phone?: string
    }) {
        const { user } = await updateUserProfile(profileData)
        currentUser.value = user
    }

	async function updatePassword({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) {
		const { user } = await changePassword(currentPassword, newPassword)
		currentUser.value = user
	}

	return {
		get token() {
			return token
		},
		get user() {
			return currentUser
		},
		hasToken,
		login,
		register,
		logout,
		setToken,
		clearToken,
		getUserDetail,
		uploadAvatar,
		modifyUserProfile,
		syncTokenWithStore,
		updatePassword
	}
})
