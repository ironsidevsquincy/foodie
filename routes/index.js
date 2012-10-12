
exports.chefs = function(req, res){
  res.render('chefs', {title: 'Chefs'});
};

exports.chef = function(req, res){
  res.render('chef', {title: 'Chef'});
};

exports.recipes = function(req, res){
  res.render('recipes', {title: 'Recipes'});
};

exports.recipes = function(req, res){
  res.render('ingredients', {title: 'Ingredients'});
};

exports.recipe = function(req, res){
  if (req.params.view === 'shopping'){
    res.render('shopping', {title: 'Shopping list'});
  }else{
    res.render('recipe', {title: 'Recipe'});
  }
};

