import "./childBook.css";
const ChildBook =({book,index})=>{
    return(
        <div key={index} onClick={()=>{}} className="eachBook">
            <img src={"./booksImage"} type="jpeg/jpg" alt="book"></img>
            <p>{book.Title}</p>
            <p>{book.Author}</p>
            <p>{book.ISBN}</p>
        </div>
    )
}
export default ChildBook;