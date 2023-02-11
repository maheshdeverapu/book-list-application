import {useState} from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signup.css";
const Signup = ()=>{

    const [userName,setUserId] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirm_password] = useState("");
    const [popUp,setPopup] = useState("");
    const [detailsValidation,setDetailsValidation] = useState(false);
    const [userIdValidation,setUserIdValidation] = useState(false);
    const [passwordLength,setPasswordLength] = useState(false);
    const [passwordValidation,setPasswordValidation] = useState(false);

    const navigate = useNavigate();
    const userIdReg = /@./ 
    const passwordReg = /^[a-zA-Z0-9]@*$/
    const signupHandling = (e)=>{
        e.preventDefault();
        setDetailsValidation(false);
        setUserIdValidation(false);
        setPasswordLength(false);
        setPasswordValidation(false);
        if(!userName || !password || !confirmPassword){
           return setDetailsValidation(true);
        }
        else if(!userIdReg.test(userName)){
            return setUserIdValidation(true);}
        else if(password.length < 8){
            return setPasswordLength(true);
        }
        else if(passwordReg.test(password)){
            return setPasswordValidation(true);
        }
        fetch("/signup",{
            method :"post",
            headers : {"Content-Type" : "application/json"},
            body:JSON.stringify({
                userName,
                password,
                confirmPassword
            })
        }).then(res=>res.json()).then((data)=>{
            // setPopup(data.message)
            console.log(data,data.error)
            if(data.error){
                return alert(data.error);
            }
            alert('signup successfull');
            navigate("/")     
    }).catch((err)=>{
        console.log(err,"i am here")
    }).finally()
    }

    return(
        <div className={"signup-page"}>
        {detailsValidation?<p className="emptyAlert">Password enter all fields</p>:""}
        {userIdValidation?<p className="emptyAlert">Please enter valid userId</p>:""}
        {passwordLength?<p className="emptyAlert">Password should have atleast 8 characters</p>:""}
        {passwordValidation?<p className="emptyAlert">Password should have '@'</p>:""}
        <div className="signup-content">
        {/* <img className="signup-logo" src="https://media.istockphoto.com/id/1217096485/vector/geometric-logo-related-to-property-real-estate-agent-or-construction.jpg?s=612x612&w=0&k=20&c=ZdnrJ4sTVP3XwOrCzBHlbmclDVGtvXJwmQpImjkCM3Q="></img> */}
        <p className="signup-details">create new accout</p>
        <form className="s">
        {/* <h3 className="signup-he"ader">Signup</h3> */}
            <div >
                {/* <label htmlFor={"userid"}>UserId</label> */}
                <input className="signup-mail" type={"email"} id={"userid"} placeholder={"MailID"} onChange={(event)=>{setUserId(event.target.value)}}></input>
            </div >
            <div >
                {/* <label htmlFor={"password"}>Password</label> */}
                <input className="signup-password" type={"password"} id={"password"} placeholder={"PASSWORD"} onChange={(event)=>{setPassword(event.target.value)}}></input>
            </div>
            <div >
                {/* <label htmlFor={"confirm-password"}>Confirm Password</label> */}
                <input className="signup-confirm-password" type={"password"} id={"confirm-password"} placeholder={"CONFIRM PASSWORD"} onChange={(event)=>{setConfirm_password(event.target.value)}}></input>
            </div>
            <button  className="signup-submit" onClick={(e)=>{signupHandling(e)}}>Signup</button>
            {popUp && (
                <>
                <div>{popUp}</div>
                <button inClick={()=>{setPopup("")}}>ok</button>
                </>
            )}
        </form>
        </div>
            <div className="login-signIn">Have an account?<Link  to={"/"}>SignIn</Link></div>
    </div>
    )
}
export default Signup;