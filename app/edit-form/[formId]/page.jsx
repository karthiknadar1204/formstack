"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUI";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [jsonForm, setJsonForm] = useState(null); // Initialize to null to handle loading state

  useEffect(() => {
    if (user) {
      GetFormData();
    }
  }, [user]);

  const GetFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
          and(
            eq(JsonForms.id, params?.formId),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length > 0) {
        const jsonString = result[0].jsonform;
        console.log("JSON String from DB:", jsonString);
        const formData = JSON.parse(jsonString);
        setJsonForm(formData);
        console.log("Parsed JSON:", formData);
      } else {
        console.error("Form data not found");
      }
    } catch (error) {
      console.error("Error fetching or parsing form data:", error);
    }
  };

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-5 h-screen flex items-center justify-center">
          {jsonForm ? <FormUi jsonForm={jsonForm} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
