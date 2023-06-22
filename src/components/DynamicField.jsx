/** @format */

import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

export const DynamicField = () => {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  // if you want to control your fields with watch
  const watchResult = watch("test");
  console.log({watchResult});

  // The following is useWatch example
  console.log(useWatch({ name: "test", control }));
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.firstName`}
              control={control}
            />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
};
