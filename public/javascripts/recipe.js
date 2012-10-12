var recipeId = window.location.pathname.split('/').pop()

reqwest({
    url: '/api/food/recipes/' + recipeId,
    type: 'json',
  	method: 'get',
  	success: function (recipe) {
      domready(function() {
  			ko.applyBindings(recipe);

        bonzo(qwery('body')).append('<h3>Buy from Ocado</h3><ul id="ocado-list"></ul>');

        // get all the ingredients from ocado
        var ingredients = qwery('.ingredient');
        for (var i in ingredients) {
          reqwest({
            url: '/ocado/' + bonzo(qwery('a', ingredients[i])).html(),
            type: 'html',
            method: 'get',
            success: function(body) {
              var product = $(body).find('#prodList .productDetails').first();
              var productImage = product.find('.productImageContainer a');
              var link = $('<a></a>')
                .attr('href', 'http://www.ocado.com' + productImage.attr('href'))
                .text(product.find('.productTitle').text() + ' - ' + product.find('.typicalPrice').text());
              var h4 = window.$('<h4></h4>')
                .append(link)
              var ingredient = window.$('<li></li>')
                .append(h4)
                .append(productImage.find('img'));
              $('#ocado-list').append(ingredient);
            }
          })
        }
  		})
    }
})
