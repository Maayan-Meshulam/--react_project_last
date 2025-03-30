import axios from "axios";
import { loginUserInterface, updateUserInterface, UserInterface } from "../interfaces/User";
import { getTokenFromStorage } from "./tokenServices";

const apiUsers = import.meta.env.VITE_api_users;


//login exist uer
export function loginUser(userInfo: loginUserInterface) {
    return axios.post(`${apiUsers}/login`, userInfo)
}

//register new user
export function registerUser(userInfo: UserInterface) {
    return axios.post(apiUsers, userInfo);
}

//get user by id
export function getUserById(id: string) {
    return axios.get(`${apiUsers}/${id}`, {
        headers: { "x-auth-token": getTokenFromStorage() }
    })
}

//get all users
export function getAllUsers() {
    return axios.get(apiUsers, {
        headers: { "x-auth-token": getTokenFromStorage() }
    });
}

//update user
export function updateUser(id: string, newUserInfo: updateUserInterface) {

    return axios.put(`${apiUsers}/${id}`, newUserInfo,
        {
            headers: { "x-auth-token": getTokenFromStorage() }
        }
    )
}

//delete user
export function deleteUser(id: string) {

    return axios.delete(`${apiUsers}/${id}`, {
        headers: { "x-auth-token": getTokenFromStorage() }

    })
}


//storgae

//save name in storage
export function saveNameInStorage(typeS: boolean, name: string) {
    if (Storage != undefined) {
        typeS ? localStorage.setItem("userName", name) : sessionStorage.setItem("userName", name);
    }
}

//import name in storage
export function importNameInStorage(): string {
    let name: string = "Gust";
    if (Storage != undefined) {
        if (localStorage.getItem("userName"))
            name = localStorage.getItem("userName") as string;
        else if (sessionStorage.getItem("userName"))
            name = sessionStorage.getItem("userName") as string;
    }
    return name;
}
