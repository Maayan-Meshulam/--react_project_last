import axios from "axios";
import { CardInterface } from "../interfaces/Card";
import { getTokenFromStorage } from "./tokenServices";

const apiCards = import.meta.env.VITE_api_cards;


//get all cards
export function getAllCards(){   
    return axios.get(apiCards);
}

//create card
export function createCard(cardInfo:CardInterface){
    return axios.post(apiCards, cardInfo, {
        headers: {"x-auth-token": getTokenFromStorage()}
    });
}

//get card by id
export function getCardById(id:string){
    console.log(`${apiCards}/${id}` + " ---api card by id");
    return axios.get(`${apiCards}/${id}`);
}

//update card
export function editCard(InfoCard:CardInterface, id:string){
    console.log(InfoCard);
    return axios.put(`${apiCards}/${id}`, InfoCard,
        {
            headers: {"x-auth-token": getTokenFromStorage()}
        }
    )
}

//delete card
export function removeCard(id:string){
    return axios.delete(`${apiCards}/${id}`,
        {
            headers: {"x-auth-token": getTokenFromStorage()}
        }
    )
}

//like / unlike card
//{likes: userId} - זה סתם מחייב לשלוח משהו במבנה הזה , זה עובד לא משנה מה שולחים שם ?
export function updateLikes(cardId:string){

    console.log(getTokenFromStorage());
    
    return axios.patch(`${apiCards}/${cardId}`,{},
        {
            headers: {"x-auth-token": getTokenFromStorage()}
        }
    )
       
}

 