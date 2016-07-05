var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var models = require('../models/majestic');
//var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ShopCart = React.createClass({
  render: function(){
    var menuItems = this.props.items.map(function(model){
      return (
        <li key={model.cid}>{model.get('title')} ${model.get('price') / 100}</li>
      )
    });
    return(
      <ul>
        <li className="shop-list">
          {menuItems}
        </li>
      </ul>
    )
  }
})
var ShopComponent = React.createClass({
  render: function(){
    return(
      <div className="shop">
          <h4 className="order">Your Order</h4>

        <ShopCart items={this.props.items} />
      </div>
    )
  }
})
var MenuInfo = React.createClass({
  render: function (){
    return(
      <div className="menu-info row">

      </div>
    )
  }
})
var MenuListComponent = React.createClass({
  render: function (){
    var self = this;

    // menuItems: array ['<li></li>', '<li></li>']
    // this.props.items: collection (array) [{title: x, price: 10}, {title: y, price: 20}]
    // model: object {title: x, price: 10}


    var menuItems = this.props.items.map(function(model){

      return <li key={model.cid} className="menu-items well">{model.get('title')}  <button onClick={function(){self.props.handleAddToCart(model)}} className="menu-button btn btn-primary">${model.get('price') / 100} Order</button></li>
    });
    return(
      <ul className="menu-list">
        {menuItems}
      </ul>
    )
  }
})
var MenuComponent = React.createClass({
  render: function(){
    console.log(this.props.items);
    return(
      <div className="menu">
        <h4 className="menu-heading">Menu</h4>

        <MenuListComponent handleAddToCart={this.props.handleAddToCart} items={this.props.items} />
      </div>
    )
  }
})
var HeaderComponent = React.createClass({
  render: function(){
    return (
      <header>
        <h1 className="heading well row">Majestic Thai<img src="./images/flag-of-Thailand-3.png"></img></h1>
        <MenuInfo />
      </header>
    )
  }
});
// this.setState({
//   'items': this.state.items.concat([newItem]),
//   'text': ''
// });
var AppComponent = React.createClass({
  getInitialState: function (){
    return {cartItems: [], items: []}
  },
  componentWillMount: function(){
      var items = new models.ThaiAppCollection();
      var cartItems = new models.CartCollection();
        items.add([
          {'title': 'Yellow Curry', 'price': 1055},
          {'title': 'Pad Thai', 'price': 1055},
          {'title': 'Half Moon Tons', 'price': 795},
          {'title': 'Orange Chicken', 'price': 1055},
          {'title': 'Pad Thai', 'price': 799},
          {'title': 'Chow Mein', 'price': 799}
          ]);
        this.setState({items: items})
        this.setState({cartItems: cartItems})
  },
  handleAddToCart: function(model){
    event.preventDefault();

    this.state.cartItems.add(model);
    this.forceUpdate();
  },

  handleRemoveFromCart: function (model){
    event.preventDefault();
    this.state.cartItems.remove(model);
    this.forceUpdate();
  },
  render: function(){
    return (
      <div>
        <div className="header-outer">
          <div className="app row-fluid">
            <HeaderComponent />
          </div>
        </div>
          <div className="secondary-outer">
            <div className="secondary-inner">
              <ShopComponent handleRemoveFromCart={this.handleRemoveFromCart} items={this.state.cartItems} />
              <MenuComponent handleAddToCart={this.handleAddToCart} items={this.state.items}/>
            </div>
          </div>
      </div>
    )
  }
});

module.exports = {
  'AppComponent': AppComponent,
  'HeaderComponent': HeaderComponent,
  'MenuComponent': MenuComponent,
  'MenuListComponent': MenuListComponent,
  'ShopComponent': ShopComponent,
  'ShopCart': ShopCart,
  'MenuInfo': MenuInfo
}
