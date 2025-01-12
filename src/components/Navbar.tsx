import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Users, Settings, Crown, Palette, Music2, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect } from "react";

export default function Navbar() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
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
          <Image
            src="/text.png"
            width={130}
            height={130}
            className="py-1"
            alt="Talksphere Logo"
          ></Image>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Badge variant="success" className="text-xs">
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
                  // onClick={() => setIsSettingsOpen(!isSettingsOpen)}
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
          {true && (
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
  );
}
