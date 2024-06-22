"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Panno from "../_components/Panno";
import { toast } from "sonner"
import Controller from "../_components/Controller";


const EditForm = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [jsonForm, setJsonForm] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [record, setRecord] = useState(null);

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
        setRecord(result[0]);
        console.log("Parsed JSON:", formData);
      } else {
        console.error("Form data not found");
      }
    } catch (error) {
      console.error("Error fetching or parsing form data:", error);
    }
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm({ ...jsonForm });
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    const updatedFields = [...jsonForm.fields];
    updatedFields[index] = { ...updatedFields[index], ...value };
    setJsonForm({ ...jsonForm, fields: updatedFields });
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    const result = await db.update(JsonForms).set({
      jsonform: JSON.stringify(jsonForm),
    }).where(
      and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
    );
    toast("Updated.");

    console.log(result);
  };

  const deleteField = (indexToRemove) => {
    const updatedFields = jsonForm.fields.filter((item, index) => index !== indexToRemove);
    toast("Deleted.");
    setJsonForm({ ...jsonForm, fields: updatedFields });
    setUpdateTrigger(Date.now());
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
        <div className="p-5 border rounded-lg shadow-md">
          <Controller/>
        </div>
        <div className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center">
          {jsonForm ? (
            <Panno jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} deleteField={deleteField} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;