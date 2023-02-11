import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./authentication/signin";
import Signup from "./authentication/signup";
import AddBook from "./home/addBook";
import BookData from "./home/bookData";
import EditBook from "./home/editBook";
import Home from "./home/home";
const Router =()=>{
    const [eachBookData,setEachBookData] = useState([]);
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home setEachBookData={setEachBookData} eachBookData={eachBookData}/>}/>
                <Route path="/addBook" element={<AddBook setEachBookData={setEachBookData} eachBookData={eachBookData}/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/" element={<Signin/>}/>
                <Route path="/bookData" element={<BookData setEachBookData={setEachBookData} eachBookData={eachBookData}/>}/>
                <Route path="/editBook" element={<EditBook eachBookData={eachBookData}/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;