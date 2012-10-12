var recipeId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/recipes/' + recipeId,
    type: 'json',
  	method: 'get',
  	success: function (recipe) {
      domready(function() {
  			ko.applyBindings(recipe);
        // get all the ingredients from ocado
        var ingredients = qwery('.ingredient');
        for (var i in ingredients) {
          var ingredient = ingredients[i];
          reqwest({
            url: '/ocado/' + bonzo(qwery('a', ingredient)).html(),
            type: 'html',
            method: 'get',
            success: function(ingredientData) {
              // add ocado data
              bonzo(ingredient).append(ingredientData);
            }
          })
          break;
        }
  		})
    }
})
