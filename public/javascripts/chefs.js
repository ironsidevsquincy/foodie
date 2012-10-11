reqwest({
    url: '/api/food/chefs',
    data: 'json',
  	method: 'get',
  	success: function (chefs) {
      domready(function() {
        ko.applyBindings(chefs);
    	})
    }
})