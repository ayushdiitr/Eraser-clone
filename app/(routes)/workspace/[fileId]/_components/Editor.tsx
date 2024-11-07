"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";

const rawData = {
    "time" : 1550476186479,
    "blocks" : [{
        data: {
            text: "Document Name",
            level: 2
        },
        id: "1",
        type: "header"
    }],
    "version" : "2.8.1"
}

function Editor() {

  const ref = useRef<EditorJS>();
  const [data, setData] = useState(rawData);

  const initEditor = () => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          shortcut: "CTRL+SHIFT+H",
          config: {
            defaultLevel: 3,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        checklist: Checklist,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
              byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
            },
          },
        },
      },

        data: data,
    });
    ref.current = editor;
  };

  useEffect(() => {
    initEditor();
  }, []);

  return (
    <div>
      <div id="editorjs" className="ml-16"></div>
    </div>
  );
}

export default Editor;
