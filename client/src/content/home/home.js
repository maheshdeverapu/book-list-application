import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChildBook from "./childBook";
import "./home.css"
const Home=({setEachBookData,eachBookData})=>{
    const [books,setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        booksHandle();
    },[])
    const booksHandle=()=>{
        const id=JSON.parse(localStorage.getItem("userName"))._id;
        
        fetch(`/getBooks/${id}`,{
            method:"get",
            headers:{
                "Content-Type":"application/json", 
                "Authorization":localStorage.getItem("token")
            },

            // body:JSON.stringify({
               
            // })
        }).then(res=>res.json()).then((data)=>{
            if(data.error){
                return alert(data.error)
            }
            console.log(data.data)
            setBooks(data.data);
            // alert('signin successfull')
            // localStorage.setItem("token",data.token)
            // localStorage.setItem("userName",data.userName)
          
    }).catch((err)=>{
        console.log(err)
    }).finally()

    

    }



    const logoutHandling=(e)=>{
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    return(
        <div>
            <button onClick={(e)=>{logoutHandling(e)}}>Logout</button>
            <div>
                <h1>Books List</h1>
            </div>
            <div>
                {/* <button onClick={(e)=>{addBookHandle(e)}}>+ Add New Book</button> */}
                <Link to={"/addBook"}>+ Add New Book</Link>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"auto auto auto"}}>
                {books? (books?.map((book,index)=>{
                    return(
                        <span className="main_books">
                            <ChildBook book={book} key={index} setEachBookData={setEachBookData} eachBookData={eachBookData}/>
                            </span>
                    )
                })):""}
            </div>
        </div>
    )
}
export default Home;