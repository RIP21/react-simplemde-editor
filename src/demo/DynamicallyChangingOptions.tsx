import SimpleMdeReact from "../SimpleMdeReact";
import { useState } from "react";
import { Options } from "easymde";
import React from "react";
import {State} from "./UpdateUsingButtonWithAutofocus";

export const DynamicallyChangingOptions = () => {
  const [value, setValue] = useState(`Blur away to see initial event behavior`);

  const [options, setOptions] = useState<Options>({
    maxHeight: "50px",
  });

  return (
    <div>
      <h4>Dynamically changing options. Change max height</h4>
      <button
        onClick={() => {
          setOptions((it) => {
            return {
              maxHeight: Number(it.maxHeight?.split("px")[0]) + 10 + "px",
            };
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setOptions((it) => {
            return {
              maxHeight: Number(it.maxHeight?.split("px")[0]) - 10 + "px",
            };
          });
        }}
      >
        -
      </button>
      <State value={value} />
      <SimpleMdeReact options={options} onChange={setValue} value={value} />
    </div>
  );
};
