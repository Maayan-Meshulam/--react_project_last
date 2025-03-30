export interface normalizeCardInterface{
    _id?: string,
    title: string,
    subtitle: string,
    description: string,
    phone:string,
    email: string,
    web?:string,
    imgUrl?: string,
    imgAlt?: string,
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip: number,
}


export interface CardInterface{
    _id?:string,
    title: string,
    subtitle: string,
    description: string,
    phone:string,
    email: string,
    web?:string,
    image: CardImage,
    address: CardAddress,
    bizNumber?: number,
    likes?: string[]
    user_id?: string,
    createdAt?: string,
}

interface CardImage{
    url?: string,
    alt?: string
}

interface CardAddress{
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip: number,
    _id?: string
}