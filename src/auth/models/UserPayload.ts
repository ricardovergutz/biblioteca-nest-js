export interface UserPayload {
    sub: number
    email: string
    name: string
    isEmployee: boolean
    iat?: number
    exp?: number
}