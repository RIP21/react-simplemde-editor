var React = require('react');
var SimpleMDE = require('simplemde');
var $ = require('jquery');

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      onChange: function(){},
      options: {}
    }
  },

  componentDidMount: function() {
    
    var initialOptions = {
      simplemdeement: document.getElementById("simplepostmd-editor")
    };
    
    var allOptions = $.extend({}, initialOptions, this.props.options);
    var simplemde = new SimpleMDE(allOptions);
    
    var _this = this;

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
