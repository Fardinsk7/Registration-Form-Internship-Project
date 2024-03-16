import React, { useState } from 'react'
import "./Style.css";
import { BiShow, BiHide } from "react-icons/bi";
import {Link} from "react-router-dom";


const Signup = () => {
    const [passHandle, setPassHandle] = useState(true);
    const [toast, setToast] = useState(true);
    const [handleToast, setHandleToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("Please Check the list of rules to be followed")
    const [toastColor, setToastColor] = useState("red");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    const handleSubmit = (e) => {
        showLoading();
        e.preventDefault();
        // Password validation rules
        const regexNumber = /\d/;
        const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const regexUpperCase = /[A-Z]/;
        const regexLowerCase = /[a-z]/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(data.firstName.length>0 && data.lastName.length>0 && data.address.length > 0 ){
            if(!emailRegex.test(data.email)){
                showToast("Email value must be a email only","red");
            }
            else if(data.password != data.confirmPassword){
                showToast("Password and Confirm Password should be same!!!","red");
            }
            else if(data.password.length < 7){
                showToast("Password length must be more than 6","red");
            }
            else if(!regexNumber.test(data.password)){
                showToast("Password must have atleast a Number","red");
            }
            else if(!regexSpecialChar.test(data.password)){
                showToast("Password must have atleast a Special Character","red");
            }
            else if(!regexUpperCase.test(data.password)){
                showToast("Password must have atleast a Upper Case","red");
            }
            else if(!regexLowerCase.test(data.password)){
                showToast("Password must have atleast a Lower Case","red");
            }
            else{
                showToast("Registration Successfull","green");
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

                    <h1>Register Here!</h1>

                    <div className="inputsFirst">
                        <input type='text' className='fonts firstName' placeholder='First Name' name='firstName' onChange={(e) => {handleOnChange(e)}} />
                        <input type='text' className='fonts lastName' placeholder='Last Name' name='lastName' onChange={(e) => {handleOnChange(e) }} />
                    </div>

                    <div className='inputsSecond'>
                        <textarea className='fonts' placeholder='Enter Address' name='address' onChange={(e) => {handleOnChange(e)  }} />
                    </div>

                    <div className='inputsThird'>
                        <input type="text" className='fonts' placeholder='example@example.com' name='email' onChange={(e) => { handleOnChange(e) }} />
                    </div>
                    
                    <div className="inputsFourth">
                        <div className="firstPass">
                            <input type={passHandle ? "password" : "text"} name='password' className='fonts passInput' placeholder='Password' onChange={(e) => { handleOnChange(e) }} />
                            {passHandle ? <BiHide className='passBtn' size={32} onClick={handlePassFunction} /> : <BiShow className='passBtn' size={32} onClick={handlePassFunction} />}
                        </div>
                        <div className="secondPass">
                            <input type={passHandle ? "password" : "text"} name='confirmPassword'  className='fonts passInput' onChange={(e) => {handleOnChange(e) }} placeholder='Confirm Password' />
                            {passHandle ? <BiHide className='passBtn' size={32} onClick={handlePassFunction} /> : <BiShow className='passBtn' size={32} onClick={handlePassFunction} />}

                        </div>
                    </div>

                    <div className="rulesBox">
                        <ul className='listBox'>
                            <li>Password must have atleast 7 characters</li>
                            <li>Password must have atleast a number</li>
                            <li>Password must have atleast a special character</li>
                            <li>Password must have atleast a Upper case</li>
                            <li>Password must have atleast a Lower case</li>
                        </ul>
                    </div>
                    <button className='submitBtn' type='submit' style={{ outline: "none" }} >Submit</button>
                    <p  style={{fontSize:"12px"}}>Already have Account <Link to="/login" style={{color:"blue",cursor:"pointer"}}>Login Here</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup
