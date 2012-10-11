var chefId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/chefs/' + chefId,
    data: 'json',
  	method: 'get',
  	success: function (chef) {
      domready(function() {
        ko.applyBindings(chef);
      })
    }
})