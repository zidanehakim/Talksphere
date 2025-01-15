"use client";
import Cam from "../../components/cam";
import Navbar from "../../components/navbar";

import { useProtocolContext } from "../../../context/ProtocolContext";
import { useSessionContext } from "../../../context/SessionContext";

import AddProfile from "@/components/add-profile";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  const { isWSConnected } = useProtocolContext();
  const { isEditProfileOpen } = useSessionContext();

  return (
    <main className="w-full h-full grid grid-rows-[3.5em,auto] bg-gradient-to-b bg-[#050505] text-white overflow-hidden">
      {!isWSConnected ? (
        <div className="w-full h-full flex items-center justify-center absolute z-50 bg-[#050505]">
          <DotLottieReact
            src="/cat.lottie"
            loop
            autoplay
            className="w-[8em] h-[7em] sm:w-[13em] sm:h-[12em] m-auto"
          />
        </div>
      ) : (
        <>
          <Navbar />
          {isEditProfileOpen && <AddProfile />}
        </>
      )}
      <Cam />
    </main>
  );
}
