/** @format */

import { ErrorMessage } from "@hookform/error-message";
import React, { Fragment, useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  useWatch,
  error,
} from "react-hook-form";

export const DynamicField = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    getFieldState,
  } = useForm({
    defaultValues: {
      test: [
        { firstName: "Bil", lastName: "Luo" },
        { firstName: "Bil", lastName: "Luo" },
        { firstName: "Bil", lastName: "Luo" },

        { firstName: "Bil", lastName: "Luo" },
        { firstName: "Bil", lastName: "Luo" },
        { firstName: "Bil", lastName: "Luo" },
        { firstName: "Bil", lastName: "Luo" },
        { firstName: "Bil", lastName: "Luo" },
      ],
    },
  });
  const [state, setState] = useState([]);
  const { fields } = useFieldArray({
    control,
    name: "test",
  });
  // if you want to control your fields with watch
  // const watchResult = watch("test");

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));
  return (
    <>
      <form onSubmit={handleSubmit((data) => setState(data))}>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <div>
                <Controller
                  shouldUnregister={true}
                  rules={{
                    maxLength: { value: 3, message: "FirstName Max Length 3" },
                  }}
                  render={({ field }) => <input {...field} />}
                  name={`test.${index}.firstName`}
                  control={control}
                />
                {errors?.test?.[index]?.firstName && (
                  <span>{errors.test[index].firstName.message}</span>
                )}
              </div>
              <div>
                <Controller
                  shouldUnregister={true}
                  rules={{
                    maxLength: { value: 3, message: "FirstName Max Length 3" },
                  }}
                  render={({ field }) => <input {...field} />}
                  name={`test.${index}.lastName`}
                  control={control}
                />
                {errors?.test?.[index]?.lastName && (
                  <span>{errors.test[index].lastName.message}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <input type="submit" />
      </form>

      <ul>
        {Object.entries(state).length>0 &&
          state.test.map((items,index) => (
            <li key={index}>
              <div>
                <p>{items.firstName}</p>
                <p>{items.lastName}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
