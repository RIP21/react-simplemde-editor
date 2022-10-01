import "easymde/dist/easymde.min.css";
import { UpdateUsingButtonWithAutofocus } from "./UpdateUsingButtonWithAutofocus";
import { Autosaving } from "./Autosaving";
import { UpdateableByHotKeys } from "./UpdateableByHotKeys";
import { CleanupByButton } from "./CleanupByButton";
import { CustomPreview } from "./CustomPreview";
import { CustomEventsAndCursorPosition } from "./CustomEventsAndCursorPosition";
import { GetInstance } from "./GetInstance";
import { DynamicallyChangingEvents } from "./DynamicallyChangingEvents";
import { DynamicallyChangingOptions } from "./DynamicallyChangingOptions";
import React from "react";

const Demo = () => {
  return (
    <div className="container container-narrow">
      <div className="page-header">
        <h1>
          <a href="https://github.com/RIP21/react-simplemde-editor">
            react-simplemde-editor
          </a>
        </h1>
        <p className="lead">
          A React.js wrapper for{" "}
          <a href="https://github.com/Ionaru/easy-markdown-editor">
            easy-markdown-editor
          </a>
          .
        </p>
      </div>

      <UpdateUsingButtonWithAutofocus />
      <UpdateableByHotKeys />
      <CleanupByButton />
      <CustomPreview />
      <CustomEventsAndCursorPosition />
      <Autosaving />
      <GetInstance />
      <DynamicallyChangingEvents />
      <DynamicallyChangingOptions />
    </div>
  );
};

export default Demo;
