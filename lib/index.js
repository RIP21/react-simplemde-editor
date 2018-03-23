"use strict";

exports.__esModule = true;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _idGenerator = require("./services/idGenerator");

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _noop = require("./utils/noop");

var _noop2 = _interopRequireDefault(_noop);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleMDEEditor = function (_Component) {
  (0, _inherits3.default)(SimpleMDEEditor, _Component);

  function SimpleMDEEditor() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SimpleMDEEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      keyChange: false
    }, _this.createEditor = function () {
      var SimpleMDE = require("simplemde");
      var initialOptions = {
        element: document.getElementById(_this.id),
        initialValue: _this.props.value
      };

      var allOptions = (0, _assign2.default)({}, initialOptions, _this.props.options);
      _this.simplemde = new SimpleMDE(allOptions);
    }, _this.eventWrapper = function () {
      _this.setState({
        keyChange: true
      });
      _this.props.onChange(_this.simplemde.value());
    }, _this.removeEvents = function () {
      _this.editorEl.removeEventListener("keyup", _this.eventWrapper);
      _this.editorToolbarEl && _this.editorToolbarEl.removeEventListener("click", _this.eventWrapper);
    }, _this.addEvents = function () {
      var wrapperId = _this.id + "-wrapper";
      var wrapperEl = document.getElementById("" + wrapperId);

      _this.editorEl = wrapperEl.getElementsByClassName("CodeMirror")[0];
      _this.editorToolbarEl = wrapperEl.getElementsByClassName("editor-toolbar")[0];

      _this.editorEl.addEventListener("keyup", _this.eventWrapper);
      _this.editorToolbarEl && _this.editorToolbarEl.addEventListener("click", _this.eventWrapper);

      _this.simplemde.codemirror.on("cursorActivity", _this.getCursor);
    }, _this.getCursor = function () {
      if (_this.props.getLineAndCursor) {
        _this.props.getLineAndCursor(_this.simplemde.codemirror.getCursor());
      }
    }, _this.getMdeInstance = function () {
      if (_this.props.getMdeInstance) {
        _this.props.getMdeInstance(_this.simplemde);
      }
    }, _this.addExtraKeys = function () {
      // https://codemirror.net/doc/manual.html#option_extraKeys
      if (_this.props.extraKeys) {
        _this.simplemde.codemirror.setOption("extraKeys", _this.props.extraKeys);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  SimpleMDEEditor.prototype.componentWillMount = function componentWillMount() {
    var id = this.props.id;
    if (id) {
      this.id = id;
    } else {
      this.id = (0, _idGenerator2.default)();
    }
  };

  SimpleMDEEditor.prototype.componentDidMount = function componentDidMount() {
    if (!process.env.IS_BROWSER) return;
    this.createEditor();
    this.addEvents();
    this.addExtraKeys();
  };

  SimpleMDEEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.keyChange && nextProps.value !== this.simplemde.value()) {
      this.simplemde.value(nextProps.value);
    }

    this.setState({
      keyChange: false
    });
  };

  SimpleMDEEditor.prototype.componentWillUnmount = function componentWillUnmount() {
    this.removeEvents();
  };

  SimpleMDEEditor.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { id: this.id + "-wrapper", className: this.props.className },
      this.props.label && _react2.default.createElement(
        "label",
        { htmlFor: this.id },
        " ",
        this.props.label,
        " "
      ),
      _react2.default.createElement("textarea", { id: this.id })
    );
  };

  return SimpleMDEEditor;
}(_react.Component);

SimpleMDEEditor.defaultProps = {
  onChange: _noop2.default,
  options: {}
};
exports.default = SimpleMDEEditor;
module.exports = exports["default"];