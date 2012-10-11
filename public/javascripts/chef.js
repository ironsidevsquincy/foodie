var chefId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/chefs/' + chefId,
    type: 'json',
  	method: 'get',
  	success: function (chef) {
      domready(function() {
      	console.log(chef.recipes);
        ko.applyBindings(chef);
      })
    }
})