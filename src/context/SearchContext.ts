import { createContext } from "react";

export interface searchInterface{
    exppToSearch : string,
    setSearchExpp : (exppression:string)=> void
}

export const searchContext = createContext<searchInterface>({
    exppToSearch: "", 
    setSearchExpp: ()=>{}
});