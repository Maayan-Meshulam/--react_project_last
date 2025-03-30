import Swal from "sweetalert2";
import { UserInterface } from "../../interfaces/User";


export function createdNewCardMes(){
    Swal.fire({
        title: "yayy",
        text:" you created a new card !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width:"270px"
    });
}


export function updateCardMes(){
    Swal.fire({
        text:"edit was ssuccful",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width:"270px"
    });
}

export function successMesGenery(title:string, text:string){
    Swal.fire({
        title:title,
        text: text,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        width:"270px"
    });
}


export function errorMesGenery(title:string = "", text:string){
    Swal.fire({
        title:title,
        text: text,
        icon: "error",
        showCloseButton: true,
        width:"270px"
   });
}

export function alreadyLogdeinMes(){
    return Swal.fire({
        title:"user alredy registerd",
        text: "do you want to loged in ?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "yes, logIn",
        cancelButtonText: "no",
        width:"270px"
    })
}

export function DeltedCardMes(){
    return Swal.fire({
        title:"Delete card",
        text: "Are you sure you want to delete this card ?",
        icon: "error",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "yes, delete it",
        cancelButtonText: "no, cancel",
        width:"270px"
    })
}


export function DeltedUserMes(user:UserInterface){
    return Swal.fire({
        title:"Delete User",
        text: "Are you sure you want to delete this user ?",
        html:`<div style=textAlign:"center">
                        <p>name: ${user.name.first} ${user.name.middle} ${user.name.last} </p>
                        <p>address: ${user.address.state} ${user.address.country} ${user.address.street}
                                ${user.address.city} ${user.address.houseNumber} ${user.address.zip}
                        </p>
                        <p> phone:  ${user.phone}</p>
                        <p> email:  ${user.email}</p>
                </div>`,
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "yes, delete it",
        cancelButtonText: "no, cancel",
        width:"270px"
    })
}