var React = require('react');
var ReactDOM = require('react-dom');
var SimpleMDEReact = require('../../src/index');

module.exports = React.createClass({

  getInitialState(){
    return {
      textValue: 'Check me out!'
    }
  },

  handleChange(value) {
    console.log('Change: ', value);
    this.setState({
      textValue: value
    });
  },
  
  render() {
    return (
      <div className='container container-narrow'>
        <div className="page-header">
          <h1>
            <a href="https://github.com/benrlodge/react-simplemde-editor">react-simplemde-editor</a>
          </h1>
          <p className="lead">
            A React.js wrapper for <a href="https://github.com/NextStepWebs/simplemde-markdown-editor">simplemde-markdown-editor</a>. 
          </p>
        </div>
        
        <SimpleMDEReact
          onChange={this.handleChange}
          initialValue={this.state.textValue}
        />
        <h5>this.state.textValue:</h5>
        <pre>
          {this.state.textValue}
        </pre>
      </div>
    )
  }
});
