var React = require('react');
// not ideal, but doesn't properly load codemirror
// currently looking for a better solution
var SimpleMDE = require('simplemde/dist/simplemde.min');
var $ = require('jquery');

let state = {
  previousValue: null
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

  componentDidMount: function() {
    var initialOptions = {
      simplemdeement: document.getElementById("simplepostmd-editor")
    };
    
    var allOptions = $.extend({}, initialOptions, this.props.options);
    this.simplemde = new SimpleMDE(allOptions);
    state.previousValue = this.props.options.initialValue

    if (this.props.options.extraKeys) {
      this.simplemde.codemirror.setOption(
        'extraKeys',
        this.props.options.extraKeys
      );
    }
    
    var _this = this;

    $('.CodeMirror').on('keyup', '*', function() {
      _this.setState({
        keyChange: true
      });
      _this.simplemde.value()
      _this.props.onChange(_this.simplemde.value())
    });

    $('.editor-toolbar').on('click', '*', function() {
      _this.props.onChange(_this.simplemde.value())
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
    return React.createElement('textarea', {id:'simplepostmd-editor'});
  }
});
