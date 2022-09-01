export interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
}

export interface IUserCreate {
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
}
