import React, { useEffect, useRef } from "react";
import { useProtocolContext } from "../../../context/ProtocolContext";
import { useSessionContext, ChatType } from "../../../context/SessionContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { X, Send, MessageCircleMore } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Chat() {
  const { socket } = useProtocolContext();
  const { chat, setChat, peerID, setIsChatBoxOpen, isChatBoxOpen } =
    useSessionContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current && isChatBoxOpen) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat, isChatBoxOpen]);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value.length > 0) {
      const newMessage: ChatType = {
        name: "User",
        message: inputRef.current.value,
      };
      setChat((prevChat) => [...prevChat, newMessage]);
      inputRef.current.value = "";

      socket.current!.send(
        JSON.stringify({
          type: "chat",
          message: newMessage.message,
          peerID: peerID.current,
        })
      );
    }
  }

  return (
    <div
      className={`absolute top-16 left-4 h-64 w-64 sm:w-80 sm:h-80 bg-gray-950/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl animate-in fade-in duration-200 ${
        isChatBoxOpen ? "flex flex-col" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center py-1 px-3 border-b border-white/10 bg-gradient-to-r from-purple-600/30 to-pink-500/30 rounded-t-2xl">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageCircleMore className="w-4 h-4 text-pink-400" />
          Chat
        </h3>
        <Button
          variant="link"
          size="icon"
          className="rounded-full"
          onClick={() => setIsChatBoxOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div
        id="chatbox"
        ref={chatBoxRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {chat.map((message, index) => (
          <div
            key={index}
            className={`grid ${
              message.name !== "User" ? "justify-start" : "justify-end"
            } gap-3`}
          >
            <div className="w-fit h-fit">
              <p
                className={`text-sm text-white mb-1 ${
                  message.name !== "User" ? "text-left" : "text-right"
                }`}
              >
                {message.name !== "User" ? message.name : "You"}
              </p>
              <div
                className={`bg-gradient-to-r ${
                  message.name !== "User"
                    ? "from-blue-600/30 to-cyan-400/30"
                    : "from-pink-600/30 to-purple-400/30"
                } rounded-xl p-2 text-xs inline-block backdrop-blur-sm border border-white/10 text-white animate-in fade-in slide-in-from-bottom-2`}
              >
                {message.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/10 bg-gradient-to-r from-purple-600/30 to-pink-500/30 rounded-b-2xl">
        <form onSubmit={sendMessage} className="flex gap-2 text-xs">
          <Input
            autoFocus
            ref={inputRef}
            placeholder="Type a message..."
            className="bg-white/5 border-white/10 focus:border-purple-500 rounded-xl"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative group">
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-xl relative group"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </div>
    </div>
  );
}
