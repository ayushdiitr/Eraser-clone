"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function SideNav() {
  const { user }: any = useKindeBrowserClient();

  const [activeTeam, setActiveTeam] = useState<TEAM>();

  const createFile = useMutation(api.files.createFile);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id || "",
      createdBy: user?.email,
    }).then(
      (resp) => {
        if (resp) {
          toast("File created successfully!");
        }
      },
      (e) => {
        toast("Error creating file");
      }
    );
  };

  return (
    <div className=" h-screen fixed w-72 borde-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}

export default SideNav;
