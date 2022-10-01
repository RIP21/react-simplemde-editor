import { useMemo, useState } from "react";
import SimpleMdeReact, { SimpleMdeToCodemirrorEvents } from "../SimpleMdeReact";
import { State } from "./UpdateUsingButtonWithAutofocus";
import React from "react";

export const CustomEventsAndCursorPosition = () => {
  const [cursorInfo, setCursorInfo] = useState<any>({});

  const customEvents = useMemo(() => {
    return {
      cursorActivity: (instance) => {
        setCursorInfo(instance.getCursor());
      },
    } as SimpleMdeToCodemirrorEvents;
  }, []);

  return (
    <div>
      <h4>Custom events and cursor reading</h4>
      <State value={cursorInfo} />
      <SimpleMdeReact
        value="Move cursor back and forth"
        events={customEvents}
      />
    </div>
  );
};
