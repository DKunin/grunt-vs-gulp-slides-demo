var createController = require('react-app-controller');
var MainPage = require('./components/main.jsx');
var Contacts = require('./components/contacts.jsx');
var Faq = require('./components/faq.jsx');
var React = require('react/addons');
var Nav = require('./components/nav.jsx');

var controller = createController({
  routes: {
   '/': MainPage, 
   '/faq': Faq, 
   '/contacts': Contacts
  }
});

controller.render(document.getElementById('main'), function(err, controller){
  React.renderComponent(Nav({controller:controller}),document.getElementById("nav"));
});