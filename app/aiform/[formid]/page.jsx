"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Panno from "@/app/edit-form/_components/Panno";

const LiveAiForm = ({ params }) => {
  const [record, setRecord] = useState(null);
  const [jsonForm, setJsonForm] = useState(null);

  useEffect(() => {
    if (params?.formid) {
      GetFormData();
    }
  }, [params]);

  const GetFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, Number(params?.formid)));

      if (result.length > 0) {
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform));
      }
    } catch (error) {
      console.error("Error fetching or parsing form data:", error);
    }
  };

  return (
    <div className="p-10 flex justify-center items-center">
      {jsonForm && record && (
        <Panno
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log("Update field")}
          deleteField={() => console.log("Delete field")}
          editable={false}
          formId={record.id}
        />
      )}
    </div>
  );
};

export default LiveAiForm;
