import { useMemo } from "react";
import SimpleMDEReact from "../SimpleMdeReact";
import React from "react";

export const Autosaving = () => {
  const delay = 1000;
  const autosavedValue = localStorage.getItem(`smde_demo`) || "Initial value";
  const anOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "demo",
        delay,
      },
    };
  }, [delay]);

  return (
    <div>
      <h4>Autosaving after refresh (wait 1000ms after change)</h4>
      <SimpleMDEReact id={"demo"} value={autosavedValue} options={anOptions} />
    </div>
  );
};
