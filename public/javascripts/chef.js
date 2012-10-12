var chefId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/chefs/' + chefId,
    type: 'json',
  	method: 'get',
  	success: function (chef) {
      domready(function() {
        ko.applyBindings(chef);
      })
    }
})