import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Select from "react-select";



export default function SelecRec() {
  const {   control } = useForm();

  return (
   
   
<div className="row">
<Controller
        name="iceCreamType"
        rules={{ required: true}}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
            ]}
          />
        )}
        control={control}
        defaultValue=""
      />
</div>

)}

