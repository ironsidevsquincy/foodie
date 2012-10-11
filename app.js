
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , recipeSchema = require('./models/recipes.js')
  , chefSchema = require('./models/chefs.js')
  , db = mongoose.createConnection('localhost', 'foodie');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  // Models
  var Recipe = db.model('Recipe', recipeSchema);
  var Chef = db.model('Chef', chefSchema);

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

  // WWW
  app.get('/food/chefs', routes.chefs);
  app.get('/food/chefs/:chef', routes.chef);
  app.get('/food/recipes', routes.recipes);
  app.get('/food/recipes/:recipe', routes.recipe);

  // API

  // Recipes

  app.post('/api/food/recipes', function(req, res) {
    var recipe = new Recipe(req.body); // TODO validation
    recipe.save(function(err){
        res.send("saved!");
    });
  });

  app.get('/api/food/recipes', function(req, res) {
    Recipe.find(function (err, recipes) {
      res.send(recipes);
    });
  });

  app.get('/api/food/recipes/:recipe', function(req, res) {
    Recipe.findOne({"key": req.params.recipe},  function (err, recipe) {
        res.send(recipe);
    });
  });

  // Chefs

  app.post('/api/food/chefs', function(req, res) {
    var chef = new Chef(req.body); // TODO validation
    chef.save(function(err){
        res.send("saved!");
    });
  });

  app.get('/api/food/chefs', function(req, res) {
    Chef.find(function (err, chefs) {
      res.send(chefs);
    });
  });

  app.get('/api/food/chefs/:chef', function(req, res) {
    Chef.findOne({"key": req.params.chef}).populate('chef').exec(function (err, chef) {
        var c = chef.toObject();
        Recipe.find({"chef": chef.name}, function(err, recipes){
            c.recipes = recipes
            res.send(c);
        })
    });
  });

  // Server

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

});
