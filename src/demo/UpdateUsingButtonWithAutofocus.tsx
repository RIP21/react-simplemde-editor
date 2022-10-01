import SimpleMdeReact, { SimpleMdeToCodemirrorEvents } from "../SimpleMdeReact";
import { useMemo, useState } from "react";
import SimpleMDE from "easymde";
import React from "react";

let counter = 1;
export const State = (props: any) => {
  return (
    <div style={{ margin: "8px" }}>
      <code data-testid="state">{JSON.stringify(props, null, 2)}</code>
    </div>
  );
};

const events = {
  focus: () => console.log("focus"),
} as SimpleMdeToCodemirrorEvents;

export const UpdateUsingButtonWithAutofocus = () => {
  const [value, setValue] = useState(
    "I am the initial value. Erase me, or try the button above."
  );

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleTextChangeByButton = () => {
    setValue(`Changing text by setting new state. ${counter++}`);
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <div data-testid="autofocus-no-spellchecker">
      <h4>Autofocus spellchecker disabled, button updated, controlled</h4>
      <button
        style={{ display: "inline-block", margin: "10px 0" }}
        onClick={handleTextChangeByButton}
      >
        Click me to update the textValue outside of the editor
      </button>
      <State value={value} />
      <h4>Update by button</h4>
      <SimpleMdeReact
        data-testid="autofocus-no-spellchecker-editor"
        options={autofocusNoSpellcheckerOptions}
        value={value}
        onChange={onChange}
        events={events}
      />
    </div>
  );
};
