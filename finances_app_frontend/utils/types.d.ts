export interface userForm {
    email: string,
    password: string,
    password_confirmation: string
    name: string,
}
export interface userAuth {
    id: number,
    name: string,
    email: string,
    email_verified_at : string | null,
    created_at : string,
}