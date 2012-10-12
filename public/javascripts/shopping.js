var   path = window.location.pathname.split('/')
    , recipeId = path[path.length - 2] 

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

