import React from 'react';
import { BiLogOut } from "react-icons/bi";
import './navbar.css'; 

const Navbar = ({setModal}) => {
    
    const tokenFunction = () => {
        localStorage.clear()
        window.location = "/"
    }
    return (
        <div className='navbar-container'>
            <div className='navbar-title'>LOGO</div>
            <div className='navbar-items'>
                { <input
                    onChange={(e)=>{console.log(e.target.value)}}
                    type="text"
                    placeholder='Ara'
                    className='navbar-search'
                    style={{outline:"none"}}
                /> }
                <div className='navbar-create-post' onClick={()=> setModal(true)}>Etkinlik Oluştur</div>
                <BiLogOut onClick={tokenFunction} size={25} className='navbar-logout' />
            </div>
        </div>
    );
}

export default Navbar;
