/**--------------------------------------------------------
 * File name: books.js
 * Author: YINGJIE ZHOU
 * StudentID: 301179194
 * WebAppName: Books Information for sale
 * Data: 2022/Oct/30
 * --------------------------------------------------------
 */

// modules required for routing
const { Console } = require('console');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  console.log("get_add");
  //redirect to details page
    res.render('books/details', {
      title: 'Add Book',
      books: books,
      Title: book.Title,
      Description: book.Description,
      Price: book.Price,
      Author: book.Author,
      Genre: book.Genre
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    //get data from form and translate to a modle
    let nbook = new books({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre,
      Description: req.body.description,
    });
    //insert new book to database
    nbook.save(function(err) {
      if (err) {
      console.log(err);
      return;
      } else {
        //redirect back to the list page
      res.redirect('/books');
      }
      });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
     let id = req.params.id;
     book.findById(id, function(err, book) {
     if (err) {
     return console.log(err);
     } else {
      //redirect to details page
     res.render('books/details', {
     title: 'Update Book',
     books: book,
     action: ""
     });
     }
     });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  //get data from form and translate to a modle
     let id = req.params.id;
     let nbook = new books({
      _id : id,
      Title: req.body.title,
      Author: req.body.author,
      Genre: req.body.genre,
      Price: parseFloat(req.body.price),
      Description: req.body.description
      });
      //update the book to database
      books.updateOne({_id:id}, nbook, (err) => {
      if (err) {
      return console.log(err);
      } else {
        //redirect back to the list page
      res.redirect('/books');
      }
      });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
console.log("Delete started");
     let id = req.params.id;
     //delete book
     books.remove({_id: id}, function(err) {
     if (err) {
     return console.log(err);
     } else {
      //refersh current page
     res.redirect('/books');
     }
     });
});


module.exports = router;
