/** @jsx React.DOM */

var React = require('react/addons');
var Data = require('../data/data');

var Main = React.createClass({
  getInitialState: function(){
    return ({data:Data})
  },
  componentWillMount: function(){
  },
  componentWillUnmount: function(){
  },

  render: function(){
    var datas = this.state.data.map(function(m,i){
      return (<p key={i}><img className={m.align} src={m.image}/>{m.text}</p>)
    })
    console.log();
    return (
        <div>
          {datas}
        </div>  
      )
  }
});

module.exports = Main;