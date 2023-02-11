const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    books:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Posts"
        }
    ]

})

let User = mongoose.model('users',userSchema);

module.exports = User;