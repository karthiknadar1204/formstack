"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";


const Panno = ({ jsonForm, onFieldUpdate, deleteField, editable = true, formId }) => {
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState({});
  const formRef = useRef();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];
    if (value) {
      list.push(itemName);
    } else {
      const index = list.indexOf(itemName);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
    setFormData({
      ...formData,
      [fieldName]: list,
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await db.insert(userResponses).values({
        jsonResponse: JSON.stringify(formData),
        createdAt: moment().format('DD/MM/yyyy'),
        formRef: formId,
      });

      if (result) {
        formRef.current.reset();
        toast('Response Submitted Successfully!!!');
      } else {
        toast('Internal Server Error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast('Internal Server Error');
    }
  };

  useEffect(() => {
    setFlag(true);
  }, [jsonForm]);

  return (
    <>
      {flag && (
        <form
          ref={formRef}
          onSubmit={onFormSubmit}
          className="border p-5 md:w-[600px] rounded-lg"
        >
          <h2 className="font-bold text-center text-2xl">
            {jsonForm?.formTitle}
          </h2>
          <h2 className="text-sm text-gray-400 text-center">
            {jsonForm?.formName}
          </h2>
          {jsonForm?.fields.map((field, index) => (
            <div key={index} className="my-3 flex items-center gap-2">
              {field.fieldType === "number" || field.fieldType === "text" ? (
                <div className="my-3 w-full">
                  <label className="text-sm text-gray-500">{field.label}</label>
                  <Input
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    name={field.fieldName}
                    className="w-full"
                    onChange={handleInputChange}
                  />
                </div>
              ) : field.fieldType === "dropdown" ? (
                <div className="my-3 w-full">
                  <label className="text-sm text-gray-500">{field.label}</label>
                  <Select
                    name={field.fieldName}
                    onValueChange={(value) =>
                      handleSelectChange(field.fieldName, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : field.fieldType === "radio" ? (
                <div className="my-3 w-full">
                  <label className="text-sm text-gray-500">{field.label}</label>
                  <RadioGroup
                    defaultValue={field.options[0]}
                    name={field.fieldName}
                    onValueChange={(value) =>
                      handleSelectChange(field.fieldName, value)
                    }
                  >
                    {field.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={`option-${index}`}
                        />
                        <Label htmlFor={`option-${index}`}>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : field.fieldType === "checkbox" ? (
                <div className="my-3 w-full">
                  <div>
                    <label className="text-sm text-gray-500">
                      {field?.label}
                    </label>
                    {field?.options ? (
                      field?.options?.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Checkbox
                            name={field.fieldName}
                            value={item?.value}
                            onCheckedChange={(v) =>
                              handleCheckboxChange(field?.label, item?.label, v)
                            }
                          />
                          <h2>{item?.label}</h2>
                        </div>
                      ))
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          name={field.fieldName}
                          value={field.label}
                          onChange={handleCheckboxChange}
                        />
                        <h2>{field.label}</h2>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-500">{field.label}</label>
                  <Input
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    name={field.fieldName}
                    className="w-full bg-transparent"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div>
                {editable && (
                  <FieldEdit
                    defaultValue={field}
                    onUpdate={(value) => onFieldUpdate(value, index)}
                    deleteField={() => deleteField(index)}
                  />
                )}
              </div>
            </div>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      )}
    </>
  );
};

export default Panno;
