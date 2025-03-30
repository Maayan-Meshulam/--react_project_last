import { createContext } from "react";


export type Mode = "dark" | "light";

export interface WebModeInterface{
    mode:Mode,
    setMode: ()=> void
}

export const webModeContext = createContext<WebModeInterface>({
    mode : "light",
    setMode : ()=>{}
})