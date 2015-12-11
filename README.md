# React SimpleMDE Markdown Editor

React component wrapper for
[SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor).

## Install

```
npm install --save react-simplemde-editor
```

## Demo
```
git clone https://github.com/benrlodge/react-simplemde-editor.git
cd react-simplemde-editor/demo
gulp
```
View demo at localhost:3000

## Usage
View the [demo code](https://github.com/benrlodge/react-simplemde-editor/tree/master/demo/scripts) for a full example

```javascript
var React = require('react');
var SimpleMDEReact = require('react-simplemde-editor');

<SimpleMDEReact
  onChange={this.handleChange}
  initialValue={this.state.textValue}
/>
```
