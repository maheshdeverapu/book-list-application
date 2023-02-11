import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import React from "react";
import "./signin.css";
const Signin = ()=>{
    const [userName,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const [passwordType,setPasswordType]=useState("password")
    const [emptyAlert,setEmptyAlert] = useState(false);
 
        const navigate = useNavigate();
        const loginHandling =(e)=>{
            e.preventDefault();
            setEmptyAlert(false);
            
            if(!userName || !password){
                return setEmptyAlert(true);  
            }        
            
            fetch("/signin",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"                
                },
    
                body:JSON.stringify({
                    userName,
                    password
                })
            }).then(res=>res.json()).then((data)=>{
                console.log(data)
                if(data.error){
                    return alert(data.error)
                }
                alert('signin successfull')
                localStorage.setItem("token",data.token)
                localStorage.setItem("userName",data.userName)
                navigate("/home")
        }).catch((err)=>{
            console.log(err)
        }).finally()
        }
       

    return(

        <div className="login-page">
        {emptyAlert?<p className="emptyAlert">Please enter all fields</p>:""}
     
        <div className="login-content">
            {/* <img className="login-logo"  src="https://media.istockphoto.com/id/1217096485/vector/geometric-logo-related-to-property-real-estate-agent-or-construction.jpg?s=612x612&w=0&k=20&c=ZdnrJ4sTVP3XwOrCzBHlbmclDVGtvXJwmQpImjkCM3Q="></img> */}
            <p  className="login-details">Member Login</p>
            <form>
                <div>
                    <input className="login-mail" placeholder="MailID" type="text" id="userName" onChange={(event)=>{setUserId(event.target.value)}}></input>
                </div>
                <div  className="login-password">

                    <input placeholder="PASSWORD" type={passwordType} id="password" onChange={(event)=>{setPassword(event.target.value)}} value={password}></input>
                    {passwordType==="password"?<span className="password_type1" onClick={()=>{setPasswordType("text")}}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RkjG8OKAFZVrLZWJVuH63scnaBihMUjyBg&usqp=CAU" style={{"width":"30px"}}></img></span>:<span className="password_type" onClick={()=>{setPasswordType("password")}}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcGpfjFELFuDclOe1qdzHrKUTyKB_LPxO-vw&usqp=CAU" style={{"width":"50px"}}></img></span>}
                </div>
                <button className="login-submit" onClick={(e)=>{loginHandling(e)}}>Login</button>
                <br></br>
                <span className="login-signup">don't have an account?<Link  to={"/signup"}>Signup</Link></span>
                
            </form>
       </div>
    </div>
    )
}
export default Signin;