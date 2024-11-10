import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, SendIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const { user } = useKindeBrowserClient();

  return (
    <div className="flex w-full justify-end gap-2 items-center pt-4">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4" />
        <input type="text" placeholder="Search" />
      </div>
      <div>
        {user?.picture && (
          <Image
            src={user.picture}
            alt="Profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        )}
      </div>
      <Button className="gap-2 flex h-8 hover:bg-blue-700 bg-blue-600 text-sm">
        <SendIcon className="h-4 w-4" />
        Invite
      </Button>
    </div>
  );
}

export default Header;
