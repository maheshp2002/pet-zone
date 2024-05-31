export interface IGetChatListDto {
    id: number
    createdAt: string
    chatName: string
    isBlocked: boolean
    isRemoved: boolean
    icon: string
}

export interface IGetMessageDto {
    id: number
    time: string
    date: string
    content: string
    isSenderUser: boolean
    isMessageDeleted: boolean 
}

export interface IBlockOrRemoveChat {
    sellerId: string
    petDetailsId: number
    isBlockedOrRemoved: boolean
}

export interface IAddChatDto {
    sellerId: string
    petDetailsId: number
    isBlockedOrRemoved: boolean
}

export interface IAddMessageDto {
    sellerId: string
    petDetailsId: number
    isBlockedOrRemoved: boolean
}