"use client";
import Cam from "../components/cam";
import Chat from "../components/chat";

export default function Home() {
  return (
    <main className="w-full h-full bg-blue-900">
      <div className="w-full h-full grid grid-cols-[80%_20%] grid-rows-1">
        <Cam />
        <Chat />
      </div>
    </main>
  );
}
