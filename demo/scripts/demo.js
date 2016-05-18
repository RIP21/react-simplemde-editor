var React = require('react');
var ReactDOM = require('react-dom');
var SimpleMDEReact = require('../../src/index');
var Editor = require('./Editor');

let counter = 1;

module.exports = React.createClass({

  getInitialState() {
    return {
      textValue: "I am the initial value. Erase me, or try the button above."
    }
  },

  handleEditorChange(value) {
    this.setState({
      textValue: value
    });
  },

  handleTextChange() {
    this.setState({
      textValue: `Changing text ${counter++}`
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
        <button style={{display: "inline-block", margin: "10px 0"}} onClick={this.handleTextChange}>
          Click me to update the textValue outside of the editor
        </button>
        <Editor 
          value={this.state.textValue}
          handleEditorChange={this.handleEditorChange} />
        <h5>this.state.textValue:</h5>
        <pre>
          {this.state.textValue}
        </pre>
      </div>
    )
  }
});
