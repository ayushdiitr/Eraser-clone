"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();

  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState<Number>();

  const createFile = useMutation(api.files.createFile);

  const {fileList_, setFileList_} = useContext(FileListContext);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id || "",
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast.success("File created successfully!");
        }
      },
      (e) => {
        toast("Error creating file");
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id || '',
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };
  
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  return (
    <div className=" h-screen fixed w-72 borde-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}

export default SideNav;
