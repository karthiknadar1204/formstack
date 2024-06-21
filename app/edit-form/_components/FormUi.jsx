"use client";

import React from "react";
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

const FormUi = ({ jsonForm }) => {
  return (
    <div className="border p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">{jsonForm?.formName}</h2>
      {jsonForm.fields.map((field, index) => (
        <div key={index} className="my-3">
          {field.fieldType === "select" ? (
            <div>
              <label className="text-sm text-gray-500">{field.fieldName}</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div>
              <label className="text-sm text-gray-500">{field.fieldName}</label>
              <RadioGroup defaultValue={field.options[0]}>
                {field.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div>
              <label className="text-sm text-gray-500">{field.fieldName}</label>
              <Input
                type={field.fieldType}
                placeholder={field.placeholder}
                name={field.fieldName}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormUi;
