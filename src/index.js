var React = require('react');
// not ideal, but doesn't properly load codemirror
var SimpleMDE = require('simplemde/dist/simplemde.min');
var $ = require('jquery');

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      initialValue: '',
      onChange: function(){}
    }
  },

  componentDidMount: function() {
    var simplemde = new SimpleMDE({ simplemdeement: document.getElementById("simplepostmd-editor") });
    var _this = this;

    simplemde.value(this.props.initialValue);

    $('.CodeMirror').on('keyup', '*', function(){
      _this.props.onChange(simplemde.value())
    });

    $('.editor-toolbar').on('click', '*', function(){
      _this.props.onChange(simplemde.value())
    });
  },

  componentWillUnmount: function() {
    $('.CodeMirror').off('keyup', '*');
    $('.editor-toolbar').off('click', '*');
  },

  render: function() {
    return React.createElement('textarea', {id:'simplepostmd-editor'});
  }
});
