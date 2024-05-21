import React, { useEffect, useState } from 'react';
import Postcart from "./postcart/postCart"
import axios from "axios"
import "./post.css"
const Home =  () => {
    const [posts , setPosts] = useState([])
    
       useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get("http://localhost:5000/getPosts")
            setPosts(data.data)
            console.log(data.data);
        };
        fetchData();         
      }, []);
      
      //const filterPost =  filter.filter(data => data.title.toLowerCase().includes(filter.toLowerCase()))
      
    return (
        <div className='post'>
            {posts.map((post , i) =>(
                <Postcart key={i} post={post}/>
            ))}
        </div>
    );
}

export default Home;
