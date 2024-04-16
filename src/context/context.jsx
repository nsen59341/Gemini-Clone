import { createContext, useContext, useState } from "react";
import runChat from "../config/gemini";
import Cookies from "js-cookie";

export const Context = createContext();

// eslint-disable-next-line react/prop-types
const ContextProvider = ({children}) => {

    // onSent("what is react js") 

    const [prompt, setPrompt] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('')
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')

    const delayPara = (idx, nextWord) => {
        setTimeout(() => {
            setResult(prev => prev+nextWord);
        }, 75*idx);
    }

    const newChatDisplay = () => {
        console.log('newChatDisplay')
        setShowResults(false)
        setLoading(false)
    }

    // eslint-disable-next-line no-unused-vars
    const onSent = async(promptInput) => {
        setResult("");
        setLoading(true);
        setShowResults(true);
        let response;
        if(promptInput!=undefined)
        {
            response = await runChat(promptInput)
            setRecentPrompt(promptInput)

        }
        else{
            setRecentPrompt(prompt);
            setPrevPrompts(prev => [...prev, prompt])
            response = await runChat(prompt)
        }
        // setRecentPrompt(prompt);
        // setPrevPrompts(prev => [...prev, prompt])
      
        let respArr = response.split("**")
        let newResponse = "";

        for(let i=0; i<respArr.length; i++){
            if(i===0 || i%2!==1){
                newResponse += respArr[i]
            }
            else{
                newResponse += "<b>"+respArr[i]+"</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")

        let newResponseArr = newResponse2.split(' ');

        for (let i=0; i<newResponseArr.length; i++) {
            delayPara(i, newResponseArr[i]+' ')
        }
        
        setLoading(false)
        setPrompt("")
    }
    
    let givenName = Cookies.get('given_name');
    let userimg = Cookies.get('userimg');
    console.log('userimg',userimg);

    const contextVal = {
        prompt, setPrompt, 
        recentPrompt, setRecentPrompt, 
        prevPrompts, setPrevPrompts, 
        showResults,
        onSent,
        loading,
        result,
        newChatDisplay,
        givenName,
        userimg
    }

    return  (
        <Context.Provider value={contextVal}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useInputContext = () => {
    return useContext(Context);
}