export interface IRegisterUser {
    username: string,
    email: string,
    password: string,
}

export interface ILoginUser {
    username: string,
    password: string,
}

export interface IToken {
    access_token: string ,
    token_type: string
}