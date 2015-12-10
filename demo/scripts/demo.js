var React = require('react');
var ReactDOM = require('react-dom');
var SimpleMDEReact = require('../../src/index');

module.exports = React.createClass({

  handleChange() {
    console.log('handling change!');
  },
  
  render() {
    return (
      <SimpleMDEReact 
        onChange={this.handleChange}
      />
    )
  }
});
