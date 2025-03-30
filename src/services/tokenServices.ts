import { jwtDecode } from "jwt-decode"
import { TokenInterface } from "../interfaces/tokenInterface"

//להוסיך type storage לבדיקה ???

//save token in storage
export function saveTokenInStorage(typeStorage:boolean, token:string){
    if(Storage != undefined){
        typeStorage ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
    }
}

//is there token in storage => user connect
export function isThereTokenInStorage(){
    if(Storage != undefined){
        if(sessionStorage.getItem("token") != undefined ||
            localStorage.getItem("token") != undefined){
            return true
        }
    }

    return false;
}


//get token from storage
export function getTokenFromStorage(){
    if(Storage != undefined){

        if(sessionStorage.getItem("token") == undefined){
            if(localStorage.getItem("token") == undefined)
                return undefined
            else
                return localStorage.getItem("token")
        }
        else
            return sessionStorage.getItem("token");
    }
}

//enconding token => get user information from the token
export function encodingToken(token:string){
        let payloaodToken = jwtDecode(token)
        return payloaodToken as TokenInterface;
}

//remove token from storage
export function removeTokenFromStorage(){
    if(Storage != undefined){

        if(sessionStorage.getItem("token") != undefined)
            sessionStorage.removeItem("token")
        else if(localStorage.getItem("token") != undefined)
            localStorage.removeItem("token")
    }
}