export interface IProfileDto {
    id: string
    email: string
    name: string
    isAdmin: boolean
}

export interface IUserProfileDto extends IProfileDto {
    profileImage: string
}