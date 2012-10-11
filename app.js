
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , recipeSchema = require('./models/recipes.js')
  , db = mongoose.createConnection('localhost', 'foodie');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  var chefSchema = new mongoose.Schema({
    name: String
  });

  var Recipe = db.model('Recipe', recipeSchema);
  
  var app = express();

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.send(500, 'Something broke!');
    });
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.post('/api/food/recipes', function(req, res) {
    var recipe = new Recipe(req.body);
    recipe.save(function(err){
        console.log(err);
    });
  });
  
  app.get('/api/food/recipes', function(req, res) {
    Recipe.find(function (err, recipes) {
      res.send(recipes);
    });
  });

  app.get('/api/food/chefs', function(req, res) {
    Chef.find(function (err, chefs) {
      res.send(chefs);
    });
  });
  
  app.get('/api/food/chefs/:chef', function(req, res) {
    Chef.findById(req.params.chef, function (err, chef) {
      res.send(chef);
    });
  });

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

});
