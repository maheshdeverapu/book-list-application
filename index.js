const express = require("express");
const mongoose = require("mongoose");
const index = express();
const port = 5000;
index.get("/",(req,res)=>{
    res.send('i am from home')
})
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config({path:"config.env"})
}
mongoose.set('strictQuery', false);
const db = process.env.MONGODBURI;
const connectDatabase = async()=>{
    try{
        await mongoose.connect(db);
        console.log('MongoDB is connected')
    }catch(err){
        console.log(err.message);
        console.log('check your ENV VAR')
        process.exit(1);
    }
} 
connectDatabase();
index.use(express.json());
index.use(require("./authentication/signup"))

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }


index.listen(port,()=>{console.log(`server is up at port ${port}`)})