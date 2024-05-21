import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios"
import './modal.css'; 

const Modal = ({setModal}) => {
    const [postData, setPostData] = useState({ user: "",description: "" });

    useEffect(()=>{
      const storageEmail =   window.localStorage.getItem("email")
        setPostData({user : storageEmail})
    }, [])

    const createPost = async()=>{
        const dataPost = await axios.post("http://localhost:5000/createPost" , postData)
        setModal(false)
    }

    const changeFunction = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const modal = true;

    return (
        <div className='modal-container'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title'>{modal?.updateId ? "POST GÜNCELLE" : "POST PAYLAŞ"}</h1>
                    <AiOutlineClose onClick={()=> setModal(false)} size={25} className='modal-close' />
                </div>
                <div className='modal-body'>
                    <input
                        value={postData.user}
                        name='user'
                        className='modal-input'
                        type="text"
                        placeholder='User'
                    />
                    <textarea
                        onChange={changeFunction}
                        value={postData.description}
                        name='description'
                        className='modal-input'
                        type="text"
                        placeholder='Description'
                    />
                </div>
                <div className='modal-footer'>
                    <div onClick={createPost} className='modal-button'>{modal?.updateId ? "GÜNCELLE" : "Paylaş"}</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
