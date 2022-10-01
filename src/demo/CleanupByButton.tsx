import { useState } from "react";
import { State } from "./UpdateUsingButtonWithAutofocus";
import SimpleMdeReact from "../SimpleMdeReact";
import React from "react";

export const CleanupByButton = () => {
  const [value, setValue] = useState(
    "You can clean the input using button above."
  );
  const onChange = (value: string) => setValue(value);

  const handleCleanup = () => {
    setValue(``);
  };

  return (
    <div>
      <h4>Cleanup by button</h4>
      <button
        style={{ display: "inline-block", margin: "10px 0" }}
        onClick={handleCleanup}
      >
        Click me to clean the editor below
      </button>
      <State value={value} />
      <SimpleMdeReact value={value} onChange={onChange} />
    </div>
  );
};
