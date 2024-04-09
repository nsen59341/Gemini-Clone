import { createContext, useContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({children}) => {

    // onSent("what is react js") 

    const [prompt, setPrompt] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('')
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')

    const delayPara = (idx, nextWord) => {

    }

    const onSent = async(promptInput) => {
        setResult("");
        setLoading(true);
        setShowResults(true);
        setRecentPrompt(prompt);
        const response = await runChat(prompt);
        let respArr = response.split("**")
        let newResponse;

        for(let i=0; i<respArr.length; i++){
            if(i===0 || i%2!==1){
                newResponse += respArr[i]
            }
            else{
                newResponse += "<b>"+respArr[i]+"</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")

        setResult(newResponse2)
        setLoading(false)
        setPrompt("")
    }

    const contextVal = {
        prompt, setPrompt, 
        recentPrompt, setRecentPrompt, 
        prevPrompts, setPrevPrompts, 
        showResults,
        onSent,
        loading,
        result
    }

    return  (
        <Context.Provider value={contextVal}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider

export const useInputContext = () => {
    return useContext(Context);
}