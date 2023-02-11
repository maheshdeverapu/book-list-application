const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    Title:{type:String,required:true},
                Author:{type:String,required:true},
                ISBN:{type:String,required:true},
                Publisher:{type:String,required:true},
                Published_date:{type:String,required:true},
                Publisher_of_Book:{type:String,required:true},
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

})

const posts = mongoose.model('Posts',ActivitySchema);

module.exports = posts;