# React SimpleMDE Markdown Editor
[![NPM version][npm-badge]][npm]

React component wrapper for
[SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor).

Only two dependencies, React and SimpleMDE.

## Request for new owner
My time has been very limited lately, if anyone would like to take over this repo let me know, and I can transfer it over.

## New in v3
 - The `initialValue` prop has been removed and replaced with a `value` prop, allowing direct changes to the value to be made after the component mounts.
 - Updated in v3.6.8, if rendering server-side, you can set static ids to avoid errors in rendering synchronization.

## New in v2
Version 1.0 did not have SimpleMDE options configured well, this readme reflects the changes made to better include options.
This is still a very new project. Testing, feedback and PRs are welcome and appreciated.

## Install
```
npm install --save react-simplemde-editor
```

## Demo
http://www.benrlodge.com/projects/react-simplemde

or view it locally:
```
git clone https://github.com/benrlodge/react-simplemde-editor.git
cd react-simplemde-editor
npm install
cd demo
gulp
open browser to localhost:5555
```

## Usage
View the [demo code](https://github.com/benrlodge/react-simplemde-editor/tree/master/demo/scripts) for a full example.

Not required, but useless without it, the `onChange` callback is the only option you need to set.

```javascript
var React = require('react');
var SimpleMDE = require('react-simplemde-editor');

<SimpleMDE
  onChange={this.handleChange}
/>
```

## Options
Set additional [SimpleMDE options](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration) with an options prop.

Note - while SimpleMDE options has an `initialValue` option, this component only takes a `value` prop which is set as the `initialValue` on first render.

```javascript
var React = require('react');
var SimpleMDE = require('react-simplemde-editor');

<SimpleMDE
  onChange={this.handleChange}
  value={this.state.textValue}
  options={{
    autofocus: true,
    spellChecker: false,
    // etc.
  }}
/>
```

You can include key maps using the `extraKeys` prop.
Read more at https://codemirror.net/doc/manual.html#option_extraKeys

```javascript
extraKeys = {
  Up: function(cm) {
    cm.replaceSelection(" surprise. ");
  },
  Down: function(cm) {
    cm.replaceSelection(" surprise again! ");
  }
};

<SimpleMDE
  onChange={this.handleChange}
  extraKeys={extraKeys}
/>
```

[npm-badge]: http://badge.fury.io/js/react-simplemde-editor.svg
[npm]: http://badge.fury.io/js/react-simplemde-editor
