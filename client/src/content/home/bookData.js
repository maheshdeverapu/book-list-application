import { useNavigate,Link } from "react-router-dom";
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
        <div className="addBook_data">
            <Link className="show_book" to={"/home"}>show Book List</Link>
            <h1>Book's Record</h1>
            <table>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><p>Title:</p></td>
                        <td><p> {eachBookData.Title}</p></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><p>Author:</p></td>
                        <td><p> {eachBookData.Author}</p></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><p>ISBN:</p></td>
                        <td><p> {eachBookData.ISBN}</p></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><p>Publisher:</p></td>
                        <td><p> {eachBookData.Publisher}</p></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td><p>Published_date:</p></td>
                        <td><p> {eachBookData.Published_date}</p></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td><p>Publisher_of_Book:</p></td>
                        <td><p> {eachBookData.Publisher_of_Book}</p></td>
                    </tr>
                </tbody>
            </table>
            {/* <p>Title:<b/> {eachBookData.Title}</p>
            <p>{eachBookData.Author}</p>
            <p>{eachBookData.ISBN}</p>
            <p>{eachBookData.Publisher}</p>
            <p>{eachBookData.Published_date}</p>
            <p>{eachBookData.Publisher_of_Book}</p> */}
            <div className="modify_buttons">
                <button className="button_one" onClick={(e)=>{deleteHandling(e)}}>Delete book</button>
                <button className="button_two" onClick={()=>{navigate("/editBook")}}>Edit book</button>
            </div>

        </div>

    )
}
export default BookData;
// Title,Author,ISBN,Publisher,Published_date,Publisher_of_Book