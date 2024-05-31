export interface ILoginDto {
    email: string
    password: string
}

export interface IResetPasswordDto extends ILoginDto {
	token: string;
}

export interface IRegisterDto extends IUserCommonDto {
    password: string
    role: boolean
}

export interface IProfileDto extends IUserCommonDto {
    profileImage: string
    id: string
}

export interface IAdminDto {
    id: string
    email: string
    name: string
    isAdmin: boolean
}

export interface IUserCommonDto {
    name: string
    email: string
    buildingName: string
    streetAddress: string
    city: string
    state: string
    country: string
    pinCode: number
    phoneNumber: string
    isAdmin: boolean
}