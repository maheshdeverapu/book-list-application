import { useNavigate } from "react-router-dom";
import "./bookData.css";
const BookData=({eachBookData})=>{
    const navigate = useNavigate();
   const deleteHandling = (e)=>{
    e.preventDefault();
    fetch(`/deleteBook/${eachBookData._id}`,{
        method:"delete",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token"),               
        },

    
    }).then(res=>res.json()).then((data)=>{
        // if(data.error){
        //     return alert(data.error)
        // }
        alert('book deleted successfully')
        navigate("/home")
}).catch((err)=>{
    console.log(err)
}).finally()
   }
    return(
        <div>
            <p>{eachBookData.Title}</p>
            <p>{eachBookData.Author}</p>
            <p>{eachBookData.ISBN}</p>
            <p>{eachBookData.Publisher}</p>
            <p>{eachBookData.Published_date}</p>
            <p>{eachBookData.Publisher_of_Book}</p>
            <div>
                <button onClick={(e)=>{deleteHandling(e)}}>Delete book</button>
                <button onClick={()=>{navigate("/editBook")}}>Edit book</button>
            </div>

        </div>

    )
}
export default BookData;
// Title,Author,ISBN,Publisher,Published_date,Publisher_of_Book