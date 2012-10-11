reqwest({
    url: '/api/food/chefs',
    type: 'json',
  	method: 'get',
  	success: function (chefs) {
      domready(function() {
        ko.applyBindings({'chefs': chefs});
      })
    }
})