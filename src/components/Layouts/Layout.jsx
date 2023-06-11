import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative m-auto flex min-h-[100dvh] min-w-min flex-col flex-wrap items-center justify-center bg-[#F5F7FB] text-lg text-[#293264]">
      <img
        src="/yellowbulb.svg"
        alt="yellow bulb"
        className="absolute right-0 top-0 z-0"
      />
      <div className="z-10 m-auto  flex min-h-screen w-screen flex-col flex-wrap items-center justify-center">
        <Outlet />
      </div>
      <img
        src="/bluebulb.svg"
        alt="blue bulb"
        className="absolute bottom-0 left-0 z-0"
      />
    </div>
  );
}
