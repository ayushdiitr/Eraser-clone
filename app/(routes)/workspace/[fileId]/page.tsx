import React from "react";
import WorkSpaceHeader from "./_components/Header";
import Editor from "./_components/Editor";

function WorkSpace() {
  return (
    <div>
      <WorkSpaceHeader />

      {/* Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className="h-screen">
            <Editor />
        </div>

        {/* Canvas */}
        <div className="h-screen bg-red-400">Main Content</div>
      </div>
    </div>
  );
}

export default WorkSpace;
