/* eslint-disable no-unused-vars */
// import React from 'react'
import { assets } from '../../assets/assets'
import { useInputContext } from '../../context/context'
import './main.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


function Main() {
  const {prompt, setPrompt, 
    recentPrompt, setRecentPrompt, 
    prevPrompts, setPrevPrompts, 
    showResults,
    onSent,
    loading,
    result,
    givenName,
    userimg} = useInputContext();
    
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            {userimg ? 
            <img src={userimg} alt="" /> :
            <GoogleLogin
                onSuccess={credentialResponse => {
                let credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                console.log(credentialResponseDecoded);
                Cookies.set('given_name', credentialResponseDecoded.given_name, { expires: 1 });
                Cookies.set('userimg', credentialResponseDecoded.picture, { expires: 1 });
                }}
                onError={() => {
                console.log('Login Failed');
                }}
            />}
        </div>
        <div className="main-container">
            {!showResults ? 
            <>
            <div className="greet">
                <p><span>Hello,
                    { givenName ? givenName : 'Guest' }
                </span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest some beautiful places to visit.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activity for our work retreats</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readibility of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :
            <div className="result">
                <div className="result-title">
                    <img src={userimg} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading ? 
                    <>
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                    </> :
                     <p dangerouslySetInnerHTML={{__html:result}}></p>
                    }
                </div>
            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" name="" id="" placeholder='Enter a prompt here' onChange={(e) => {
                        setPrompt(e.target.value)
                    }} value={prompt} />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {prompt ? <img src={assets.send_icon} alt="" onClick={() => {
                            onSent()
                        }} /> : null}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
