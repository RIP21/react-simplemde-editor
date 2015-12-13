var React = require('react');
var ReactDOM = require('react-dom');
var SimpleMDEReact = require('../../src/index');

module.exports = React.createClass({

  getInitialState(){
    return {
      textValue: 'Check me out yo!'
    }
  },

  handleChange(value) {
    console.log('handleChange: ', value);
    this.setState({
      textValue: value
    });
  },
  
  getMarkdownOptions() {
    return {
      autofocus: false,
      spellChecker: true,
      initialValue: this.state.textValue
    }
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
          options={this.getMarkdownOptions()}
        />
        <h5>this.state.textValue:</h5>
        <pre>
          {this.state.textValue}
        </pre>
      </div>
    )
  }
});
