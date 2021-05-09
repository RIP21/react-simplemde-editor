import SimpleMdeReact, { SimpleMdeToCodemirrorEvents } from "../SimpleMdeReact";
import { useState } from "react";

export const DynamicallyChangingEvents = () => {
  const [value, setValue] = useState(`Blur away to see initial event behavior`);

  const [events, setEvents] = useState<SimpleMdeToCodemirrorEvents>({
    blur: (_) => {
      console.log("blur");
      setValue(`I'm initial event behavior`);
    },
  });

  return (
    <div>
      <h4>Dynamically changing event listeners</h4>
      <button
        onClick={() => {
          setEvents({
            blur: () => {
              setValue(
                "CHANGED"
                  .split("")
                  .reverse()
                  .join(Math.ceil(Math.random() * 10).toString())
              );
            },
          });
        }}
      >
        Change event to a random one!
      </button>
      <SimpleMdeReact events={events} onChange={setValue} value={value} />
    </div>
  );
};
