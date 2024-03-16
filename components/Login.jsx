import React, { useState } from 'react'
import "./Style.css";
import { BiShow, BiHide } from "react-icons/bi";
import {Link} from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [passHandle, setPassHandle] = useState(true);
    const [toast, setToast] = useState(true);
    const [handleToast, setHandleToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("Please Check the list of rules to be followed")
    const [toastColor, setToastColor] = useState("red");
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const showToast=(msg,col)=>{
        setHandleToast(true);
        setToastMsg(msg)
        setToastColor(col)
        setTimeout(() => {
            setHandleToast(false)
        }, 3000);
    }

    const showLoading = ()=>{
        setHandleToast(true);
        setToastMsg("Loading...");
        setToastColor("black");
    }


    // Defining Functions 
    const handlePassFunction = () => {
        if (passHandle) {
            setPassHandle(false);
        } else {
            setPassHandle(true);
        }
    }

    const handleOnChange =(e)=>{
        
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async(e) => {
        showLoading();
        e.preventDefault();
        // Password email rule
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if( data.email.length>0 && data.password.length > 0 ){
            if(!emailRegex.test(data.email)){
                showToast("Email value must be a email only","red");
            }
            else{
                try {
                    const response = await axios.post("http://localhost:3000/login",{
                        email: data.email,
                        password: data.password
                    }) 
                    if(response.data.success){
                        showToast("Login Successfull","green");
                    }else{
                        showToast("Password or Email is incorrect","red");
    
                    }
                    
                } catch (error) {
                    showToast(error,"red");
                }
            }

        }
        else{
            showToast("Please Enter All the values","red");
        }
    }

    return (
        <>


            <div id="main">
                {
                    handleToast &&
                    <div style={{ color: toastColor, fontWeight: 700 }} className='toast'>{toastMsg}</div>
                }
                <form className='registrationBox' onSubmit={handleSubmit}>

                    <h1>Login Here!</h1>

                    <div className='inputsThird'>
                        <input type="text" className='fonts' placeholder='example@example.com' name='email' onChange={(e) => { handleOnChange(e) }} />
                    </div>
                    
                    <div className="inputsFourth">
                        <div className="firstPass">
                            <input type={passHandle ? "password" : "text"} name='password' className='fonts passInput' placeholder='Password' onChange={(e) => { handleOnChange(e) }} />
                            {passHandle ? <BiHide className='passBtn' size={32} onClick={handlePassFunction} /> : <BiShow className='passBtn' size={32} onClick={handlePassFunction} />}
                        </div>
                    </div>

                   
                    <button className='submitBtn' type='submit' style={{ outline: "none" }} >Submit</button>
                    <p style={{fontSize:"12px"}}>Don't have Account <Link to="/" style={{color:"blue",cursor:"pointer"}}>Register Here</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login
