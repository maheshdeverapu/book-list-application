import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./authentication/signin";
import Signup from "./authentication/signup";
import AddBook from "./home/addBook";
import Home from "./home/home";
const Router =()=>{
    const [eachBookData,setEachBookData] = useState([]);
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home setEachBookData={setEachBookData} eachBookData={eachBookData}/>}/>
                <Route path="/addBook" element={<AddBook/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/" element={<Signin/>}/>
                {/* <Route path="/" element={<Home/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}
export default Router;