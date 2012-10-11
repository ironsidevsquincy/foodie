
var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    averageReview: Number,
    description: String,
    hero: String,
    isbn: String,
    reviews: [{
            uri: String
        }],
    extracts: [{
            uri: String
        }]
    })

module.exports = bookSchema
