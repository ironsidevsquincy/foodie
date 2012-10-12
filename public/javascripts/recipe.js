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
          reqwest({
            url: '/ocado/' + bonzo(qwery('a', ingredients[i])).html(),
            type: 'html',
            method: 'get',
            success: function(ingredientData) {
              var ingredientName = encodeURIComponent(this.url.split('/').pop());
              var ingredient = qwery('.ingredient a[href$="' + ingredientName + '"]', document.body);
              // add ocado data
              bonzo(bonzo(ingredient).parent()).append(ingredientData);
            }
          })
        }
  		})
    }
})
