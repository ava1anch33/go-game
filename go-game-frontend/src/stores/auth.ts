import { apiLogin, apiLogout, apiLookForUserInfo, apiRegister } from '@/api'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
	const token = ref<string | null>(null)
	const currentUser = ref<User | null>(null)

	function hasToken(): boolean {
		syncTokenWithStore()
		return Boolean(token.value)
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
	}
})
