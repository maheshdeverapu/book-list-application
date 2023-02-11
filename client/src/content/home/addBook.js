import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addBooks.css";
const AddBook =()=>{
    const [addBookData,setAddBookData] = useState([]);
    const navigate = useNavigate();
    const addBookHandle = (e)=>{
        e.preventDefault();
        if(Object.keys(addBookData).length!==6){
            return alert('please fill all fields')
          
        }
        fetch("/addBooks",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token"),               
            },

            body:JSON.stringify({
                addBookData,user:JSON.parse(localStorage.getItem("userName"))
                
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.error){
                return alert(data.error)
            }
            alert('book added successfully')
            // localStorage.setItem("token",data.token)
            // localStorage.setItem("userName",data.userName)
            navigate("/home")
    }).catch((err)=>{
        console.log(err)
    }).finally()
    // Title,Author,ISBN,Publisher,Published_date,Publisher_of_Book
    }
    return(
        <div className="addBook_content">
            <div className="addBook_data">
          
           
        
                <Link className="show_book" to={"/home"}>show Book List</Link>
            
        
                <h1>Add Book</h1>
                <p>Create new book</p>
            
                    <input type={"text"} placeholder="Title of the Book" onChange={(e)=>{setAddBookData({...addBookData,Title:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="ISBN" onChange={(e)=>{setAddBookData({...addBookData,ISBN:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="Author" onChange={(e)=>{setAddBookData({...addBookData,Author:e.target.value})}}/>
            
            
                    <input type={"text"} placeholder="Describe this book" onChange={(e)=>{setAddBookData({...addBookData,Publisher:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="published_date" onChange={(e)=>{setAddBookData({...addBookData,Published_date:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="Publisher of this Book" onChange={(e)=>{setAddBookData({...addBookData,Publisher_of_Book:e.target.value})}}/>
                
               <button onClick={(e)=>{addBookHandle(e)}}>Submit</button>
            
           
            </div>
        </div>
    )
}
export default AddBook;