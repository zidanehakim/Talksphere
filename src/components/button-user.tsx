import { useRef, useState } from "react";

import { useSessionContext } from "../../context/SessionContext";
import { useProtocolContext } from "../../context/ProtocolContext";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ButtonUser() {
  const { isBackCamera, isChatBoxOpen, setIsChatBoxOpen } = useSessionContext();
  const { setupCamRef, localStream } = useProtocolContext();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  function handleFullScreen(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const element = document.documentElement;
    // Check if we are already in fullscreen mode
    if (document.fullscreenElement) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    } else {
      // Request fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  }

  return (
    <motion.div
      className="absolute top-4 left-4 flex gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full shadow-lg relative group"
                onClick={handleFullScreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full shadow-lg relative group"
                onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
              >
                <MessageCircle className="w-5 h-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-black"
                />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
