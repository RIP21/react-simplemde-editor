# React SimpleMDE Markdown Editor

React component wrapper for
[SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor).

## New version 2.0
Version 1.0 did not have SimpleMDE options configured well, this readme reflects the changes made to better include options.
This is still a very new project. Testing, feedback and PRs are welcome and appreciated.

## Install
```
npm install --save react-simplemde-editor
```

## Demo
```
git clone https://github.com/benrlodge/react-simplemde-editor.git
cd react-simplemde-editor
npm install
cd demo
gulp
```
Open browser to localhost:3000

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

```javascript
var React = require('react');
var SimpleMDE = require('react-simplemde-editor');

<SimpleMDEReact
  onChange={this.handleChange}
  options={{
    autofocus: true,
    spellChecker: false,
    initialValue: this.state.textValue
    // etc.
  }}
/>
```
