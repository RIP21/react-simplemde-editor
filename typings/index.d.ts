import * as React from "react";
import * as SimpleMDE from "simplemde";
import { KeyMap, DOMEvent, Editor } from "codemirror";
declare type CodemirrorEvents = "change" | "changes" | "beforeChange" | "cursorActivity" | "beforeSelectionChange" | "viewportChange" | "gutterClick" | "focus" | "blur" | "scroll" | "update" | "renderLine";
declare type SimpleMdeToCodemirror = {
    [E in CodemirrorEvents | DOMEvent]: Editor["on"];
};
declare type SimpleMDEEditorProps = {
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
declare type SimpleMDEEditorState = {
    keyChange: boolean;
};
export default class SimpleMDEEditor extends React.PureComponent<SimpleMDEEditorProps, SimpleMDEEditorState> {
    static defaultProps: {
        events: {};
        onChange: () => void;
        options: {};
    };
    state: {
        keyChange: boolean;
    };
    value: string | undefined;
    id: string;
    simpleMde: SimpleMDE | null;
    editorEl: Element | null;
    editorToolbarEl: Element | null;
    constructor(props: SimpleMDEEditorProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SimpleMDEEditorProps): void;
    componentWillUnmount(): void;
    createEditor: () => void;
    eventWrapper: () => void;
    removeEvents: () => void;
    addEvents: () => void;
    getCursor: () => void;
    getMdeInstance: () => void;
    addExtraKeys: () => void;
    render(): JSX.Element;
}
export {};
