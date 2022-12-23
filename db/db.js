const mongoose = require('mongoose')

async function connectdb(){

    await mongoose.connect('mongodb://localhost:27017/learn');
    console.log('connection established');
    
}

module.exports = connectdb;