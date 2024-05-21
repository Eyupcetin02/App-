import React, { useEffect, useState } from 'react';
import Auth from './auth/Auth';
import Navbar from './navbar/Navbar';
import {BrowserRouter , Routes , Route , Link , Navigate} from "react-router-dom"
import Modal from './modal/Modal';
import Footer from './footer/footer';
import Post from './post/post';
import Sidebar from './sidebar/Sidebar';

const App = () => {
  const [token , setToken] = useState()
  useEffect(()=>{
    const storagetoken = window.localStorage.getItem("token")
    console.log(token);
    setToken(storagetoken)
  },[token])
  const [modal , setModal] = useState(false)
  return (
    <div>
      <BrowserRouter>
    {token &&  <Navbar setModal={setModal}/>}
    {token && <Sidebar/>}
    
    {modal && <Modal setModal={setModal}/>}
    <Routes>
    <Route path='/' element={<Auth/>}/>
    <Route path='/home' element={<Post/>}/>
    </Routes>
    {token &&  <Footer/>}
    </BrowserRouter>
    </div>
  );
}

export default App;
