const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/movie_app';


const connection = mongoose.createConnection(mongoURI).on('open', ()=>{
    console.log("Connection is created")
}).on('error', ()=>{
    console.log("Connection fail")

});

module.exports = connection;
