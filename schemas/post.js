const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    Title:{type:String},
                Author:{type:String},
                ISBN:{type:String},
                Publisher:{type:String},
                Published_date:{type:String},
                Publisher_of_Book:{type:String}

})

let Posts = mongoose.model('posts',ActivitySchema);

module.exports = Posts;