export interface User {
    email: string
    role: string
    profile: {
        avatar: Base64URLString
        phoneCode: String
        phone: String
        firstName: String
        lastName: String
    }
    googleId: string
    githubId: string
}
