"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();

  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const res = await convex.query(api.user.getAllUsers, {
      email: user?.email,
    });
    if (!res?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((res) => {
        console.log(res);
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <FileList />
    </div>
  );
}

export default Dashboard;
