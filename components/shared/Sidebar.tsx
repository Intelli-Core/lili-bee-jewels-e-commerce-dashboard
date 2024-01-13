"use client";

import { Button } from "@/components/ui/button";
import { dashboardLinks } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="hidden md:block w-1/4 border-r h-full flex-col">
      <div className="flex flex-col py-10 px-2.5 gap-5">
        <div className="relative pl-4 h-full">
          <p className="p-medium-20">Lili Bee Jewels Store</p>
        </div>
        <div className="flex flex-col gap-2">
          {dashboardLinks.map((link) => (
            <Button
              variant={"ghost"}
              justify={"start"}
              className="w-full"
              onClick={() => router.push(link.route)}
            >
              {<link.icon className="mr-2.5 h-5 w-5" />}
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
