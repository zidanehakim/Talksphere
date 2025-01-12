import React, { useEffect, useRef } from "react";

import {
  useProtocolContext,
  ConnectionState,
} from "../../context/ProtocolContext";
import { useSessionContext, ChatType } from "../../context/SessionContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X, Send, MessageCircleMore } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Chat() {
  const { socket, state } = useProtocolContext();
  const { chat, setChat, peerID, isChatBoxOpen, setIsChatBoxOpen } =
    useSessionContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

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
    <AnimatePresence>
      {isChatBoxOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 left-4 w-80 h-80 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col shadow-2xl"
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
              <div key={index} className="flex gap-3">
                <Avatar className="h-7 w-7 ring-2 ring-blue-500/50">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Stranger</p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600/10 to-cyan-400/10 rounded-xl p-2 text-xs inline-block backdrop-blur-sm border border-white/10"
                  >
                    {message.message}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 bg-gradient-to-r from-purple-600/30 to-pink-500/30 rounded-b-2xl">
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Type a message..."
                className="bg-white/5 border-white/10 focus:border-purple-500 rounded-xl"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        size="icon"
                        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-xl relative group"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send Message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
