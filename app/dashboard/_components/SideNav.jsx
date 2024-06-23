"use client"

import { Button } from "@/components/ui/button";
import { Library, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

const SideNav = () => {
    const { user } = useUser();
    const[formList,setFormList]=useState();
    const [percentageFileCreated,setPercentageFileCreated]=useState(0);


  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: Library,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    GetFormList();
  }, [user]);

  const GetFormList = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));
      setFormList(result);
      const perc=(result.length/3)*100;
      setPercentageFileCreated(perc);

    } catch (error) {
      console.error("Error fetching form list:", error);
    }
  };

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu) => (
          <Link
            href={menu.path}
            key={menu.id}
            className={`flex items-center gap-3 p-4 mb-3 hover:bg-black hover:text-white rounded-lg cursor-pointer ${
              path === menu.path && "bg-black text-white"
            }`}
          >
            <menu.icon className="w-6 h-6" />
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-7 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-7">
          <Progress value={percentageFileCreated} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>{formList?.length} </strong>Out of <strong>3</strong> files created
          </h2>
          <h2 className="text-sm mt-3 text-gray-600">
            Upgrade your plan for unlimited AI forms
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
