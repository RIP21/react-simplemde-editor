var React = require('react');
var ReactDOM = require('react-dom');
var SimpleMDEReact = require('../../src/index');
var Editor = require('./Editor');

let counter = 1;

module.exports = React.createClass({

  getInitialState() {
    return {
      textValue1: "I am the initial value. Erase me, or try the button above.",
      textValue2: "Focus this text area and then use the Up and Down arrow keys to see the `extraKeys` prop in action"
    }
  },

  extraKeys() {
    return {
      Up: function(cm) {
        cm.replaceSelection(" surprise. ");
      },
      Down: function(cm) {
        cm.replaceSelection(" surprise again! ");
      }
    };
  },

  handleChange1(value) {
    this.setState({
      textValue1: value
    });
  },

  handleChange2(value) {
    this.setState({
      textValue2: value
    });
  },

  handleTextChange() {
    this.setState({
      textValue1: `Changing text by setting new state. ${counter++}`
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
          value={this.state.textValue1}
          handleEditorChange={this.handleChange1}
        />
        <hr />
        <Editor
          value={this.state.textValue2}
          handleEditorChange={this.handleChange2}
          extraKeys={this.extraKeys()}
        />
      </div>
    )
  }
});
