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
import { motion } from "framer-motion";
import {
  Camera,
  Edit,
  Volume2,
  PhoneOff,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

type ButtonsProps = {
  remoteVideoRef: React.MutableRefObject<HTMLVideoElement | null>;
};

export default function Buttons({ remoteVideoRef }: ButtonsProps) {
  const {
    socket,
    setupWebRTC,
    peerConnection,
    setupCamRef,
    state,
    dispatch,
    isWSConnected,
  } = useProtocolContext();
  const {
    setChat,
    isMatchClicked,
    setIsMatchClicked,
    isBackCamera,
    peers,
    peerID,
    setIsEditProfileOpen,
    minScore,
    matchBest,
  } = useSessionContext();

  // Check if the user is on a mobile device
  const mobileDevices =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobile = useRef<boolean>(
    mobileDevices.test(navigator.userAgent.toLowerCase())
  );

  function handleMatch(event: React.MouseEvent<HTMLButtonElement>) {
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
  }

  function handleStop(event: React.MouseEvent<HTMLButtonElement>) {
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
  }

  function handleClose() {
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
  }
  return (
    <motion.div
      className="absolute bottom-0 inset-x-0 p-6 bg-transparent bg-gradient-to-t from-black/10 via-black/10 to-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-center gap-4">
        {[
          isMobile.current && {
            icon: Camera,
            label: "Toggle Camera",
            onClick: () => {
              isBackCamera.current = !isBackCamera.current;
            },
          },
          {
            icon: Edit,
            label: "Edit Profile",
            onClick: () => {
              setIsEditProfileOpen(true);
            },
          },
        ]
          .filter(Boolean)
          .map(
            (control, index) =>
              control && (
                <TooltipProvider key={control.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Button
                          size="lg"
                          variant="secondary"
                          className="relative rounded-xl h-12 w-12 bg-white/10 hover:bg-white/20 border-0 group overflow-hidden"
                          onClick={control.onClick}
                        >
                          <control.icon className="w-5 h-5 relative z-10" />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20"
                            animate={{
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </Button>
                      </motion.div>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="relative rounded-xl h-12 px-4 bg-white/10 hover:bg-white/20 border-0 overflow-hidden"
                >
                  <Volume2 className="w-5 h-5 relative z-10 mr-2" />
                  <Slider
                    value={[remoteVideoRef.current?.volume || 0]}
                    onValueChange={(value) => {
                      if (remoteVideoRef.current) {
                        remoteVideoRef.current.volume = value[0];
                      }
                    }}
                    max={100}
                    step={1}
                    className="w-24"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust Volume</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  variant="destructive"
                  className="relative rounded-xl h-12 w-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 group"
                  onClick={handleStop}
                  disabled={isMatchClicked}
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>End Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  size="lg"
                  className="rounded-xl h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-0 group relative overflow-hidden"
                  onClick={handleMatch}
                  disabled={isMatchClicked}
                >
                  {isMatchClicked ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10 text-white">
                        {state === ConnectionState.Connected ? "Next" : "Match"}
                      </span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10 text-white" />
                    </>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Find Next Match</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
