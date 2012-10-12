var ingredientName = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/ingredients/' + ingredientName,
    type: 'json',
  	method: 'get',
  	success: function (ingredient) {
      domready(function() {
        ko.applyBindings(ingredient);
      })
    }
})