import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSessionContext } from "../../../context/SessionContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { online } = useSessionContext();

  const router = useRouter();
  return (
    <header className="z-50 border-b border-white/20 backdrop-blur-md bg-black/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate animate-pulse">
            <span className="font-bold text-sm">TS</span>
          </div>
          <span className="font-bold text-xl">TalkSphere</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 animate-fadeIn text-sm">
            <Badge variant="success" className="text-xs border-none">
              Live
            </Badge>
            <span className="text-zinc-300 flex items-center gap-1 animate-pulse font-medium">
              <Users className="w-3 h-3" />
              {online} online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
