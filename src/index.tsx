import * as React from "react";
import * as SimpleMDE from "easymde";
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
  [E in CodemirrorEvents | DOMEvent]?: Editor["on"]
};

export interface SimpleMDEEditorProps {
  id?: string;
  label?: string;
  onChange: (value: string) => void | any;
  value?: string;
  className?: string;
  extraKeys?: KeyMap;
  options?: SimpleMDE.Options;
  events?: SimpleMdeToCodemirror;
  getMdeInstance?: (instance: SimpleMDE) => void | any;
  getLineAndCursor?: (position: CodeMirror.Position) => void | any;
}

type SimpleMDEEditorState = {
  value: string;
};

export default class SimpleMDEEditor extends React.PureComponent<
  SimpleMDEEditorProps,
  SimpleMDEEditorState
> {
  private elementWrapperRef: HTMLDivElement | null;
  private setElementWrapperRef: (element: HTMLDivElement) => void;
  private keyChange = false;

  static defaultProps = {
    events: {},
    onChange: noop,
    options: {}
  };

  state = {
    value: this.props.value || ""
  };

  id = this.props.id ? this.props.id : generateId();
  simpleMde: SimpleMDE | null = null;
  editorEl: HTMLDivElement | null = null;
  editorToolbarEl: Element | null = null;

  constructor(props: SimpleMDEEditorProps) {
    super(props);
    this.elementWrapperRef = null;
    this.setElementWrapperRef = (element: HTMLDivElement) => {
      this.elementWrapperRef = element;
    };
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
      !this.keyChange &&
      this.props.value !== this.state.value && // This is somehow fixes moving cursor for controlled case
      this.props.value !== prevProps.value // This one fixes no value change for uncontrolled input. If it's uncontrolled prevProps will be the same
    ) {
      this.simpleMde!.value(this.props.value || "");
    }
    this.keyChange = false;
  }

  componentWillUnmount() {
    if (this.editorEl !== null && this.editorEl !== undefined) {
      this.removeEvents();
    }
  }

  // image upload function
  imageUploadFunction = (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
    const imageUpload = this.props.options?.imageUploadFunction
    if (imageUpload) {
        const _onSuccess = (url: string) => {
            onSuccess(url)
            // update value when success
            this.eventWrapper()
        }
        imageUpload(file, _onSuccess, onError)
    }
}

  createEditor = () => {
    const SimpleMDE = require("easymde");
    const initialOptions = {
      element: document.getElementById(this.id),
      initialValue: this.props.value
    };

    const imageUploadFunction = this.props.options?.imageUploadFunction ? this.imageUploadFunction : undefined
    const allOptions = Object.assign({}, initialOptions, this.props.options, { imageUploadFunction });
    this.simpleMde = new SimpleMDE(allOptions);
  };

  eventWrapper = () => {
    this.keyChange = true;
    this.setState({
      value: this.simpleMde!.value()
    });
    this.props.onChange(this.simpleMde!.value());
  };

  removeEvents = () => {
    if (this.editorEl && this.editorToolbarEl) {
      this.editorEl.removeEventListener("keyup", this.eventWrapper);
      this.editorEl.removeEventListener("paste", this.eventWrapper);
      this.editorToolbarEl.removeEventListener("click", this.eventWrapper);
    }
  };

  addEvents = () => {
    if (this.elementWrapperRef && this.simpleMde) {
      this.editorEl = this.elementWrapperRef;
      this.editorToolbarEl = this.elementWrapperRef.getElementsByClassName(
        "editor-toolbar"
      )[0];

      this.editorEl.addEventListener("keyup", this.eventWrapper);
      this.editorEl.addEventListener("paste", this.eventWrapper);
      this.editorToolbarEl &&
        this.editorToolbarEl.addEventListener("click", this.eventWrapper);

      this.simpleMde.codemirror.on("change", this.eventWrapper);
      this.simpleMde.codemirror.on("cursorActivity", this.getCursor);

      const { events } = this.props;

      // Handle custom events
      events &&
        Object.entries(events).forEach(([eventName, callback]) => {
          if (eventName && callback) {
            this.simpleMde &&
              this.simpleMde.codemirror.on(
                eventName as DOMEvent,
                callback as any
              );
          }
        });
    }
  };

  getCursor = () => {
    // https://codemirror.net/doc/manual.html#api_selection
    if (this.props.getLineAndCursor) {
      this.props.getLineAndCursor(
        this.simpleMde!.codemirror.getDoc().getCursor()
      );
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
      <div id={`${this.id}-wrapper`} {...rest} ref={this.setElementWrapperRef}>
        {label && <label htmlFor={this.id}> {label} </label>}
        <textarea id={this.id} />
      </div>
    );
  }
}
