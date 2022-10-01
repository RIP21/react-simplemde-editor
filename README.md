# React SimpleMDE (EasyMDE) Markdown Editor

[![NPM version][npm-badge]][npm]

React component wrapper for
[EasyMDE (the most fresh SimpleMDE fork)](https://github.com/Ionaru/easy-markdown-editor).

Only two dependencies, React (peer) and EasyMDE (peer).

Built by [@RIP21](https://twitter.com/rip212) 👨‍💻

- [New in v5](#new-in-v5)
- [Install](#install)
- [Demo](#demo)
- [Usage](#usage)
  - [Controlled usage](#controlled-usage)
  - [Options](#options)
  - [Hotkeys](#hotkeys)
  - [Custom preview rendering example](#custom-preview-rendering-example)
  - [Events / Additional event listeners for events of CodeMirror](#events---additional-event-listeners-for-events-of-codemirror)
  - [Autosaving](#autosaving)
  - [Retrieve `easymde`, `codemirror` or `cursor` info to be able to manipulate it.](#retrieve--easymde----codemirror--or--cursor--info-to-be-able-to-manipulate-it)
  - [Basic testing](#basic-testing)
- [API](#api)
  - [Props](#props)
  - [All exports list](#all-exports-list)
- [Changelog](#changelog)
  - [New in v4](#new-in-v4)
  - [New in v3](#new-in-v3)
  - [New in v2](#new-in-v2)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## New in v5

- [breaking] Full rewrite to hooks. Means more reactive so, probably, less bugs related with updates. Minimum React version required `>=16.8.2`
- [breaking] `easymde` now a peer dependency, please install it manually
- [breaking] `label` prop has been removed
- [breaking] SSR safe nets removed, please make sure to import it dynamically
- [breaking] `options` shall be memoized to prevent new instances from being created on each render and other related to that bugs (more on that below)
- [potentially-breaking] Forwards `ref`, so you can easily get access to `div` wrapper by using `ref` prop.
- [potentially-breaking] Lots of bugs fixed, examples updated
- [potentially-breaking] `@babel/runtime` helpers are no longer inlined but imported.

## Install

```
npm install --save react-simplemde-editor easymde
```

Note: Possibly you may need to install `@babel/runtime`, try without it, but if you don't have any issues, then you shouldn't.

## Demo

[Hosted demo](https://react-simplemde-edtior.netlify.com/)

or to see it locally:

```
git clone https://github.com/RIP21/react-simplemde-editor.git
cd react-simplemde-editor
yarn install
yarn demo
open browser at localhost:3000
```

## Usage

View the [demo code](https://github.com/rip21/react-simplemde-editor/tree/master/src/demo) for more examples.

All examples below are in TypeScript

Uncontrolled usage

```tsx
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

<SimpleMDE />;
```

### Controlled usage

```tsx
export const ControlledUsage = () => {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return <SimpleMdeReact value={value} onChange={onChange} />;
};
```

### Options

You can set API of [SimpleMDE options](https://github.com/Ionaru/easy-markdown-editor#configuration) which you pass down as a `options` prop.
If you're using TypeScript it will be inferred by compiler.

Note: if you don't specify a custom id it will automatically generate an id for you.

Note that you need to `useMemo` to memoize `options` so they do not change on each rerender! It will affect behavior and performance
because then on each render of the parent that renders `SimpleMdeReact` you'll get a new instance of the editor, which you definitely want to avoid!
Also, if you change `options` on each `value` change you will lose focus.
So, put `options` as a `const` outside of the component, or if `options` shall be partially or fully set by `props` make sure to `useMemo` in
case of functional/hooks components, or class field for `class` based components.
Slightly more on that here: [#164](https://github.com/RIP21/react-simplemde-editor/issues/164)

```tsx
export const UsingOptions = () => {
  const [value, setValue] = useState("Initial");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <SimpleMdeReact
      options={autofocusNoSpellcheckerOptions}
      value={value}
      onChange={onChange}
    />
  );
};
```

### Hotkeys

You can include key maps using the `extraKeys` prop.
Read more at [CodeMirror extra keys](https://codemirror.net/doc/manual.html#option_extraKeys)

```tsx
export const UpdateableByHotKeys = () => {
  const extraKeys = useMemo<KeyMap>(() => {
    return {
      Up: function (cm) {
        cm.replaceSelection(" surprise. ");
      },
      Down: function (cm) {
        cm.replaceSelection(" surprise again! ");
      },
    };
  }, []);

  const [value, setValue] = useState("initial");
  const onChange = (value: string) => setValue(value);

  return (
    <SimpleMdeReact value={value} onChange={onChange} extraKeys={extraKeys} />
  );
};
```

### Custom preview rendering example

```tsx
import ReactDOMServer from "react-dom/server";

export const CustomPreview = () => {
  const customRendererOptions = useMemo(() => {
    return {
      previewRender() {
        return ReactDOMServer.renderToString(
          <ReactMarkdown
            source={text}
            renderers={{
              CodeBlock: CodeRenderer,
              Code: CodeRenderer,
            }}
          />
        );
      },
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <h4>Custom preview</h4>
      <SimpleMdeReact options={customRendererOptions} />
    </div>
  );
};
```

### Events / Additional event listeners for events of CodeMirror

See full list of events [here](https://codemirror.net/doc/manual.html#events)

```tsx
import { SimpleMdeReact } from "react-simplemde-editor";
import type { SimpleMdeToCodemirrorEvents } from "react-simplemde-editor";

export const CustomEventListeners = () => {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  // Make sure to always `useMemo` all the `options` and `events` props to ensure best performance!
  const events = useMemo(() => {
    return {
      focus: () => console.log(value),
    } as SimpleMdeToCodemirrorEvents;
  }, []);

  return <SimpleMdeReact events={events} value={value} onChange={onChange} />;
};
```

### Autosaving

```tsx
export const Autosaving = () => {
  const delay = 1000;
  const autosavedValue = localStorage.getItem(`smde_demo`) || "Initial value";
  const anOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "demo",
        delay,
      },
    };
  }, [delay]);

  return (
    <SimpleMdeReact id="demo" value={autosavedValue} options={anOptions} />
  );
};
```

### Retrieve `easymde`, `codemirror` or `cursor` info to be able to manipulate it.

```tsx
export const GetDifferentInstances = () => {
  // simple mde
  const [simpleMdeInstance, setMdeInstance] = useState<SimpleMDE | null>(null);

  const getMdeInstanceCallback = useCallback((simpleMde: SimpleMDE) => {
    setMdeInstance(simpleMde);
  }, []);

  useEffect(() => {
    simpleMdeInstance &&
      console.info("Hey I'm editor instance!", simpleMdeInstance);
  }, [simpleMdeInstance]);

  // codemirror
  const [codemirrorInstance, setCodemirrorInstance] = useState<Editor | null>(
    null
  );
  const getCmInstanceCallback = useCallback((editor: Editor) => {
    setCodemirrorInstance(editor);
  }, []);

  useEffect(() => {
    codemirrorInstance &&
      console.info("Hey I'm codemirror instance!", codemirrorInstance);
  }, [codemirrorInstance]);

  // line and cursor
  const [lineAndCursor, setLineAndCursor] = useState<Position | null>(null);

  const getLineAndCursorCallback = useCallback((position: Position) => {
    setLineAndCursor(position);
  }, []);

  useEffect(() => {
    lineAndCursor &&
      console.info("Hey I'm line and cursor info!", lineAndCursor);
  }, [lineAndCursor]);

  return (
    <div>
      <h4>Getting instance of Mde and codemirror and line and cursor info</h4>
      <SimpleMdeReact
        value="Go to console to see stuff logged"
        getMdeInstance={getMdeInstanceCallback}
        getCodemirrorInstance={getCmInstanceCallback}
        getLineAndCursor={getLineAndCursorCallback}
      />
    </div>
  );
};
```

### Basic testing

Here is how you do it. It requires mock of certain browser pieces to work, but this is whole example.

```tsx
import { act, render, screen } from "@testing-library/react";
import { useState } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import userEvent from "@testing-library/user-event";

// @ts-ignore
Document.prototype.createRange = function () {
  return {
    setEnd: function () {},
    setStart: function () {},
    getBoundingClientRect: function () {
      return { right: 0 };
    },
    getClientRects: function () {
      return {
        length: 0,
        left: 0,
        right: 0,
      };
    },
  };
};

const Editor = () => {
  const [value, setValue] = useState("");
  return <SimpleMdeReact value={value} onChange={setValue} />;
};

describe("Renders", () => {
  it("succesfully", async () => {
    act(() => {
      render(<Editor />);
    });
    const editor = await screen.findByRole("textbox");
    userEvent.type(editor, "hello");
    expect(screen.getByText("hello")).toBeDefined();
  });
});
```

## API

### Props

```tsx
export interface SimpleMDEReactProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  id?: string;
  onChange?: (value: string, changeObject?: EditorChange) => void;
  value?: string;
  extraKeys?: KeyMap;
  options?: SimpleMDE.Options;
  events?: SimpleMdeToCodemirrorEvents;
  getMdeInstance?: GetMdeInstance;
  getCodemirrorInstance?: GetCodemirrorInstance;
  getLineAndCursor?: GetLineAndCursor;
  placeholder?: string;
  textareaProps?: Omit<
    React.HTMLAttributes<HTMLTextAreaElement>,
    "id" | "style" | "placeholder"
  >;
}
```

### All exports list

`default` - SimpleMdeReact <br><br>
`SimpleMdeReact` - same as `default` but named<br><br>
**Types:** <br><br>
`SimpleMdeReactProps` - props of the component <br><br>
`DOMEvent` - certain events that are used to get events exported below <br><br>
`CopyEvents` - only copy codemirror events <br><br>
`GlobalEvents` - some other global codemirror events <br><br>
`DefaultEvent` - default codemirror event handler function <br><br>
`IndexEventsSignature` - index signature that expects string as key and returns `DefaultEvent` <br><br>
`SimpleMdeToCodemirrorEvents` - manually crafted events (based off `@types/codemirror@0.0.109` that `easymde` uses internally) +
all the above merged together into whole mapping between Codemirror event names and actual handlers for
`events` prop <br><br>
`GetMdeInstance` - signature of the callback function that retrieves mde instance <br><br>
`GetCodemirrorInstance` - signature of the callback function that retrieves codemirror instance <br><br>
`GetLineAndCursor` - signature of the callback function that retrieves line and cursor info <br><br>

## Changelog

## New in v4

- Now uses [EasyMDE (the most fresh SimpleMDE fork)](https://github.com/Ionaru/easy-markdown-editor)
  instead of `simplemde` itself. Possible breaking changes, so I bumped version to v4.
- One obvious breaking change. Is how CSS is have to be imported. It used to be `simplemde/dist/simplemde.min.css` now it will be `easymde/dist/easymde.min.css`

## New in v3

- The `initialValue` prop has been removed and replaced with a `value` prop, allowing direct changes to the value to be made after the component mounts.
- v3.6.8 if rendering server-side, you can set static ids to avoid errors in rendering synchronization.
- v3.6.17 TypeScript typings added.
- v3.6.19 All props will be passed to the wrapper now (except a id, onChange and few others that are ignored)
- v3.6.21 React 17 support (UNSAFE methods are no longer used)

## New in v2

Version 1.0 did not have SimpleMDE options configured well, this readme reflects the changes made to better include options.
This is still a very new project. Testing, feedback and PRs are welcome and appreciated.

[npm-badge]: http://badge.fury.io/js/react-simplemde-editor.svg
[npm]: http://badge.fury.io/js/react-simplemde-editor
