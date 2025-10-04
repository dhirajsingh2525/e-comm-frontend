const mongoose = require('mongoose');

function connectToDB(){
   mongoose.connect("mongodb://127.0.0.1:27017/class9")
    .then(()=>{
        console.log("connected to mongodb")
    })
}

module.exports = connectToDB;