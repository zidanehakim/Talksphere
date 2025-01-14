import { useEffect, useState } from "react";
import { useSessionContext } from "../../context/SessionContext";
import {
  ConnectionState,
  useProtocolContext,
} from "../../context/ProtocolContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

interface TooltipButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  tooltipText: string;
}

function TooltipButton({ onClick, icon, tooltipText }: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="move hover:scale-105 active:scale-95 transition-transform">
            <Button
              variant="ghost"
              size="icon"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full shadow-lg relative group"
              onClick={onClick}
            >
              {icon}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function ButtonUser() {
  const { isChatBoxOpen, setIsChatBoxOpen, chat } = useSessionContext();
  const { state } = useProtocolContext();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExclamationMarkVisible, setIsExclamationMarkVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (chat.length > 0 && chat[chat.length - 1].name !== "User") {
      setIsExclamationMarkVisible(true);
    }
  }, [chat]);

  function toggleFullScreen(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const element = document.documentElement;
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  }

  return (
    <div className="move absolute top-4 left-4 flex gap-2 animate-fadeIn animate-delay-600">
      <TooltipButton
        onClick={toggleFullScreen}
        icon={
          isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )
        }
        tooltipText={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      />
      {state === ConnectionState.Connected && (
        <TooltipButton
          onClick={() => {
            setIsExclamationMarkVisible(false);
            setIsChatBoxOpen(!isChatBoxOpen);
          }}
          icon={
            <>
              <MessageCircle className="w-5 h-5" />
              {isExclamationMarkVisible && chat.length > 0 && (
                <span className="absolute -top-1 right-0 bg-yellow-500 text-white text-xs font-extrabold rounded-full w-4 h-4 animate-fadeIn animate-delay-600">
                  !
                </span>
              )}
            </>
          }
          tooltipText="Toggle Chat"
        />
      )}
    </div>
  );
}
