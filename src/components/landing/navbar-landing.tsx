import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function NavbarLanding() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 backdrop-blur-md bg-black/50">
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
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#how-it-works"
            className="text-sm text-zinc-200 hover:text-white transition-colors font-medium"
          >
            How It Works
          </Link>
          <Link
            href="#fun-facts"
            className="text-sm text-zinc-200 hover:text-white transition-colors font-medium"
          >
            Fun Facts
          </Link>
          <Link
            href="#features"
            className="text-sm text-zinc-200 hover:text-white transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm text-zinc-200 hover:text-white transition-colors font-medium"
          >
            Testimonials
          </Link>
          <Link
            href="#developer"
            className="text-sm text-zinc-200 hover:text-white transition-colors font-medium"
          >
            Developer
          </Link>
          <Button
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white"
            onClick={() => router.push("/talk")}
          >
            <Link
              href="#developer"
              className="text-sm text-zinc-200 hover:text-white transition-colors font-medium"
            >
              Start Matching
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
