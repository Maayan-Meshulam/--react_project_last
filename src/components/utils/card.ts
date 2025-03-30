import { CardInterface, normalizeCardInterface } from "../../interfaces/Card";

//normalize card => form to server
export function normalizeCard(normalizeCard:normalizeCardInterface):CardInterface{
    
    //object detructring
    let {title,subtitle, description, phone, 
        email, web, imgUrl, imgAlt, state, country,city,
        street, houseNumber, zip} = {...normalizeCard};

    return{
        title: title,
        subtitle: subtitle,
        description: description,
        phone: phone,
        email:email,
        web:web,
        image:{
            url:imgUrl,
            alt: imgAlt,
        },
        address:{
            state:state,
            country : country,
            city : city,
            street: street,
            houseNumber : houseNumber,
            zip : zip,
        }
       
    }

}
