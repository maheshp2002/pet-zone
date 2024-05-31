export interface IPetDetailsDto {
    petId: number,
    age: string,
    sex: string,
    color: string,
    description: string
    availability: number,
    price: number
    images: string[],
    breed: string,
    category: string,
    sellerId: number,
    sellerName: string,
    sellerAddress: string
    status: boolean
}

export interface IAddPetDetailsDto {
    petId: number,
    age: string,
    sex: string,
    color: string,
    description: string
    availability: number,
    price: number
    images: string[],
    breed: string,
    category: string,
    sellerId: number,
    status: boolean
}

export interface IMasterDataDto {
    id: number,
    name: string
}
