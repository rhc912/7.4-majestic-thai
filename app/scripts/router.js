var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
// Local
var models = require('./models/majestic');
var AppComponent = require('./components/main.jsx').AppComponent;




var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
  },
//var MenuItems = AppComponent.MenuItems;



index: function(){
    ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('container')
    );
  }
})

var router = new Router();

module.exports = {
  'router': router
}
