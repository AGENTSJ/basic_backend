const mongoose = require('mongoose')

var userschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
var user = mongoose.model('user',userschema);

user.createIndexes();

module.exports = user;
