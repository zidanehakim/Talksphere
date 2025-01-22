import { useSessionContext } from "../../../context/SessionContext";
import { useEffect, useState } from "react";
import { Sparkles, Blend, Star } from "lucide-react";
import "tailwindcss-animate";

interface ProfileProps {
  username: string;
  peer: boolean;
  score?: string;
}

const timeDisappear = 2000;

const Bubble = ({ message, peer }: { message: string; peer: boolean }) => (
  <div
    className={`bg-gradient-to-r ${
      peer
        ? "from-blue-600/90 to-cyan-600/90"
        : "from-purple-600/90 to-pink-600/90"
    } ps-4 pe-6 py-3 ${
      peer ? "rounded-br-2xl rounded-tl-2xl" : "rounded-bl-2xl rounded-tr-2xl"
    } text-xs absolute bottom-full ${
      peer ? "left-8" : "right-8"
    } mb-3 text-white shadow-lg whitespace-normal w-auto max-w-xs border border-white animate-fadeInUp`}
    style={{ transformOrigin: peer ? "bottom left" : "bottom right" }}
  >
    {message}
    <div
      className={`absolute bg-gradient-to-r ${
        peer
          ? "from-cyan-600/90 to-blue-500/90"
          : "from-pink-600/90 to-purple-600/90"
      } rounded-full ${
        peer ? "rounded-bl-none" : "rounded-br-none"
      } w-5 h-5 -bottom-1 ${peer ? "-left-1" : "-right-1"} border border-white`}
    />
  </div>
);

const ProfileBadge = ({
  username,
  peer,
}: {
  username: string;
  peer: boolean;
}) => (
  <div
    className={`bg-gradient-to-r ${
      peer ? "from-blue-600 to-cyan-400" : "from-purple-600 to-pink-500"
    } px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}
  >
    {peer ? <Sparkles className="w-4 h-4" /> : <Star className="w-4 h-4" />}
    {username}
  </div>
);

const ScoreBadge = ({ score }: { score?: string }) => (
  <div className="bg-gray-800 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs flex items-center gap-1">
    <Blend className="w-3 h-3 text-green-400" />
    {score}%
  </div>
);

export default function Profile({ username, peer, score }: ProfileProps) {
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
    <div
      className={`absolute bottom-4 ${
        peer ? "left-4" : "right-4"
      } flex items-center gap-2 flex-wrap animate-fadeIn`}
    >
      {isBubble && (
        <Bubble message={chat[chat.length - 1].message} peer={peer} />
      )}
      <ProfileBadge username={username} peer={peer} />
      {peer && <ScoreBadge score={score} />}
    </div>
  );
}
