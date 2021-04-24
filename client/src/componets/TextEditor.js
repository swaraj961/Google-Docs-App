import { React, useCallback , useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {io} from 'socket.io-client';
import {useParams} from 'react-router-dom'

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


  const Save_Time_Interval=2000;
  const [socket, setsocketState] = useState();
  const [quill, setQuillState] = useState();
  const {id: documentID}= useParams();

  // console.log(documentID);
  

  useEffect(() => {
    const s = io("http://localhost:3001");
    setsocketState(s);
    return () => {
      s.disconnect();
    }
  }, [])


  // calling data from db from server that is being saved

  useEffect(() => {
    if(socket==null || quill==null) return;
   
    const interval = setInterval(() => {
      socket.emit('save-document',quill.getContents())
    },  Save_Time_Interval);
    return () => {
      clearInterval(interval);
    }
  }, [socket,quill])



  // setting socket io users roomid 
  useEffect(() => {

    if(socket==null || quill==null) return;

    socket.once('load-document',document=>{
      quill.setContents(document)
      quill.enable();
    })
    socket.emit('get-document',documentID);


  }, [socket,quill, documentID])



 // reciving changes event
 useEffect(() => {

  if(socket==null || quill==null ) return; 
  const handler= (delta)=>{

    quill.updateContents(delta);
   
    // emiti msg to client-server
   
    } 
    socket.on('receive-changes',handler);

  // clean-up
  return () => {
    quill.off("text-change",handler);
  }
}, [socket,quill]);


  // sending changes event
  useEffect(() => {

    if(socket==null || quill==null ) return; 
    const handler= (delta, oldDelta, source)=>{

      // tracking only user changes
      if(source!== 'user') return;
      // emiti msg to client-server
      socket.emit('send-changes',delta);
  
      } 
      quill.on('text-change', handler);

    // clean-up
    return () => {
      quill.off("text-change",handler);
    }
  }, [socket,quill]);

  const wrapperRef = useCallback(
    (wrapper) => { 
      if (wrapper == null) return;
      wrapper.innerHTML = ""; // as i want it to render it once
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, { theme: "snow", 
      modules: {
        toolbar: TOOL_BAR_OPTIONS
      },
     });
     q.disable();
     q.setText('Loading....')
     setQuillState(q);
    }, []


  );
  return (
    <div className="container" ref={wrapperRef}>

    </div>
  );
};
