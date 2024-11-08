"use client";
import React, { useEffect, useState } from "react";
import WorkSpaceHeader from "./_components/Header";
import Editor from "./_components/Editor";
import { use } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "./_components/Canvas";

function WorkSpace({ params }: any) {
  
  const [fileData, setFileData] = useState<FILE>();
  const [triggerSave, setTriggerSave] = useState(false);

  const convex = useConvex();
  const getFileData = async() => {
    const result = await convex.query(api.files.getFileById,{_id:params.fileId});
    setFileData(result);  
  }



  useEffect(() => {
    params.fileId && getFileData();
  },[])


  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className="h-screen">
          <Editor onSaveTrigger={triggerSave} fileData={fileData} fileId={params.fileId} />
        </div>

        {/* Canvas */}
        <div className="h-screen border-l">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
