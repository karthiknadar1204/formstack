"use client"
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const FormListItemResponse = ({ jsonForm, formRecord }) => {
  const [loading,setLoading]=useState(false);

  const ExportData=async()=>{
    let jsonData=[];
    setLoading(true);
    const result=await db.select().from(userResponses).where(eq(userResponses.formRef,formRecord.id));

    console.log(result);
    if(result){
      result.forEach((item)=>{
        const jsonItem=JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      })
      setLoading(false);
    }
    console.log(jsonData);
  }


  // const exportToExcel=()=>{
  //   const worksheet=XLSX.utils.json
  // }



  return (
      <div className="border shadow-sm rounded-lg p-4 my-5">
        <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
        <h2 className="text-sm text-gray-500">{jsonForm?.formHeading}</h2>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <h2 className="text-sm" >
            45 responses
          </h2>
          <Button className="" size="sm" onClick={()=>ExportData()} disabled={loading} >
            {
              loading ? <Loader2 className="animate-spin" /> : 'Export'
            }
          </Button>
        </div>
      </div>

  );
};

export default FormListItemResponse;
