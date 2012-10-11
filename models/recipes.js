
var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    key: String,
    synopsis: String,
    chef: String, 
    dish: [ String ], 
    uri: String,
    hero: String,
    ingredients: [{
        quantity: Number,
        ingredient: String,
        alternate: String,
        unit: String,
        tip: String
        }],
    preparationSteps: [{
        crosshead: String,
        p: String
        }]
    });

module.exports = recipeSchema
