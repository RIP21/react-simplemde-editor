"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var noop = function noop() {};

var _id = 0;

var generateId = function generateId() {
  return "simplemde-editor-".concat(++_id);
};

var SimpleMDEEditor =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SimpleMDEEditor, _React$PureComponent);

  function SimpleMDEEditor(props) {
    var _this;

    _classCallCheck(this, SimpleMDEEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleMDEEditor).call(this, props));
    _this.state = {
      keyChange: false
    };
    _this.value = _this.props.value;
    _this.id = _this.props.id ? _this.props.id : generateId();
    _this.simpleMde = null;
    _this.editorEl = null;
    _this.editorToolbarEl = null;

    _this.createEditor = function () {
      var SimpleMDE = require("simplemde");

      var initialOptions = {
        element: document.getElementById(_this.id),
        initialValue: _this.props.value
      };
      var allOptions = Object.assign({}, initialOptions, _this.props.options);
      _this.simpleMde = new SimpleMDE(allOptions);
    };

    _this.eventWrapper = function () {
      _this.setState({
        keyChange: true
      });

      _this.props.onChange(_this.simpleMde.value());
    };

    _this.removeEvents = function () {
      _this.editorEl.removeEventListener("keyup", _this.eventWrapper);

      _this.editorToolbarEl && _this.editorToolbarEl.removeEventListener("click", _this.eventWrapper);
    };

    _this.addEvents = function () {
      var wrapperId = "".concat(_this.id, "-wrapper");
      var wrapperEl = document.getElementById("".concat(wrapperId));
      _this.editorEl = wrapperEl.getElementsByClassName("CodeMirror")[0];
      _this.editorToolbarEl = wrapperEl.getElementsByClassName("editor-toolbar")[0];

      _this.editorEl.addEventListener("keyup", _this.eventWrapper);

      _this.editorToolbarEl && _this.editorToolbarEl.addEventListener("click", _this.eventWrapper);

      _this.simpleMde.codemirror.on("cursorActivity", _this.getCursor);

      var events = _this.props.events; // Handle custom events

      events && Object.entries(events).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            eventName = _ref2[0],
            callback = _ref2[1];

        if (eventName && callback) {
          _this.simpleMde.codemirror.on(eventName, callback);
        }
      });
    };

    _this.getCursor = function () {
      // https://codemirror.net/doc/manual.html#api_selection
      if (_this.props.getLineAndCursor) {
        _this.props.getLineAndCursor(_this.simpleMde.codemirror.getCursor());
      }
    };

    _this.getMdeInstance = function () {
      if (_this.props.getMdeInstance) {
        _this.props.getMdeInstance(_this.simpleMde);
      }
    };

    _this.addExtraKeys = function () {
      // https://codemirror.net/doc/manual.html#option_extraKeys
      if (_this.props.extraKeys) {
        _this.simpleMde.codemirror.setOption("extraKeys", _this.props.extraKeys);
      }
    };

    return _this;
  }

  _createClass(SimpleMDEEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== undefined) {
        this.createEditor();
        this.addEvents();
        this.addExtraKeys();
        this.getCursor();
        this.getMdeInstance();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.state.keyChange && nextProps && nextProps.value !== this.value) {
        this.value = nextProps && nextProps.value;
        this.simpleMde.value(nextProps && nextProps.value || "");
      }

      this.setState({
        keyChange: false
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEvents();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "".concat(this.id, "-wrapper"),
        className: this.props.className
      }, this.props.label && React.createElement("label", {
        htmlFor: this.id
      }, " ", this.props.label, " "), React.createElement("textarea", {
        id: this.id
      }));
    }
  }]);

  return SimpleMDEEditor;
}(React.PureComponent);

exports.default = SimpleMDEEditor;
SimpleMDEEditor.defaultProps = {
  events: {},
  onChange: noop,
  options: {}
};
//# sourceMappingURL=index.js.map