reqwest({
    url: '/api/food/recipes',
    type: 'json',
  	method: 'get',
  	success: function (recipes) {
        domready(function() {
			ko.applyBindings({'recipes': recipes});
		})
    }
})

