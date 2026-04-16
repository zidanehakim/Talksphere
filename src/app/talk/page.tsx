"use client";
import { useState, useEffect } from "react";
import Cam from "../../components/talk/cam";
import Navbar from "../../components/talk/navbar";

import { useProtocolContext } from "../../../context/ProtocolContext";
import { useSessionContext } from "../../../context/SessionContext";

import AddProfile from "@/components/talk/add-profile";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  const { isWSConnected } = useProtocolContext();
  const { isEditProfileOpen } = useSessionContext();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (isWSConnected) {
      setTimedOut(false);
      return;
    }
    const timer = setTimeout(() => setTimedOut(true), 10000);
    return () => clearTimeout(timer);
  }, [isWSConnected]);

  return (
    <main className="w-full h-full grid grid-rows-[3.5em,auto] bg-black text-white overflow-hidden">
      {!isWSConnected && (
        <div className="w-full h-full flex flex-col items-center justify-center absolute z-50 bg-black">
          {timedOut ? (
            <div className="flex flex-col items-center gap-6 text-center px-8">
              <div className="w-16 h-16 rounded-full border border-pink-500/30 bg-pink-500/5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">
                  Connection failed
                </p>
                <p className="text-zinc-500 text-sm">
                  Unable to reach TalkSphere servers
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity tracking-wide"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <DotLottieReact
                src="/cat.lottie"
                loop
                autoplay
                className="w-[8em] h-[7em] sm:w-[13em] sm:h-[12em]"
              />
              <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase animate-pulse">
                Connecting...
              </p>
            </div>
          )}
        </div>
      )}
      {isWSConnected && (
        <>
          <Navbar />
          {isEditProfileOpen && <AddProfile />}
        </>
      )}
      <Cam />
    </main>
  );
}
