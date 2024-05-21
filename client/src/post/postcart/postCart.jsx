import React, { useState } from 'react';
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";

import "./postcart.css"; 
import axios from 'axios';
const HomeCart = ({ post}) => {

    const [commot , setCommot] = useState(false) 
    const storageUser = window.localStorage.getItem("email")
    const [content , setContent] = useState({ description: "" })

    const deletePost = (id) => {
        
    }

    const updatePost = async(id) => {
        console.log(5);

        const updatePost = await axios.patch(`http://localhost:5000/updatePost/${id}` , {comments : {content:content , user:storageUser}})
        console.log(updatePost);
    }

    const changeFunction = (e) => {
        setContent(e.target.value);
        console.log(post.comments);
    }

 

    return (
       
        <div className='home-cart'> 
            <div className='description'>{post?.description}</div> 
            <div className='info'>
                <span className='user-date'>{post?.user}</span>
                <span className='user-date'>{(post?.date)?.substring(0, 10)}</span>
            </div>
            <div className='icons'>
                <AiOutlineLike onClick={() => deletePost(post._id)} size={22} className='delete-icon'/>
                <div className='like'>{post?.like}</div>
                <FaRegCommentDots onClick={() =>{setCommot(!commot)}} className='update-icon'/> 
            </div>
            <div className='commotinput'>
                {commot && <div className='childcommotinput'>
                     <input type="text" onChange={changeFunction} /> 
                     <IoMdSend onClick={()=>updatePost(post._id)}/>
                     
                </div>}
               
            </div>
            
            {commot && <div>
                <label htmlFor="yorumlar">yorumlar : </label>
                <div id='yorumlar'>
                    {post.comments[0]?.content}
                </div>
                
                </div>}
        </div>
        
    );
}

export default HomeCart;
