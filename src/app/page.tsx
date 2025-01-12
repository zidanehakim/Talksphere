"use client";
import Cam from "../components/cam";
import Chat from "../components/chat";
import Navbar from "../components/navbar";
import Buttons from "../components/buttons";

import {
  useProtocolContext,
  ConnectionState,
} from "../../context/ProtocolContext";
import { useSessionContext } from "../../context/SessionContext";

import Drawers from "../components/drawers";
import ButtonUser from "../components/button-user";

import { DotLoader } from "react-spinners";
import AddProfile from "@/components/add-profile";

import FloatEmojis from "@/components/float-emojis";

export default function Home() {
  const { state, isWSConnected } = useProtocolContext();
  const { isChatBoxOpen } = useSessionContext();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0D0D0D] to-[#1A0B2E] text-white overflow-hidden">
      {isWSConnected ? (
        <div className="w-full h-full flex items-center justify-center absolute z-50 bg-gray-900">
          <DotLoader
            size={100}
            color="white"
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-tl-3xl rounded-br-3xl rounded-tr-2xl rounded-bl-2xl"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <Navbar />
          {/* <AddProfile /> */}
        </>
      )}

      {/* Animated Background */}
      {/* <FloatEmojis /> */}

      {/* Header */}

      {/* Main Content */}
      <Cam />

      {/* <Drawers /> */}
      {/* <Buttons /> */}
    </main>
  );
}
