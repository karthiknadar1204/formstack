// "use client";

// import { db } from "@/configs";
// import { JsonForms } from "@/configs/schema";
// import { useUser } from "@clerk/nextjs";
// import { eq, desc } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import FormListItem from "./FormListItem";

// const FormList = () => {
//   const { user } = useUser();
//   const [formList, setFormList] = useState([]);

//   useEffect(() => {
//     user && GetFormList();
//   }, [user]);

//   const GetFormList = async () => {
//     const result = await db
//       .select()
//       .from(JsonForms)
//       .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(JsonForms.id));
//     setFormList(result);
//     console.log(result);
//   };

//   return (
//     <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
//       {
//         formList.map((form,index)=>(
//           <div>
//             <FormListItem jsonForm={JSON.parse(form.jsonform)} key={index} formRecord={form} />
//           </div>
//         ))
//       }
//     </div>

//   )
// };

// export default FormList;




"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFormList();
    }
  }, [user]);

  const GetFormList = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));
      setFormList(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching form list:", error);
    }
  };

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form, index) => {
        let parsedForm = null;
        try {
          parsedForm = JSON.parse(form.jsonform);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle or log the invalid JSON data here
        }
        return (
          <div key={index}>
            {parsedForm && <FormListItem jsonForm={parsedForm} formRecord={form} refreshData={GetFormList}/>}
          </div>
        );
      })}
    </div>
  );
};

export default FormList;
