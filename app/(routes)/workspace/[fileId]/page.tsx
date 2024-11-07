'use client'
import React, { useState } from "react";
import WorkSpaceHeader from "./_components/Header";
import Editor from "./_components/Editor";
import { use } from "react";


function WorkSpace({params}:any) {
    
    
    const [triggerSave, setTriggerSave] = useState(false);

  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className="h-screen">
            <Editor onSaveTrigger={triggerSave} fileId={params.fileId} />
        </div>

        {/* Canvas */}
        <div className="h-screen bg-red-400">Main Content</div>
      </div>
    </div>
  );
}

export default WorkSpace;
