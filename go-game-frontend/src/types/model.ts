export interface User {
	email: string
	role: string
	profile: {
		avatar: Blob
		phoneCode: string
		phone: string
		firstName: string
		LastName: string
	}
	googleId: string
	githubId: string
}
