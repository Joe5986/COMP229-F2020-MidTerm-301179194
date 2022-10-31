/**--------------------------------------------------------
 * File name: index.js
 * Author: YINGJIE ZHOU
 * StudentID: 301179194
 * WebAppName: Books Information for sale
 * Data: 2022/Oct/30
 * --------------------------------------------------------
 */


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
