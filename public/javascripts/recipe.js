// reqwest({
//     url: '/api/food/recipes/5076baf1382fe8d444000001'
//   , method: 'get'
//   , success: function (response) {
//       console.log(response);
//     }
// })

domready(function() {

	var recipe = {
		'name': 'Salad'
	};

	ko.applyBindings(recipe);

})