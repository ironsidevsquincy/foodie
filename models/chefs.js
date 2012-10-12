
var mongoose = require('mongoose');

var chefSchema = new mongoose.Schema({
    name: String,
    key: String,
    wiki_id: String,
    biog: String,
    interviews: [{
        uri: String,
        headline: String,
        standfirst: String,
        date: String
    }],
    books: [{
        isbn: String
    }],
    restaurants: [{
        name: String
        }]
    });

module.exports = chefSchema
