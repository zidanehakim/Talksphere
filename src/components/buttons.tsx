import {
  useProtocolContext,
  configuration,
  ConnectionState,
} from "../../context/ProtocolContext";
import { useSessionContext } from "../../context/SessionContext";

import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Camera,
  Edit,
  Volume2,
  PhoneOff,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefObject, useRef } from "react";

type ButtonsProps = {
  remoteVideoRef: RefObject<HTMLVideoElement | null>;
};

export default function Buttons({ remoteVideoRef }: ButtonsProps) {
  const {
    socket,
    setupWebRTC,
    peerConnection,
    setupCamRef,
    state,
    dispatch,
    localStream,
  } = useProtocolContext();
  const {
    setChat,
    isMatchClicked,
    setIsMatchClicked,
    isBackCamera,
    setIsEditProfileOpen,
    peers,
    peerID,
    minScore,
    matchBest,
  } = useSessionContext();

  const mobileDevices =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobile = useRef<boolean>(
    mobileDevices.test(navigator.userAgent.toLowerCase())
  );

  const handleMatch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const username = peers[0].username;
    const preference = peers[0].preference;

    console.log("Matched", username, preference);
    setIsMatchClicked(true);

    handleClose();
    socket.current!.send(
      JSON.stringify({
        type: "queue",
        username: username,
        preference: preference,
        minScore: minScore.current,
      })
    );
    setupCamRef.current(false);
    setupWebRTC();
  };

  const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("Stopped");

    if (state !== ConnectionState.Connected) {
      socket.current!.send(
        JSON.stringify({
          type: "deque",
        })
      );
    }
    handleClose();
    setIsMatchClicked(false);
    peerID.current = "";
  };

  const handleClose = () => {
    if (matchBest.current) {
      clearInterval(matchBest.current);
    }

    if (state === ConnectionState.Connected) {
      console.log("Closing connection Instantly");
      socket.current!.send(
        JSON.stringify({ type: "close", peerID: peerID.current })
      );
      setChat(() => []);
      dispatch({ type: ConnectionState.Closed });
    }

    if (peerConnection) {
      peerConnection.current.close();
    }
    peerConnection.current = new RTCPeerConnection(configuration);
  };

  return (
    <div className="move sm:absolute bottom-0 inset-x-0 sm:p-6 bg-transparent bg-gradient-to-t from-black/5 via-black/5 to-transparent animate-fade-in-up">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {[
          isMobile.current && {
            icon: Camera,
            label: "Toggle Camera",
            onClick: () => {
              if (localStream.current) {
                localStream.current
                  .getVideoTracks()
                  .forEach((track) => track.stop());
              }
              isBackCamera.current = !isBackCamera.current;
              setupCamRef.current(true);
            },
            disabled: isMatchClicked && state !== ConnectionState.Connected,
          },
          {
            icon: Edit,
            label: "Edit Profile",
            onClick: () => {
              setIsEditProfileOpen(true);
            },
            disabled: isMatchClicked || state === ConnectionState.Connected,
          },
        ].map(
          (control, index) =>
            control && (
              <TooltipProvider key={control.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="move relative group animate-fade-in-up"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="relative rounded-xl h-12 w-12 bg-gradient-to-r from-purple-600/5 to-pink-600/5 hover:bg-white/20 border-0 overflow-hidden"
                        onClick={control.onClick}
                        disabled={control.disabled}
                      >
                        <control.icon className="w-5 h-5 relative z-10" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{control.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="move relative group animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="relative rounded-xl h-12 px-4 bg-gradient-to-r from-purple-600/5 to-pink-600/5 hover:bg-white/20 border-0 overflow-hidden"
                >
                  <Volume2 className="w-5 h-5 relative z-10 mr-2" />
                  <Slider
                    defaultValue={[50]}
                    onValueChange={(value) => {
                      if (remoteVideoRef.current) {
                        remoteVideoRef.current.volume = parseFloat(
                          (value[0] / 100).toFixed(2)
                        );
                      }
                    }}
                    max={100}
                    step={10}
                    className="w-24"
                  />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust Volume</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="move relative group animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <Button
                  size="lg"
                  variant="destructive"
                  className="relative rounded-xl h-12 w-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 group"
                  onClick={handleStop}
                  disabled={!isMatchClicked}
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>End Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="move relative group animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                <Button
                  size="lg"
                  className="rounded-xl h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-0 group relative overflow-hidden"
                  onClick={handleMatch}
                  disabled={
                    isMatchClicked && state !== ConnectionState.Connected
                  }
                >
                  {isMatchClicked && state !== ConnectionState.Connected ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10 text-white">
                        {state === ConnectionState.Connected ? "Next" : "Match"}
                      </span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10 text-white" />
                    </>
                  )}
                  <div className="move absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 animate-slide-x" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Find Next Match</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
