import { React, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOL_BAR_OPTIONS= [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],  
  [{ 'font': [] }],
  [{ 'size': ['small', false, 'large', 'huge'] }]
  [{ 'align': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['image','blockquote', 'code-block','clean'],
  [{ 'script': 'sub'}, { 'script': 'super' }],  
];



export const TextEditor = () => {
  // const wrapperRef= useRef()

  const wrapperRef = useCallback(
    (wrapper) => { 
      if (wrapper == null) return;
      wrapper.innerHTML = ""; // as i want it to render it once
      const editor = document.createElement("div");
      wrapper.append(editor);
      new Quill(editor, { theme: "snow", 
      modules: {
        toolbar: TOOL_BAR_OPTIONS
      },
     });
    }, []


  );
  return (
    <div className="container" ref={wrapperRef}>

    </div>
  );
};
