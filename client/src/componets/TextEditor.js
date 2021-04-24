import { React, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export const TextEditor = () => {
  // const wrapperRef= useRef()
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;
      wrapper.innerHTML = ""; // as i want it to render it once
      const editor = document.createElement("div");
      wrapper.append(editor);
      new Quill(editor, { theme: "snow" });
    },[]

    
  );
  return (
    <div className="container" ref={wrapperRef}>
    
    </div>
  );
};
