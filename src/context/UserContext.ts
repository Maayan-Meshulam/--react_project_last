import { createContext } from "react";
import { TokenInterface } from "../interfaces/tokenInterface";


export interface userInfoConnectContextInterface{
    userBaseInfo: TokenInterface | undefined,
    setUserBaseInfo: Function
}
    
export const userConnectInfoContext = createContext<userInfoConnectContextInterface>({
    userBaseInfo: undefined,
    setUserBaseInfo:()=>{}
});

export default userConnectInfoContext;


