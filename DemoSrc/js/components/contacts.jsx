/** @jsx React.DOM */

var React = require('react/addons');

var Contacts = React.createClass({
  getInitialState: function(){
    return ({alerts:[]})
  },
  componentWillMount: function(){
  },
  componentWillUnmount: function(){
  },

  render: function(){
    return (
        <div>
          Contacts
        </div>  
      )
  }
});

module.exports = Contacts;