import { normalizeUpdateUserInterface, normalizeUserInterface, updateUserInterface, UserInterface } from "../../interfaces/User";
import { loginUser } from "../../services/userServices";


//פונקציה שממירה את האובייקט שאנחנו מקבלים לאובייקט במבנה שצריך לשלוח
export function normalizeUser(normalizeUser: normalizeUserInterface) : UserInterface{
    console.log(normalizeUser);

    // object distructering
    let {firstName, middleName, lastName, 
        email, password, phone, imgUrl, imgAlt, isBusiness,
        state, country, city, street, houseNumber, zip} = {...normalizeUser};

    return{
        name:{
            first: firstName,
            middle: middleName,
            last: lastName
        },
        phone: phone,
        email:email,
        password: password,
        image:{
            url: imgUrl as string, //חייב אותי לשים את זה אחרת עשה שגיאה כי זה יכול להיות גם לא מוגדר - למרות שזה לא שדה חובה
            alt:imgAlt as string
        },
        address:{
            state: state,
            country: country,
            city:city,
            street:street,
            houseNumber:houseNumber,
            zip:zip
        },
        isBusiness: isBusiness
    }
    
}

//פונקציה שממירה את האובייקט שאנחנו מקבלים לאובייקט במבנה שצריך לשלוח - בעדכון
export function normalizeUserUpdate(normalizeUser: normalizeUpdateUserInterface) : updateUserInterface{
    console.log(normalizeUser);

    // object distructering
    let {firstName, middleName, lastName, phone, imgUrl, imgAlt,
        state, country, city, street, houseNumber, zip} = {...normalizeUser};

    return{
        name:{
            first: firstName,
            middle: middleName,
            last: lastName
        },
        phone: phone,
        image:{
            url: imgUrl as string,
            alt: imgAlt as string
        },
        address:{
            state: state,
            country: country,
            city:city,
            street:street,
            houseNumber:houseNumber,
            zip:zip
        },
    }
    
}


//האם יש בה שימוש ?????????
//פונקציה שממירה את האובייקט שאנחנו מקבלים לאובייקט במבנה שלנו  
export function unNormalizeUser(UnNormalizeUser:any){
    console.log(UnNormalizeUser);

    // object distructering
    let {name, phone, email, image, address, isBusiness} = {...UnNormalizeUser};

    return{
        firstName: name.first,
        middleName: name.middle,
        lastName: name.last,
        phone: phone,
        email: email,
        imgUrl: image?.url,
        imgAlt:image?.alt,
        state: address.state,
        country: address.country,
        city:address.city,
        street:address.street,
        houseNumber:address.houseNumber,
        zip:address.zip,
        isBusiness: isBusiness
    }
    
}


//האם יש שימוש בזה????
export function normalizeUserReturnFromServer(userFromServer:any){

    let {name, phone, email, image, address, isBusiness} = {...userFromServer};

    return{
        name:{
            first: name.first,
            middle: name.middle,
            last: name.last
        },
        phone: phone,
        email: email,
        image:{
            url: image.url,
            alt: image.alt
        },
        address:{
            state: address.state,
            country: address.country,
            city: address.city,
            street: address.street,
            houseNumber: address.numberHouse,
            zip: address.zip
        },
        isBusiness: isBusiness

    }

}



