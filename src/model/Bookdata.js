//Access Mongooose package
const mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb+srv://USER1:USER1@nanfiles.4pr4chi.mongodb.net/test');



//Schema definition
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    image: String
})

//model 
const Bookdata = mongoose.model('bookdata',BookSchema);

//export
module.exports = Bookdata;