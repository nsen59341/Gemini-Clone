// import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'

function SideBar() {
  const [extented, setExtented] = useState(false)
  return (
    <div className='sidebar'>
      <div className="top">
        <img className='menu' src={assets.menu_icon} alt="" onClick={() => {
            setExtented(!extented);
        }} />
        <div className="new-chat">
            <img src={assets.plus_icon} alt="" />
            { extented ? <p>New Chat</p> : null }
        </div>
        
        <div className="recent">
            <p className="recent-title">Recent</p>
            <div className='recent-entry'>
                <img src={assets.message_icon} alt="" />
                { extented ? <p>What is React...</p> : null }
            </div>
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
