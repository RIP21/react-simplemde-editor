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
cd react-simplemde-editor
npm install
cd demo
gulp
```
View demo at localhost:3000

## Usage
Right now you can pass in an initial value, and an onChange handler. Future updates include adding all options in as props.
View the [demo code](https://github.com/benrlodge/react-simplemde-editor/tree/master/demo/scripts) for a full example.

```javascript
var React = require('react');
var SimpleMDE = require('react-simplemde-editor');

<SimpleMDE
  onChange={this.handleChange}
  initialValue={this.state.textValue}
/>
```

## To Do
 - Add all configuration options: https://github.com/NextStepWebs/simplemde-markdown-editor#configuration
