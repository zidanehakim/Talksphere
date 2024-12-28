"use client";
import Cam from "../components/cam";
import Chat from "../components/chat";
import Button from "../components/button";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="w-full h-full bg-blue-900">
      <Navbar />
      <Cam />
    </main>
  );
}
