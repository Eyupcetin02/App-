import React from 'react';
import './sidebar.css'; 
import { IoSettingsSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";



const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className='controllers'>
            <IoSettingsSharp style={{marginTop:55 , fontSize:30}} />
            <FaUser style={{marginTop:55 ,fontSize:30 }} />
            <IoMdNotifications style={{marginTop:55 , fontSize:35 }}/>
            </div>
        </div>
    );
}

export default Sidebar;