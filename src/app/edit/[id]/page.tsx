"use client";

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";

interface EditPostProps {
  params: {
    id: string;
  };
}

const EditPostPage: FC<EditPostProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`);
      return response.data;
    },
  });

  console.log(dataPost);
  const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
    console.log("hhlhlhs");
    updatePost(data);
  };

  const { mutate: updatePost } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.patch(`/api/posts/${id}`, newPost);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      console.log("hello");
      router.push("/");
      router.refresh();
    },
  });

  if (isLoadingPost) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <div className="text-2xl my-4 font-bold text-center">Add New Post</div>
      <FormPost
        submit={handleEditPost}
        initialValue={dataPost}
        isEditing={true}
      />
    </div>
  );
};

export default EditPostPage;
