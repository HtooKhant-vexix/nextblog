import { db } from "@/app/lib/db";
import BackButton from "@/components/BackButton";
import ButtonAction from "@/components/ButtonAction";
import React, { FC } from "react";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

async function getPost(id: string) {
  const response = await db.post.findFirst({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });
  return response;
}

const BlogDetail: FC<BlogDetailProps> = async ({ params }) => {
  const post = await getPost(params.id);

  return (
    <>
      <BackButton />
      <div className="mb-2 flex gap-6 items-center">
        <div className="text-2xl font-bold my-4">{post?.title}</div>
        <div className="badge">{post?.tag.name}</div>
      </div>
      <ButtonAction id={params.id} />
      <p className="text-slate mt-8">{post?.content}</p>
    </>
  );
};

export default BlogDetail;
