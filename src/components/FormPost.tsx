"use client";

import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface formValue {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
  initialValue?: FormInputPost;
}

const FormPost: FC<formValue> = ({ submit, isEditing, initialValue }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });

  console.log("this is data", dataTags);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-4"
    >
      <input
        type="text"
        {...register("title")}
        placeholder="Post title..."
        className="input input-bordered w-full max-w-lg"
      />
      <textarea
        {...register("content")}
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Post Content..."
      ></textarea>
      {isLoadingTags ? (
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <select
          {...register("tagId")}
          className="select select-bordered w-full max-w-lg"
          defaultValue={""}
        >
          {dataTags?.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      )}
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEditing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default FormPost;
