const mongoose = require('mongoose')

var dataschema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    data:{
        type:String
    },
    time:{
        type:String
    }
});
const data = mongoose.model('data',dataschema);

module.exports = data;