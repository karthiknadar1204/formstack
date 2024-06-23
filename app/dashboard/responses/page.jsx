"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItemResponse from "./_components/FormListItemResponse";

const Responses = () => {
  const { user } = useUser();

  const [formList, setFormList] = useState([]);

  useEffect(() => {
    GetFormList();
  }, [user]);
  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    setFormList(result);
  };
  return formList && (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Responses
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {formList.map((form, index) => (
                <FormListItemResponse
                formRecord={form}
                jsonForm={JSON.parse(form.jsonform)}
                />
          ))}
        </div>
    </div>
  );
};

export default Responses;
