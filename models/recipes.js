
var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    key: String,
    chef: String,
    class: String, 
    article: String,
    ingredients: [{
        quantity: Number,
        ingredient: String,
        alternate: String,
        unit: String,
        tip: String
        }]
    });

module.exports = recipeSchema
