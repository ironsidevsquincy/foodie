

// reqwest({
//     url: '/api/food/chefs/5076baf1382fe8d444000001'
//   , method: 'get'
//   , success: function (response) {
//       console.log(response);
//     }
// })

domready(function() {

	var chef = {
		'name': 'Yotam Ottolenghi'
	};

	ko.applyBindings(chef);

})