import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";

class Autosaving extends Component {
  defaultProps = {
    delay: 1000,
    value: ''
  }

  state = {
    value: localStorage.getItem(`smde_${this.props.id}`) || this.props.value
  };

  render() {
    const { options, delay, id, ...rest } = this.props;
    return (
      <SimpleMDEReact
        {...rest}
        id={id}
        value={this.state.value}
        options={{
          autosave: {
            enabled: true,
            uniqueId: id,
            delay
          },
          ...options
        }}
      />
    );
  }
}

export default Autosaving;
