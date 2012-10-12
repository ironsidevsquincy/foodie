
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
  , bookSchema = require('./models/books.js')
  , ingredientSchema = require('./models/ingredients.js')
  , db = mongoose.createConnection('localhost', 'foodie')
  , jsdom = require('jsdom')
  , request = require('request');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  // Models
  var Recipe = db.model('Recipe', recipeSchema);
  var Chef = db.model('Chef', chefSchema);
  var Book = db.model('Book', bookSchema);
  var Ingredient = db.model('Ingredient', ingredientSchema);

  // Express

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

  app.get('/about', routes.about);
  app.get('/food/chefs', routes.chefs);
  app.get('/food/chefs/:chef', routes.chef);
  app.get('/food/recipes', routes.recipes);
  app.get('/food/recipes/:recipe', routes.recipe);
  app.get('/food/recipes/:recipe/:view', routes.recipe);
  app.get('/food/ingredients', routes.ingredients);
  app.get('/food/ingredients/:ingredient', routes.ingredient);

  // screen scrap ocado
  app.get('/ocado/:ingredient', function(req, res) {
    request('http://www.ocado.com/webshop/getSearchProducts.do?clearTabs=yes&isFreshSearch=true&entry=' + req.params.ingredient, function (error, response, body) {
      // pull out first product from search
      jsdom.env({
        html: body,
        scripts: [
          'http://code.jquery.com/jquery-1.8.0.min.js'
        ]
      }, function (err, window) {
        var product = window.$('#prodList .productDetails').first();
        var productImage = product.find('.productImageContainer a');
        var link = window.$('<a></a>')
          .attr('href', 'http://www.ocado.com' + productImage.attr('href'))
          .text('Buy from Ocado - ' + product.find('.typicalPrice').text());
        var h4 = window.$('<h4></h4>')
          .append(link)
        var ingredient = window.$('<div></div>')
          .append(h4)
          .append(productImage.find('img'))

        res.setHeader('Cache-Control', 'max-age=3600, public');
        res.send(ingredient.html())
      });
    })
  });

  // API

  // Ingredients

  app.post('/api/food/ingredients', function(req, res) {
    var ingredient = new Ingredient(req.body);
    ingredient.save(function(err){
        if (err)
            console.log(err);
        res.send(req.body.name + " ingredient saved!\n");
    });
  });

  app.get('/api/food/ingredients', function(req, res) {
    Ingredient.find(function (err, recipes) {
      res.send(recipes);
    });
  });

  app.get('/api/food/ingredients/:ingredient', function(req, res) {
    Ingredient.findOne({'name': req.params.ingredient}, function (err, ingredient) {
      res.send(ingredient);
    });
  });

  // Books

  app.post('/api/food/books', function(req, res) {
    var book = new Book(req.body); // TODO validation
    book.save(function(err){
        if (err)
            console.log(err);
        res.send(req.body.title + " book saved!\n");
    });
  });

  // Recipes

  app.post('/api/food/recipes', function(req, res) {
    var recipe = new Recipe(req.body); // TODO validation
    recipe.save(function(err){
        if (err)
            console.log(err);
        res.send(req.body.name + " recipe saved!\n");
    });
  });

  app.get('/api/food/recipes', function(req, res) {
    Recipe.find(function (err, recipes) {
      res.send(recipes);
    });
  });

  app.get('/api/food/recipes/:recipe', function(req, res) {
    Recipe.findOne({"key": req.params.recipe},  function (err, recipe) {
        var r = recipe.toObject();
        Book.find({"author": recipe.chef}, function(err, books){
            if (!err)
                r.books = books
            var c = Chef.findOne({"name": recipe.chef}, function(err, chef){
            if (!err && chef) r.chef = chef
                res.send(r);
                })
        })
     });
  });

  // Chefs

  app.post('/api/food/chefs', function(req, res) {
    var chef = new Chef(req.body); // TODO validation
    chef.save(function(err){
        if (err)
            console.log(err);
        res.send(req.body.name + " chef saved!\n");
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
            if (!err)
                c.recipes = recipes
            Book.find({"author": chef.name}, function(err, books){
                if (!err)
                    c.books = books
                res.send(c);
            })
        })
    });
  });

  // Server

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

});
