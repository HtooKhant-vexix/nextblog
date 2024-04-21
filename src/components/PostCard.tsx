import { Tag } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tag: Tag;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { id, title, content, tag } = post;

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="badge">{tag.name}</div>
        <div className="card-actions justify-end">
          <Link
            href={`/blog/${id}`}
            className="btn btn-primary hover:underline"
          >
            Read more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
