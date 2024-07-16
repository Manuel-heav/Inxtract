"use client";
import React from "react";
import DashboardMain from "./_components/DashboardMain";
import Topbar from "./_components/Topbar";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function DashboardHome() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <Topbar />
      <DashboardMain />
    </div>
  );
}
