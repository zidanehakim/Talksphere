import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useSessionContext } from "../../context/SessionContext";

export default function Navbar() {
  const { online } = useSessionContext();
  return (
    <header className="w-full z-50 flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-xl border-b border-white/10 animate-fadeInDown">
      <div className="flex items-center gap-3">
        <div className="w-11 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl grid place-items-center shadow-lg shadow-purple-500/20 animate-pulse">
          <span className="text-white font-bold text-lg">TS</span>
        </div>
        <div className="flex flex-col">
          <Image
            src="/text.png"
            width={130}
            height={130}
            className="py-1"
            alt="Talksphere Logo"
          ></Image>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 animate-fadeIn">
          <Badge variant="success" className="text-xs">
            Live
          </Badge>
          <span className="text-xs text-gray-400 flex items-center gap-1 animate-pulse">
            <Users className="w-3 h-3" />
            {online} online
          </span>
        </div>
      </div>
    </header>
  );
}
