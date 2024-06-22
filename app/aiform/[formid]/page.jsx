"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Panno from "@/app/edit-form/_components/Panno";

const LiveAiForm = ({ params }) => {

    const [record,setRecord]=useState();
    const [jsonForm, setJsonForm] = useState([]);
  useEffect(() => {
    console.log(params);
    GetFormData();
  }, []);

  const GetFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
            eq(JsonForms.id,Number(params?.formid))
        );

        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform))

        console.log(jsonForm);
    } catch (error) {
      console.error("Error fetching or parsing form data:", error);
    }
  };
  return(
      <div className="p-10 flex justify-center items-center" >
        <Panno jsonForm={jsonForm} onFieldUpdate={()=>console.log} deleteField={()=>console.log} editable={false}/>

      </div>

  )
};

export default LiveAiForm;
