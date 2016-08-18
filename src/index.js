const React = require('react');
const SimpleMDE = require('simplemde');
const $ = require('jquery');

_id = 0;

function _generateId() {
  return `simplepostmd-editor-${++_id}`
}

module.exports = React.createClass({

  getInitialState: function() {
    return {
      keyChange: false
    }
  },

  getDefaultProps: function() {
    return {
      onChange: function(){},
      options: {}
    }
  },

  componentWillMount: function() {
    this.id = _generateId();
  },

  componentDidMount: function() {
    const initialOptions = {
      element: document.getElementById(this.id)
    };

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    this.simplemde = new SimpleMDE(allOptions);
    wrapperClass = `${this.id}-wrapper`;

    $(`#${wrapperClass} .CodeMirror`).on('keyup', '*', () => {
      this.setState({
        keyChange: true
      });
      this.simplemde.value()
      this.props.onChange(this.simplemde.value())
    });

    $(`#${wrapperClass} .editor-toolbar`).on('click', '*', () => {
      this.props.onChange(this.simplemde.value())
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.state.keyChange) {
      this.simplemde.value(nextProps.value)
    }

    this.setState({
      keyChange: false
    });
  },

  componentWillUnmount: function() {
    $('.CodeMirror').off('keyup', '*');
    $('.editor-toolbar').off('click', '*');
  },

  render: function() {
    const textarea = React.createElement('textarea', {id: this.id});
    return React.createElement('div', {id: `${this.id}-wrapper`}, textarea)
  }
});
