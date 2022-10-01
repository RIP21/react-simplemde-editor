import { useMemo } from "react";
import SimpleMDE from "easymde";
import SimpleMdeReact from "../SimpleMdeReact";
import React from "react";

export const CustomPreview = () => {
  const customRendererOptions = useMemo(() => {
    return {
      previewRender() {
        return `<div>Hello from preview renderer</div>`;
      },
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <h4>Custom preview</h4>
      <SimpleMdeReact
        value="Click on eye icon to see a custom preview"
        options={customRendererOptions}
      />
    </div>
  );
};
