import React, { useState } from "react";
import SimpleMDEReact from "../SimpleMdeReact";
import { State } from "./UpdateUsingButtonWithAutofocus";

export const AutosavingWithCb = () => {
  const [value, setValue] = useState(
    "I am the initial value. Change me and wait to see changes updated"
  );

  const autoSaveCb = (text: string) => {
    console.log("Auto save triggered:\n", text);
    setValue(text)
  }

  return (
    <div>
      <h4>Autosaving with callback after refresh (wait 1000ms after change)</h4>
      <State value={value} />
      <SimpleMDEReact id={"demo"} value={value} autoSaveCb={autoSaveCb} autoSaveTimer={1000} />
    </div>
  );
};
