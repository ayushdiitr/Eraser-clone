"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FileListContext";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user }: any = useKindeBrowserClient();

  const convex = useConvex();
  const router = useRouter();

  const [fileList_, setFileList_] = useState();

  const checkTeam = async () => {
    const team = await convex.query(api.team.getTeam, { email: user?.email });
    if (!team.length) {
      router.push("teams/create");
    }
  };

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  return (
    <div>
      <FileListContext.Provider value={{fileList_, setFileList_}}>
        <div className="grid grid-cols-4">
          <div className="bg-white h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72 p-4">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
