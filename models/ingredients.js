
var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    wikiId: String,
    nutrition: [{
        property: String,
        per100g: Number
    }],
    suppliers: [{
        shop: String
    }],
    articles: [{
        uri: String
    }]
})

module.exports = ingredientSchema
