import React from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";

function Canvas() {
  return (
    <div style={{ height: "670px" }}>
      <Excalidraw
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
          },
        }}
        onChange={(excalidrawElements, appState, files) =>
          console.log(excalidrawElements)
        }
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ChangeCanvasBackground />

        </MainMenu>
      </Excalidraw>
    </div>
  );
}

export default Canvas;
