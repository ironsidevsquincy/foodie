var recipeId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/recipes/' + recipeId,
    type: 'json',
  	method: 'get',
  	success: function (recipe) {
        domready(function() {
			ko.applyBindings(recipe);
		})
    }
})

