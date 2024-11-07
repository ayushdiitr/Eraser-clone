"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user }: any = useKindeBrowserClient();

  const convex = useConvex();
  const router = useRouter();

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
      <div className="grid grid-cols-4">
        <div>
          <SideNav />
        </div>
        <div className="grid-cols-3">
            {children}
            </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
