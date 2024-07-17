"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export default function Header() {

  return (
    <div className="flex justify-between items-center w-[95%] m-auto mt-5">
      <img src="/logo.png" className="h-10" alt="Logo" />
      <div className="bg-white flex gap-4 p-3 rounded-3xl shadow-custom-1">
        <h2 className="text-sm cursor-pointer transition-all duration-300 ease-in-out rounded-full hover:scale-105 p-2 bg-[#f8f8f8] border border-[#e3e3e3]">
          Home
        </h2>
        <Link href="/dashboard/summarize">
        <h2 className="text-sm cursor-pointer transition-all duration-300 ease-in-out rounded hover:scale-105 p-2">
          Platform
        </h2>
        </Link>
        <Link href="dashboard/about">
        <h2 className="text-sm cursor-pointer transition-all duration-300 ease-in-out rounded hover:scale-105 p-2">
          About
        </h2>
        </Link>
        <Link href="/dashboard/pricing">
        <h2 className="text-sm cursor-pointer transition-all duration-300 ease-in-out rounded-full hover:scale-105 p-2 bg-[#FBE9D0]">
          Premium
        </h2>
        </Link>
      </div>

      <div className="bg-white flex gap-4 p-3 rounded-3xl shadow-custom-1">
         <SignInButton />
        <Link href="/dashboard">
          <h2 className="text-sm cursor-pointer transition-all duration-300 ease-in-out rounded-full p-2 bg-[#F05A24] text-white">
            Get Started
          </h2>
        </Link>
      </div>
    </div>
  );
}
