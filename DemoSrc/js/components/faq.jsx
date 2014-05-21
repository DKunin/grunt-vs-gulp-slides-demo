/** @jsx React.DOM */

var React = require('react/addons');

var Faq = React.createClass({
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
          Faq
        </div>  
      )
  }
});

module.exports = Faq;