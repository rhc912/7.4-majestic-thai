var Backbone = require('backbone');

var Thai = Backbone.Model.extend({

});

var ThaiAppCollection = Backbone.Collection.extend({
  model: Thai,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/robbed',
});
var CartCollection = Backbone.Collection.extend({
  model: Thai,
  getCartTotal: function(){
    var price = this.reduce(function(memo, model){
      return memo + model.get('price');
    }, 0);
    return '$' + (price / 100).toFixed(2);
  }
})
module.exports = {
  'ThaiAppCollection': ThaiAppCollection,
  'CartCollection': CartCollection
}
