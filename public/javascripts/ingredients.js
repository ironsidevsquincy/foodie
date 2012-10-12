reqwest({
    url: '/api/food/ingredients',
    type: 'json',
    method: 'get',
    success: function (ingredients) {
      domready(function() {
        ko.applyBindings({'ingredients': ingredients});
      })
    }
})

