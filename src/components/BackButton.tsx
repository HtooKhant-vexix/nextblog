"use client";

import { CircleChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className="btn " onClick={() => router.back()}>
      <CircleChevronLeft /> Back
    </button>
  );
};

export default BackButton;
