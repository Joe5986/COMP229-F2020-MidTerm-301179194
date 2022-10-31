/**--------------------------------------------------------
 * File name: books.js
 * Author: YINGJIE ZHOU
 * StudentID: 301179194
 * WebAppName: Books Information for sale
 * Data: 2022/Oct/30
 * --------------------------------------------------------
 */

 let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books-midterm"
});

module.exports = mongoose.model('Book', Book);
