exports.chefs = function(req, res){
  res.render('chefs', {title: 'Chefs'});
};
exports.chef = function(req, res){
  res.render('chef', {title: 'Chef'});
};

exports.recipes = function(req, res){
  res.render('recipes', {title: 'Recipes'});
};
exports.recipe = function(req, res){
  res.render('recipe', {title: 'Recipe'});
};