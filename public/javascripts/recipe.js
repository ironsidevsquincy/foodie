var recipeId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/recipes/' + recipeId,
    type: 'json',
  	method: 'get',
  	success: function (recipe) {
      domready(function() {
  			ko.applyBindings(recipe);

        bonzo(qwery('body')).append('<h3>Buy from Ocado</h3><ul id="ocado-list"></ul>');

        // get all the ingredients from ocado
        var ingredients = qwery('.ingredient');
        for (var i in ingredients) {
          reqwest({
            url: '/ocado/' + bonzo(qwery('a', ingredients[i])).html(),
            type: 'html',
            method: 'get',
            success: function(ingredientData) {
              bonzo(qwery('#ocado-list')).append(ingredientData);
            }
          })
        }
  		})
    }
})
