import { createContext } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({children}) => {

    const onSent = async(prompt) => {
        await runChat(prompt)
    }

    onSent("what is react js")

    const contextVal = {
        
    }

    return  (
        <Context.Provider value={contextVal}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider