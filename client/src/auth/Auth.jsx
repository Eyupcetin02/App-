import React, { useState } from 'react';
import "./auth.css"
import axios  from "axios"
const Auth = () => {
    const [signUp , setSignUp] = useState(true)
    const [authData , setAuthData] = useState({username:"" , email:"" , password:""})
    
    const onChangeFunc = (e)=>{
setAuthData({...authData , [e.target.name] : e.target.value})
console.log(authData);
    }

    const register = async()=>{
        const createUser = await axios.post("http://localhost:5000/register" , authData)
        const redisUser = await axios.get("http://localhost:5000/getuser")
        const redisToken = await axios.get("http://localhost:5000/getToken")
        
        console.log("createUser" , createUser);
        window.localStorage.setItem("email" , redisUser.data.user)
        window.localStorage.setItem("token" , redisToken.data.data)
        window.location = "/home"
    }
  
    return (
        <div className='authContainer'>
            <div className='authChildContainer'>
                <h1 className='authTitle'>{signUp ? "SIGN UP" : "LOG IN"}</h1>
                <div className='inputContainer'>
                    {signUp && <input value={authData.username} name='username' onChange={onChangeFunc} type="text" placeholder='UserName' className='authinput'/>}
                    <input value={authData.email} name='email' onChange={onChangeFunc} type="text" placeholder='Email' className='authinput'/>
                    <input value={authData.password} name='password' onChange={onChangeFunc} type="text" placeholder='Password' className='authinput'/>
                </div>
                <div className='authsignUp'>

                    {
                        signUp ? <span onClick={()=>setSignUp(!signUp) }>Giriş Yap</span> : <span onClick={()=>setSignUp(!signUp) }>Kayıt Ol</span>
                    }
                </div>
                <div onClick={register} className='authButton'>{signUp ?"Kayıt Ol": "Giriş Yap"}</div>
            </div>
        </div>
    );
}

export default Auth;




