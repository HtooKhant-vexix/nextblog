"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();

  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div>
      <Link className="btn" href={`/edit/${id}`}>
        {" "}
        <Pencil /> Edit
      </Link>
      <button onClick={() => deletePost()} className="btn ms-2 btn-error">
        <Trash /> Delete
      </button>
    </div>
  );
};

export default ButtonAction;
