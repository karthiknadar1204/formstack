"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModel";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const PROMPT = "on the basis of the Description,please give form in JSON format with form title,form heading along with fieldName,fieldTitle,formfield,form name,label,placeholder and form Label,fieldType,required fields and form label in JSON format.";

const CreateForm = () => {

    const {user}=useUser();

  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const router=useRouter()

  const onCreateForm = async () => {
    setLoading(true); // Set loading to true when the form creation starts
    console.log(userInput);
    const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
    console.log(result.response.text());
    if(result.response.text()){
        setLoading(false);
        const resp=await db.insert(JsonForms).values({
            jsonform:result.response.text(),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD/MM/yyyy')
        }).returning({id:JsonForms.id});
        console.log("New form ID",resp[0].id);
        if(resp[0].id){
            router.push('/edit-form/'+resp[0].id)
        }

    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>+ Create Form</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea className='my-2' onChange={(e) => setUserInput(e.target.value)} placeholder="write a description of the form" />
              <div className="flex gap-2 my-3 justify-end">
                <Button onClick={onCreateForm} disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;