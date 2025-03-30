export interface UserInterface{
    name: name,
    phone: string,
    email: string,
    password: string,
    image: image,
    address: address,
    isBusiness: boolean,
    isAdmin?: boolean,
    _id?:string
}

export interface normalizeUserInterface{
  firstName: string,
  middleName?: string,
  lastName:string
  phone: string,
  email: string,
  password: string,
  PasswordVerification?:string,
  imgUrl?:string,
  imgAlt?:string
  state?:string,
  country:string,
  city:string,
  street:string,
  houseNumber:number,
  zip:number,
  isBusiness: boolean
}

//מקבלים מהשרת בעת עדכון
export interface updateUserInterface{
    name: name,
    phone: string,
    image?: image,
    address: address,
}

//מחזירים לשרת בעת עדכון
export interface normalizeUpdateUserInterface{
    firstName: string,
    middleName?: string,
    lastName:string
    phone: string,
    imgUrl?:string,
    imgAlt?:string
    state?:string,
    country:string,
    city:string,
    street:string,
    houseNumber:number,
    zip:number,
 }


export interface loginUserInterface{
    email:string,
    password:string
}

export interface name{
    first: string,
    middle?: string,
    last: string
}

interface image{
    url: string,
    alt: string
}

interface address{
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip: number
}
