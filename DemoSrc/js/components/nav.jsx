/** @jsx React.DOM */

var React = require('react/addons');

var Nav = React.createClass({
  getInitialState: function(){
    return ({pages:[
        {name:"Main", url:"/"},
        {name:"Faq", url:"/faq"},
        {name:"Contacts", url:"/contacts"}
      ],
      curPage:"/"})
  },
  componentWillMount: function(){
  },
  componentWillUnmount: function(){
  },
  turnPage: function(e){
    e.preventDefault();
    var tar = e.target.getAttribute('href')||e.target.value;
    this.props.controller.navigate(tar);
  },
  render: function(){
    var navs = this.state.pages.map(function(n,i){
      return (<li key={i}><a href={n.url} onClick={this.turnPage}>{n.name}</a></li>)
    }.bind(this));
    var opts = this.state.pages.map(function(n,i){
      return (<option key={i} value={n.url}>
          {n.name}
        </option>)
    }.bind(this));  
    return (
      <span>
      <select onChange={this.turnPage}>
        {opts}
      </select>
      <ul className="side-nav">
        {navs}
      </ul>
      </span>
      )
  }
});

module.exports = Nav;