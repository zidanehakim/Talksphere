"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Camera,
  Flag,
  Mic,
  PhoneOff,
  RefreshCw,
  Send,
  Settings,
  Volume2,
  MessageCircle,
  X,
  ChevronRight,
  Sparkles,
  Smile,
  Heart,
  Star,
  Wand2,
  Crown,
  Zap,
  Gift,
  Music2,
  Flame,
  Users,
  Maximize2,
  Minimize2,
  Loader2,
  Filter,
  Palette,
} from "lucide-react";
import FloatEmojis from "@/components/float-emojis";

export default function DesktopChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0]);
    if (videoRef.current) {
      videoRef.current.volume = newValue[0] / 100;
    }
  };

  const handleNextClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulating loading for 2 seconds
  };

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0D0D0D] to-[#1A0B2E] text-white overflow-hidden">
      {/* Animated Background */}
      <FloatEmojis />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-xl border-b border-white/10"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={controls}
            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl grid place-items-center shadow-lg shadow-purple-500/20"
          >
            <span className="text-white font-bold text-lg">TS</span>
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              TalkSphere
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400 text-xs"
              >
                Live
              </Badge>
              <motion.span
                className="text-xs text-gray-400 flex items-center gap-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-3 h-3" />
                12k online
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/10 rounded-xl"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute top-full right-0 mt-2 w-48 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl"
              >
                {[
                  { icon: Crown, label: "Premium Features" },
                  { icon: Palette, label: "Themes" },
                  { icon: Music2, label: "Sound Effects" },
                  { icon: Filter, label: "Filters" },
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Avatar className="h-8 w-8 ring-2 ring-purple-500/50 transition-all duration-300 hover:ring-4">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto p-6 pt-20 h-screen">
        <div
          className={`relative h-[calc(100%-2rem)] rounded-[2rem] overflow-hidden bg-black/30 border border-white/10 backdrop-blur-xl flex ${
            isDesktop ? "flex-row" : "flex-col"
          }`}
        >
          {/* Left Video (You) */}
          <motion.div
            className={`relative ${isDesktop ? "w-1/2" : "h-1/2"}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video ref={videoRef} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <motion.div
              className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                You
              </div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-yellow-400" />
                HD
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs flex items-center gap-1"
              >
                <Gift className="w-3 h-3 text-pink-400" />
                Premium
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated Separator */}
          <motion.div
            className={`${
              isDesktop ? "w-[2px] h-full" : "w-full h-[2px]"
            } relative overflow-hidden`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"
              animate={{
                y: ["-100%", "100%"],
                background: [
                  "linear-gradient(to bottom, #8B5CF6, #EC4899, #8B5CF6)",
                  "linear-gradient(to bottom, #EC4899, #8B5CF6, #EC4899)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Right Video (Stranger) */}
          <motion.div
            className={`relative ${isDesktop ? "w-1/2" : "h-1/2"}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <video className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <motion.div
              className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                Stranger
              </div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-yellow-400" />
                HD
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Chat Toggle Button */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full shadow-lg relative group"
                      onClick={() => setIsChatOpen(!isChatOpen)}
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full shadow-lg relative group"
                      onClick={toggleFullscreen}
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
          </motion.div>

          {/* Floating Chat */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 right-4 w-80 h-96 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col overflow-hidden shadow-2xl"
              >
                <div className="flex justify-between items-center p-3 border-b border-white/10 bg-gradient-to-r from-purple-600/30 to-pink-500/30">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    Chat
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/10 rounded-full"
                    onClick={() => setIsChatOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 ring-2 ring-blue-500/50">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">Stranger</p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-600/10 to-cyan-400/10 rounded-xl p-3 text-sm inline-block backdrop-blur-sm border border-white/10"
                      >
                        Hello! How are you?
                        <Smile className="w-4 h-4 inline ml-2 text-yellow-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-white/10 bg-gradient-to-r from-purple-600/30 to-pink-500/30">
                  <div className="flex gap-2">
                    <Input
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
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Controls */}
          <motion.div
            className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Camera, label: "Toggle Camera" },
                { icon: Mic, label: "Toggle Microphone" },
              ].map((control, index) => (
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
              ))}
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
                          value={[volume]}
                          onValueChange={handleVolumeChange}
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
                        onClick={handleNextClick}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span className="relative z-10">Next</span>
                            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
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
        </div>
      </div>
    </div>
  );
}
