import * as React from "react";
import * as SimpleMDE from "simplemde";
import { KeyMap, DOMEvent, Editor } from "codemirror";

const noop = () => {};
let _id = 0;

const generateId = () => `simplemde-editor-${++_id}`;

type CodemirrorEvents =
  | "change"
  | "changes"
  | "beforeChange"
  | "cursorActivity"
  | "beforeSelectionChange"
  | "viewportChange"
  | "gutterClick"
  | "focus"
  | "blur"
  | "scroll"
  | "update"
  | "renderLine";

type SimpleMdeToCodemirror = {
  [E in CodemirrorEvents | DOMEvent]: Editor["on"]
};

type SimpleMDEEditorProps = {
  id?: string;
  label?: string;
  onChange: (value: string) => void | any;
  value?: string;
  className?: string;
  extraKeys?: KeyMap;
  options?: SimpleMDE.Options;
  events?: SimpleMdeToCodemirror;
  getMdeInstance?: (instance: SimpleMDE) => void | any;
  getLineAndCursor?: (instance: SimpleMDE) => void | any;
};

type SimpleMDEEditorState = {
  keyChange: boolean;
  value: string;
};

export default class SimpleMDEEditor extends React.PureComponent<
  SimpleMDEEditorProps,
  SimpleMDEEditorState
> {
  static defaultProps = {
    events: {},
    onChange: noop,
    options: {}
  };

  state = {
    keyChange: false,
    value: this.props.value || ""
  };

  id = this.props.id ? this.props.id : generateId();
  simpleMde: SimpleMDE | null = null;
  editorEl: Element | null = null;
  editorToolbarEl: Element | null = null;

  constructor(props: SimpleMDEEditorProps) {
    super(props);
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      this.createEditor();
      this.addEvents();
      this.addExtraKeys();
      this.getCursor();
      this.getMdeInstance();
    }
  }

  componentDidUpdate(prevProps: SimpleMDEEditorProps) {
    if (
      !this.state.keyChange &&
      this.props.value !== this.state.value && // This is somehow fixes moving cursor for controlled case
      this.props.value !== prevProps.value // This one fixes no value change for uncontrolled input. If it's uncontrolled prevProps will be the same
    ) {
      this.simpleMde!.value(this.props.value || "");
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
    this.simpleMde = new SimpleMDE(allOptions);
  };

  eventWrapper = () => {
    this.setState({
      keyChange: true,
      value: this.simpleMde!.value()
    });
    this.props.onChange(this.simpleMde!.value());
  };

  removeEvents = () => {
    this.editorEl!.removeEventListener("keyup", this.eventWrapper);
    this.editorToolbarEl &&
      this.editorToolbarEl.removeEventListener("click", this.eventWrapper);
  };

  addEvents = () => {
    const wrapperId = `${this.id}-wrapper`;
    const wrapperEl = document.getElementById(`${wrapperId}`);

    this.editorEl = wrapperEl!.getElementsByClassName("CodeMirror")[0];
    this.editorToolbarEl = wrapperEl!.getElementsByClassName(
      "editor-toolbar"
    )[0];

    this.editorEl.addEventListener("keyup", this.eventWrapper);
    this.editorToolbarEl &&
      this.editorToolbarEl.addEventListener("click", this.eventWrapper);

    this.simpleMde!.codemirror.on("cursorActivity", this.getCursor);

    const { events } = this.props;

    // Handle custom events
    events &&
      Object.entries(events).forEach(([eventName, callback]) => {
        if (eventName && callback) {
          this.simpleMde!.codemirror.on(eventName, callback);
        }
      });
  };

  getCursor = () => {
    // https://codemirror.net/doc/manual.html#api_selection
    if (this.props.getLineAndCursor) {
      this.props.getLineAndCursor(this.simpleMde!.codemirror.getCursor());
    }
  };

  getMdeInstance = () => {
    if (this.props.getMdeInstance) {
      this.props.getMdeInstance(this.simpleMde!);
    }
  };

  addExtraKeys = () => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (this.props.extraKeys) {
      this.simpleMde!.codemirror.setOption("extraKeys", this.props.extraKeys);
    }
  };

  render() {
    const {
      events,
      value,
      options,
      children,
      extraKeys,
      getLineAndCursor,
      getMdeInstance,
      label,
      onChange,
      id,
      ...rest
    } = this.props;
    return (
      <div id={`${this.id}-wrapper`} {...rest}>
        {label && <label htmlFor={this.id}> {label} </label>}
        <textarea id={this.id} />
      </div>
    );
  }
}
