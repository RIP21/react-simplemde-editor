import generateId from "./services/idGenerator";
import NOOP from "./utils/noop";
import React, { Component } from "react";

export default class SimpleMDEEditor extends Component {
  state = {
    keyChange: false
  };

  static defaultProps = {
    onChange: NOOP,
    options: {}
  };

  componentWillMount() {
    const id = this.props.id;
    if (id) {
      this.id = id;
    } else {
      this.id = generateId();
    }
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      this.createEditor();
      this.addEvents();
      this.addExtraKeys();
      this.getCursor();
      this.getMdeInstance();
    }
    return;
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.keyChange &&
      nextProps &&
      nextProps.value !== this.simplemde.value()
    ) {
      this.simplemde.value((nextProps && nextProps.value) || "");
    }

    this.setState({
      keyChange: false
    });
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  createEditor = () => {
    const SimpleMDE = require("simplemde");
    const initialOptions = {
      element: document.getElementById(this.id),
      initialValue: this.props.value
    };

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    this.simplemde = new SimpleMDE(allOptions);
  };

  eventWrapper = () => {
    this.setState({
      keyChange: true
    });
    this.props.onChange(this.simplemde.value());
  };

  removeEvents = () => {
    this.editorEl.removeEventListener("keyup", this.eventWrapper);
    this.editorToolbarEl &&
      this.editorToolbarEl.removeEventListener("click", this.eventWrapper);
  };

  addEvents = () => {
    const wrapperId = `${this.id}-wrapper`;
    const wrapperEl = document.getElementById(`${wrapperId}`);

    this.editorEl = wrapperEl.getElementsByClassName("CodeMirror")[0];
    this.editorToolbarEl = wrapperEl.getElementsByClassName(
      "editor-toolbar"
    )[0];

    this.editorEl.addEventListener("keyup", this.eventWrapper);
    this.editorToolbarEl &&
      this.editorToolbarEl.addEventListener("click", this.eventWrapper);

    this.simplemde.codemirror.on("cursorActivity", this.getCursor);
    
    const { events } = this.props;
    
    // Handle custom events
    events && Object.entries(events).forEach(([eventName, callback]) => {
      if(eventName && callback) {
        this.simplemde.codemirror.on(eventName, callback);
      }
    });
  };

  getCursor = () => {
    // https://codemirror.net/doc/manual.html#api_selection
    if (this.props.getLineAndCursor) {
      this.props.getLineAndCursor(this.simplemde.codemirror.getCursor());
    }
  };

  getMdeInstance = () => {
    if (this.props.getMdeInstance) {
      this.props.getMdeInstance(this.simplemde);
    }
  };

  addExtraKeys = () => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (this.props.extraKeys) {
      this.simplemde.codemirror.setOption("extraKeys", this.props.extraKeys);
    }
  };

  render() {
    return (
      <div id={`${this.id}-wrapper`} className={this.props.className}>
        {this.props.label && (
          <label htmlFor={this.id}> {this.props.label} </label>
        )}
        <textarea id={this.id} />
      </div>
    );
  }
}
