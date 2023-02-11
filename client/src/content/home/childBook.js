import "./childBook.css";
import Image from "./booksImage.jpg";
import { useNavigate } from "react-router-dom";

const ChildBook =({book,index,setEachBookData,eachBookData})=>{
    const navigate = useNavigate();
    const eachBookNav =(e)=>{
        e.preventDefault();
        setEachBookData(book);
        navigate("/bookData");
    }
    return(
        <div key={index} onClick={(e)=>{eachBookNav(e)}}  className="eachBook">
            <img src={Image} type="jpeg/jpg" alt="book"></img>
            <p style={{color:"darkblue"}}>{book.Title}</p>
            <p style={{color:"gray"}}>{book.Author}</p>
            <p style={{color:"white"}}>{book.ISBN}</p>
        </div>
    )
}
export default ChildBook;