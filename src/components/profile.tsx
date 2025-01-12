import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSessionContext } from "../../context/SessionContext";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Gift, Star } from "lucide-react";

interface ProfileProps {
  username: string;
  // image : string;
  peer: boolean;
}

const timeDisappear = 2000;

export default function Profile({ username, peer }: ProfileProps) {
  const { chat } = useSessionContext();
  const [isBubble, setIsBubble] = useState(false);

  useEffect(() => {
    const condition =
      chat.length > 0 &&
      ((!peer && chat[chat.length - 1].name === "User") ||
        (peer && chat[chat.length - 1].name !== "User"));
    if (!condition) return;

    setIsBubble(condition);

    const timer = setTimeout(() => {
      setIsBubble(false);
    }, timeDisappear);

    return () => clearTimeout(timer);
  }, [chat, peer]);

  return (
    <motion.div
      className={`absolute bottom-4 ${
        peer ? "left-4" : "right-4"
      } flex items-center gap-2 flex-wrap`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {peer ? (
        <>
          <div className="bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {username}
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
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-yellow-400" />
            HD
          </motion.div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Star className="w-4 h-4" />
            {username}
          </div>
        </>
      )}
    </motion.div>
  );
}
