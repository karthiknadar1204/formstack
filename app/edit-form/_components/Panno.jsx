"use client";

import React, { useState, useEffect } from "react";
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

const Panno = ({ jsonForm, onFieldUpdate, deleteField }) => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(jsonForm);
      setFlag(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [jsonForm]);

  return (
    <>
      {flag && (
        <div className="border p-5 md:w-[600px] rounded-lg" data-theme="dark">
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
                  <label className="text-sm text-gray-500">
                    {field.label}
                  </label>
                  <Input
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    name={field.fieldName}
                    className="w-full"
                  />
                </div>
              ) : field.fieldType === "dropdown" ? (
                <div className="my-3 w-full">
                  <label className="text-sm text-gray-500">
                    {field.label}
                  </label>
                  <Select>
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
                  <label className="text-sm text-gray-500">
                    {field.label}
                  </label>
                  <RadioGroup defaultValue={field.options[0].value}>
                    {field.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`option-${index}`}
                        />
                        <Label htmlFor={`option-${index}`}>
                          {option.label}
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
                          <Checkbox />
                          <h2>{item?.value}</h2>
                        </div>
                      ))
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Checkbox />
                        <h2>{field.label}</h2>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm text-gray-500">
                    {field.label}
                  </label>
                  <Input
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    name={field.fieldName}
                    className="w-full"
                  />
                </div>
              )}

              <div>
                <FieldEdit 
                  defaultValue={field}
                  onUpdate={(value) => onFieldUpdate(value, index)}
                  deleteField={() => deleteField(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Panno;
