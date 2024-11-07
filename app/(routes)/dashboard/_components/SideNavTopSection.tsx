import { ChevronDown, icons, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}

function SideNavTopSection({ user, setActiveTeamInfo }: any,) {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  const convex = useConvex();
  const router = useRouter();
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [activeTeam, setActiveTeam] = useState<TEAM>();

  const getTeamList = async () => {
    const result = await convex.query(api.team.getTeam, {
      email: user?.email,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  return (
    <div>
      <Popover>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
          <Image src="/logo-lg.png" alt="logo" width={40} height={40} />
          <PopoverTrigger>
            <h2 className="flex gap-2 items-center font-bold text-[17px]">
              {activeTeam?.teamName}
              <ChevronDown />
            </h2>
          </PopoverTrigger>

          <PopoverContent className="ml-7 p-4">
            {/* Team Section */}
            <div>
              {teamList?.map((team, index) => (
                <h2
                  className={`p-2 hover:bg-blue-500 hover:text-white
                rounded-lg cursor-pointer mb-1
                ${activeTeam?._id == team._id && "bg-blue-500 text-white"} `}
                  key={index}
                  onClick={() => setActiveTeam(team)}
                >
                  {team.teamName}
                </h2>
              ))}
            </div>
            <Separator className="mt-2 bg-slate-100" />
            {/* Option Section */}
            <div>
              {menu.map((item) => (
                <h2
                  key={item.id}
                  className="flex items-center cursor-pointer gap-2 p-2 text-sm hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => onMenuClick(item)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </h2>
              ))}
              <LogoutLink>
                <h2 className="flex items-center cursor-pointer gap-2 p-2 text-sm hover:bg-gray-100 rounded-lg cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  Logout
                </h2>
              </LogoutLink>
            </div>
            <Separator className="mt-2 bg-slate-100" />
            {/* User Info section */}
            {user && (
              <div className="mt-2 flex gap-2 items-center">
                <Image
                  src={user?.picture}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-sm font-bold">
                    {user?.given_name} {user?.family_name}
                  </h2>
                  <h2 className="text-xs text-gray-500">{user?.email}</h2>
                </div>
              </div>
            )}
          </PopoverContent>
        </div>
      </Popover>
      <Button variant={"outline"} className="w-full justify-start gap-2 font-bold bg-gray-100 mt-8">
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
