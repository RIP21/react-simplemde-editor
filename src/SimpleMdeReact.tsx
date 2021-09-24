import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SimpleMDE, { Options } from "easymde";

import type {
  Doc,
  Editor,
  EditorChange,
  EditorChangeCancellable,
  EditorChangeLinkedList,
  EditorSelectionChange,
  KeyMap,
  LineHandle,
  Position,
} from "codemirror";

let _id = 0;

const generateId = () => `simplemde-editor-${++_id}`;

export type DOMEvent =
  | "mousedown"
  | "dblclick"
  | "touchstart"
  | "contextmenu"
  | "keydown"
  | "keypress"
  | "keyup"
  | "cut"
  | "copy"
  | "paste"
  | "dragstart"
  | "dragenter"
  | "dragover"
  | "dragleave"
  | "drop";

export type CopyEvents = {
  [TKey in string &
    DOMEvent &
    keyof DocumentAndElementEventHandlersEventMap as `${TKey}`]?: (
    instance: Editor,
    event: DocumentAndElementEventHandlersEventMap[TKey]
  ) => void;
};

export type GlobalEvents = {
  [TKey in string &
    DOMEvent &
    keyof GlobalEventHandlersEventMap as `${TKey}`]?: (
    instance: Editor,
    event: GlobalEventHandlersEventMap[TKey]
  ) => void;
};

export type DefaultEvent = (instance: Editor, ...args: any[]) => void;

export type IndexEventsSignature = {
  [key: string]: DefaultEvent | undefined;
};

export interface SimpleMdeToCodemirrorEvents
  extends CopyEvents,
    GlobalEvents,
    IndexEventsSignature {
  change?: (instance: Editor, changeObj: EditorChangeLinkedList) => void;
  changes?: (instance: Editor, changes: EditorChangeLinkedList[]) => void;
  beforeChange?: (instance: Editor, changeObj: EditorChangeCancellable) => void;
  cursorActivity?: (instance: Editor) => void;
  keyHandled?: (instance: Editor, name: string, event: KeyboardEvent) => void;
  inputRead?: (instance: Editor, changeObj: EditorChange) => void;
  electricInput?: (instance: Editor, line: number) => void;
  beforeSelectionChange?: (
    instance: Editor,
    obj: EditorSelectionChange
  ) => void;
  viewportChange?: (instance: Editor, from: number, to: number) => void;
  swapDoc?: (instance: Editor, oldDoc: Doc) => void;
  gutterClick?: (
    instance: Editor,
    line: number,
    gutter: string,
    clickEvent: MouseEvent
  ) => void;
  gutterContextMenu?: (
    instance: Editor,
    line: number,
    gutter: string,
    contextMenu: MouseEvent
  ) => void;
  focus?: (instance: Editor, event: FocusEvent) => void;
  blur?: (instance: Editor, event: FocusEvent) => void;
  scroll?: (instance: Editor) => void;
  refresh?: (instance: Editor) => void;
  optionChange?: (instance: Editor, option: string) => void;
  scrollCursorIntoView?: (instance: Editor, event: Event) => void;
  update?: (instance: Editor) => void;
  renderLine?: (
    instance: Editor,
    line: LineHandle,
    element: HTMLElement
  ) => void;
  overwriteToggle?: (instance: Editor, overwrite: boolean) => void;
}

export type GetMdeInstance = (instance: SimpleMDE) => void;
export type GetCodemirrorInstance = (instance: Editor) => void;
export type GetLineAndCursor = (instance: Position) => void;

export interface SimpleMDEReactProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
  extraKeys?: KeyMap;
  options?: SimpleMDE.Options;
  events?: SimpleMdeToCodemirrorEvents;
  getMdeInstance?: GetMdeInstance;
  getCodemirrorInstance?: GetCodemirrorInstance;
  getLineAndCursor?: GetLineAndCursor;
}

const useHandleEditorInstanceLifecycle = ({
  options,
  id,
  currentValueRef,
  textRef,
}: {
  options?: Options;
  id: string;
  currentValueRef: React.MutableRefObject<string | undefined>;
  textRef: HTMLTextAreaElement | null;
}) => {
  const [editor, setEditor] = useState<SimpleMDE | null>(null);

  const imageUploadCallback = useCallback(
    (
      file: File,
      onSuccess: (url: string) => void,
      onError: (error: string) => void
    ) => {
      const imageUpload = options?.imageUploadFunction;
      if (imageUpload) {
        const _onSuccess = (url: string) => {
          onSuccess(url);
        };
        imageUpload(file, _onSuccess, onError);
      }
    },
    [options?.imageUploadFunction]
  );

  const editorRef = useRef(editor);
  editorRef.current = editor;

  useEffect(() => {
    let editor: SimpleMDE
    if (textRef) {
      const initialOptions = {
        element: textRef,
        initialValue: currentValueRef.current,
      }
      const imageUploadFunction = options?.imageUploadFunction
        ? imageUploadCallback
        : undefined
      editor = new SimpleMDE(
        Object.assign({}, initialOptions, options, {
          imageUploadFunction,
        })
      )
      setEditor(editor)
    }
    return () => {
      editor?.toTextArea()
      // @ts-expect-error
      editor?.cleanup()
    }
  }, [textRef, currentValueRef, id, imageUploadCallback, options]);

  const codemirror = useMemo(() => {
    return editor?.codemirror;
  }, [editor?.codemirror]) as Editor | undefined;
  return { editor, codemirror };
};

export const SimpleMdeReact = React.forwardRef<
  HTMLDivElement,
  SimpleMDEReactProps
>((props, ref) => {
  const {
    events,
    value,
    options,
    children,
    extraKeys,
    getLineAndCursor,
    getMdeInstance,
    getCodemirrorInstance,
    onChange,
    id: anId,
    ...rest
  } = props;

  const id = useMemo(() => anId ?? generateId(), [anId]);

  const elementWrapperRef = useRef<HTMLDivElement | null>(null);
  const nonEventChangeRef = useRef<boolean>(true);

  // This is to not pass value as a dependency e.g. to keep event handlers referentially
  // stable and do not `off` and `on` on each value change
  // plus to avoid unnecessary EasyEde editor recreation on each value change while still, if it has to be remounted
  // due to options and other deps change, to preserve that last value and not the default one from the first render.
  const currentValueRef = useRef(value);
  currentValueRef.current = value;

  const [textRef, setTextRef] = useState<HTMLTextAreaElement | null>(null)
  const { editor, codemirror } = useHandleEditorInstanceLifecycle({
    options,
    id,
    currentValueRef,
    textRef,
  });

  useEffect(() => {
    // If change comes from the event we don't need to update `SimpleMDE` value as it already has it
    // Otherwise we shall set it as it comes from `props` set from the outside. E.g. by some reset button and whatnot
    if (nonEventChangeRef.current) {
      editor?.value(value ?? "");
    }
    nonEventChangeRef.current = true;
  }, [editor, value]);

  const onCodemirrorChangeHandler = useCallback(() => {
    if (editor?.value() !== currentValueRef.current) {
      nonEventChangeRef.current = false;
      onChange?.(editor?.value() ?? "");
    }
  }, [editor, onChange]);

  useEffect(() => {
    // For some reason it doesn't work out of the box, this makes sure it's working correctly
    if (options?.autofocus) {
      codemirror?.focus();
      codemirror?.setCursor(codemirror?.lineCount(), 0);
    }
  }, [codemirror, options?.autofocus]);

  const getCursorCallback = useCallback(() => {
    // https://codemirror.net/doc/manual.html#api_selection
    codemirror && getLineAndCursor?.(codemirror.getDoc().getCursor());
  }, [codemirror, getLineAndCursor]);

  useEffect(() => {
    getCursorCallback();
  }, [getCursorCallback]);

  useEffect(() => {
    editor && getMdeInstance?.(editor);
  }, [editor, getMdeInstance]);

  useEffect(() => {
    codemirror && getCodemirrorInstance?.(codemirror);
  }, [codemirror, getCodemirrorInstance, getMdeInstance]);

  useEffect(() => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (extraKeys && codemirror) {
      codemirror.setOption(
        "extraKeys",
        Object.assign({}, extraKeys, codemirror.getOption("extraKeys"))
      );
    }
  }, [codemirror, extraKeys]);

  useEffect(() => {
    const toolbarNode = elementWrapperRef.current?.getElementsByClassName(
      "editor-toolbarNode"
    )[0];
    const handler = () => codemirror && onCodemirrorChangeHandler();
    toolbarNode?.addEventListener("click", handler);

    return () => {
      toolbarNode?.removeEventListener("click", handler);
    };
  }, [codemirror, onCodemirrorChangeHandler]);

  useEffect(() => {
    codemirror?.on("change", onCodemirrorChangeHandler);
    codemirror?.on("cursorActivity", getCursorCallback);
    return () => {
      codemirror?.off("change", onCodemirrorChangeHandler);
      codemirror?.off("cursorActivity", getCursorCallback);
    };
  }, [codemirror, getCursorCallback, onCodemirrorChangeHandler]);

  const prevEvents = useRef(events);

  useEffect(() => {
    const isNotFirstEffectRun = events !== prevEvents.current;
    isNotFirstEffectRun &&
      prevEvents.current &&
      Object.entries(prevEvents.current).forEach(([event, handler]) => {
        handler && codemirror?.off(event, handler);
      });

    events &&
      Object.entries(events).forEach(([event, handler]) => {
        handler && codemirror?.on(event, handler);
      });
    prevEvents.current = events;
    return () => {
      events &&
        Object.entries(events).forEach(([event, handler]) => {
          handler && codemirror?.off(event, handler);
        });
    };
  }, [codemirror, events]);

  return (
    <div
      id={`${id}-wrapper`}
      {...rest}
      ref={(aRef) => {
        if (typeof ref === "function") {
          ref(aRef);
        } else if (ref) {
          ref.current = aRef;
        }
        elementWrapperRef.current = aRef;
      }}
    >
      <textarea id={id} ref={setTextRef} style={{ display: "none" }} />
    </div>
  );
});

SimpleMdeReact.displayName = "SimpleMdeReact";

export default SimpleMdeReact;
