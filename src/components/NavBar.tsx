import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="container">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            <BookOpenCheck/>
          </Link>
        </div>
        <div className="flex-none">
          <Link href="/create" className="btn btn-ghost">
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
