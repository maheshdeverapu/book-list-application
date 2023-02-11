import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
const EditBook=({eachBookData})=>{
    const [addBookData,setAddBookData] = useState({
        Title:eachBookData.Title,
        Author:eachBookData.Author,
        ISBN:eachBookData.ISBN,
        Publisher:eachBookData.Publisher,
        Published_date:eachBookData.Published_date,
        Publisher_of_Book:eachBookData.Publisher_of_Book

    });
    const navigate = useNavigate();
    // Title,Author,ISBN,Publisher,Published_date,Publisher_of_Book
const updateBookHandle=(e)=>{
    e.preventDefault();
    fetch(`/updateBook/${eachBookData._id}`,{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token"),               
        },

        body:JSON.stringify({
            addBookData
            
        })
    }).then(res=>res.json()).then((data)=>{
        if(data.error){
            return alert(data.error)
        }
        alert('book updated successfully')
        navigate("/home")
}).catch((err)=>{
    console.log(err)
}).finally()
}

    return(
        <div className="addBook_content">
            <div className="addBook_data">
          
           
        
                <Link className="show_book" to={"/home"}>show Book List</Link>
            
        
                <h1>Add Book</h1>
                <p>Create new book</p>
            
                    <input type={"text"} placeholder="Title of the Book" value={addBookData.Title} onChange={(e)=>{setAddBookData({...addBookData,Title:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="ISBN" value={addBookData.ISBN} onChange={(e)=>{setAddBookData({...addBookData,ISBN:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="Author" value={addBookData.Author} onChange={(e)=>{setAddBookData({...addBookData,Author:e.target.value})}}/>
            
            
                    <input type={"text"} placeholder="Describe this book" value={addBookData.Publisher} onChange={(e)=>{setAddBookData({...addBookData,Publisher:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="published_date" value={addBookData.Published_date} onChange={(e)=>{setAddBookData({...addBookData,Published_date:e.target.value})}}/>
                
            
                    <input type={"text"} placeholder="Publisher of this Book" value={addBookData.Publisher_of_Book} onChange={(e)=>{setAddBookData({...addBookData,Publisher_of_Book:e.target.value})}}/>
                
                <button onClick={(e)=>{updateBookHandle(e)}}>Submit</button>
            
           
            </div>
        </div>
    )
}
export default EditBook;