// import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useInputContext } from '../../context/context';

function SideBar() {
  const [extented, setExtented] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChatDisplay} = useInputContext();

  const showRecentPrompt = async(prompt) => {
    await setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img className='menu' src={assets.menu_icon} alt="" onClick={() => {
            setExtented(!extented);
        }} />
        <div className="new-chat" onClick={() => {newChatDisplay()}}>
            <img src={assets.plus_icon} alt="" />
            { extented ? <p>New Chat</p> : null }
        </div>
        
        <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className='recent-entry' key={index} onClick={()=>showRecentPrompt(item)}>
                  <img src={assets.message_icon} alt="" />
                  { extented ? <p>{item.slice(0,18)}...</p> : null }
                </div>
              )
            })}
            
        </div> 
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            { extented ? <p>Help</p> : null }
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            { extented ? <p>Activity</p> : null }
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            { extented ? <p>Settings</p> : null }
        </div>
      </div> 
    </div>
  )
}

export default SideBar
