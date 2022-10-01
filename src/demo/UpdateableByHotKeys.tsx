import { useMemo, useState } from "react";
import { KeyMap } from "codemirror";
import { State } from "./UpdateUsingButtonWithAutofocus";
import SimpleMdeReact from "../SimpleMdeReact";
import React from "react";

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

  const [value, setValue] = useState(
    "Focus this text area and then use the Up and Down arrow keys to see the `extraKeys` prop in action"
  );

  const onChange = (value: string) => setValue(value);

  return (
    <div>
      <h4>Update by extra keys. E.g. arrow up and arrow down buttons</h4>
      <State value={value} />
      <SimpleMdeReact value={value} onChange={onChange} extraKeys={extraKeys} />
    </div>
  );
};
