import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/(routes)/dashboard/_components/FileList";

function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: boolean;
  fileId: string;
  fileData: FILE;
}) {
  const [whiteboardData, setWhiteboardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  const saveCanvas = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteboardData),
    });
  };

  useEffect(() => {
    onSaveTrigger && saveCanvas();
  }, [onSaveTrigger]);

  return (
    <div style={{ height: "670px" }}>
      {fileData && (
        <Excalidraw
          initialData={{
            elements: fileData.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
            },
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteboardData(excalidrawElements)
          }
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
