import PostCard from "@/components/PostCard";
import Image from "next/image";
import { db } from "./lib/db";

export default async function Home() {
  async function getPosts() {
    const response = await db.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        tag: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  }

  const posts = await getPosts();

  console.log(posts);

  return (
    <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
