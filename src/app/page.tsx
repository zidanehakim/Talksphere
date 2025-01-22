"use client";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Camera,
  Users,
  Shield,
  Globe,
  Star,
  StarHalf,
  Zap,
  MessageCircle,
  Heart,
  QuoteIcon,
  Facebook,
  Instagram,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavbarLanding from "../components/landing/navbar-landing";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Header */}
      <NavbarLanding />

      {/* Hero Section */}
      <section className="relative w-screen h-screen overflow-hidden flex m-auto">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black opacity-40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-[auto,45em] gap-8 justify-center items-center max-w-7xl">
          <div className="mx-auto text-center md:text-left px-2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 leading-tight">
              Meet New Friends Online
            </h1>
            <p className="text-base md:text-lg text-zinc-300 mb-8 max-w-3xl font-medium m-auto">
              Connect globally through high-quality video calls. Make friends,
              and explore cultures – all for free!
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-fit h-fit mx-auto lg:mx-0">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white px-8"
                onClick={() => router.push("/talk")}
              >
                Start Meeting People
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:text-white px-8"
              >
                <Link href="#how-it-works">Learn How it Works</Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 mb-12 text-center">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  1M+
                </h4>
                <p className="text-zinc-400 font-medium">Daily Active Users</p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  150+
                </h4>
                <p className="text-zinc-400 font-medium">Countries</p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  4.9/5
                </h4>
                <p className="text-zinc-400 font-medium">User Rating</p>
              </div>
            </div>
          </div>

          {typeof window !== "undefined" && window.innerWidth >= 768 && (
            <div>
              <DotLottieReact src="/videochat.lottie" loop autoplay />
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 border-t border-white/20 bg-black/50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-pink-400 hover:bg-white/20 cursor-default">
              How It Works
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start chatting in three simple steps
            </h2>
            <p className="text-zinc-400 font-medium">
              Getting started with TalkSphere is quick and easy. No complicated
              setup required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl m-auto text-center">
            {[
              {
                step: "01",
                title: "Go to TalkSphere",
                description: "Use your browser to visit the TalkSphere website",
              },
              {
                step: "02",
                title: "Set Profile",
                description: "Choose your display name and chat preferences",
              },
              {
                step: "03",
                title: "Start Chatting",
                description: "Click 'Start' and get matched instantly",
              },
            ].map((step, i) => (
              <div key={i} className="relative m-auto">
                <div className="text-5xl md:text-6xl font-bold text-white/30 mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-400 font-normal">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Fact Section */}
      <section id="fun-facts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-pink-400 hover:bg-white/20 cursor-default">
              Fun Facts
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              TalkSphere by the Numbers
            </h2>
            <p className="text-zinc-400 font-medium">
              Discover the impact we&apos;re making around the world
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl m-auto">
            {[
              {
                number: "1M+",
                label: "Daily Active Users",
                icon: <Users className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-600",
              },
              {
                number: "150+",
                label: "Countries Represented",
                icon: <Globe className="w-8 h-8" />,
                color: "from-yellow-500 to-orange-600",
              },
              {
                number: "5B+",
                label: "Minutes of Conversation",
                icon: <MessageCircle className="w-8 h-8" />,
                color: "from-green-500 to-lime-600",
              },
              {
                number: "500K+",
                label: "Friendships Formed",
                icon: <Heart className="w-8 h-8" />,
                color: "from-red-500 to-pink-600",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-zinc-950"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r flex items-center justify-center ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p className="text-zinc-400 font-normal text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-pink-400 hover:bg-white/20 cursor-default">
              Features
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Everything you need for perfect video chats
            </h2>
            <p className="text-zinc-400 font-medium">
              Discover all the features that make TalkSphere the best platform
              for meeting new people online
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl m-auto">
            {[
              {
                icon: <Camera className="w-6 h-6" />,
                title: "Good Video Quality",
                description:
                  "Crystal clear video quality with advanced compression",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Safe & Secure",
                description:
                  "Advanced encryption and user verification systems",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Matching",
                description: "Connect with new people in less than 5 seconds",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Interest Matching",
                description: "Find people who share your interests and hobbies",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Global Reach",
                description: "Connect with people from over 150 countries",
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Text Chat",
                description: "Built-in text chat with emoji and file sharing",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl border border-white/10 bg-black/50 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 font-thin text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/10 text-pink-400 hover:bg-white/20 cursor-default">
              Testimonials
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Loved by users worldwide
            </h2>
            <p className="text-zinc-400 font-medium">
              See what our community has to say about their TalkSphere
              experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl m-auto">
            {[
              {
                name: "Alice Cooper",
                rating: 5,
                review:
                  "TalkSphere has completely changed how I meet new people online. The video quality is amazing and I've made friends from all over the world!",
              },
              {
                name: "Bob Saget",
                rating: 4.5,
                review:
                  "I've been using TalkSphere for a few months now and I've met some amazing people. The video quality is top-notch and I love the instant matching feature.",
              },
              {
                name: "Diana Ross",
                rating: 5,
                review:
                  "I love using TalkSphere! The platform feels so seamless, and I've built genuine friendships with people I never imagined I'd meet.",
              },
            ].map((i, index) => (
              <div
                key={i.name}
                className="rounded-xl border border-white/10 bg-black/50 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 bg-zinc-950 p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 overflow-hidden border">
                    <Image
                      src={`/pp${index + 1}.jpg`}
                      alt="User Avatar"
                      width="48"
                      height="48"
                      className="rounded-full bg-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{i.name}</p>
                    <p className="text-sm text-zinc-400 font-thin">
                      {i.rating} stars
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 mt-4 px-6 p-4">
                  {Array.from({ length: Math.floor(i.rating) }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-yellow-300 text-yellow-300"
                    />
                  ))}
                  {i.rating % 1 !== 0 && (
                    <StarHalf className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  )}
                </div>
                <p className="text-zinc-400 font-normal px-6 pb-12">
                  {i.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Profile */}
      <section
        id="developer"
        className="py-28 border-t border-white/20 bg-black/50"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[22em,1fr] gap-8 items-center justify-center max-w-5xl px-10">
          <Image
            src="/face.jpg"
            alt="Developer"
            width="400"
            height="400"
            className="rounded-2xl border border-zinc-400"
          ></Image>

          <div className="w-full h-full m-auto flex flex-col justify-center text-center md:text-left">
            <QuoteIcon className="w-8 h-8 text-white mb-4" fill="white" />
            <p className="text-xl md:text-[2em] font-medium border-b border-zinc-200 pb-12 leading-10">
              Every misstep is a <span className="text-purple-400">lesson</span>{" "}
              that sharpens your <span className="text-pink-400">ability</span>{" "}
              to move forward with more precision.
            </p>
            <h3 className="text-xl md:text-2xl font-bold mt-8">
              Yazidane Hakim
            </h3>
            <p className="text-zinc-400 font-medium">Full Stack Developer</p>
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:text-white px-8"
                onClick={() => router.push("https://zidanehakim.xyz")}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Global Adventure?
            </h2>
            <p className="text-base md:text-lg mb-8 font-medium">
              Join millions of users already connecting on TalkSphere. Your next
              unforgettable conversation is just a click away.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-base font-bold"
              onClick={() => router.push("/talk")}
            >
              Start Chatting Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 bg-black/50 font-normal">
        <div className="container mx-auto px-4">
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center font-normal">
            <p className="text-sm text-zinc-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} TalkSphere. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                className="text-zinc-400 hover:text-white"
                onClick={() =>
                  router.push("https://www.facebook.com/ZidanyuChan")
                }
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                className="text-zinc-400 hover:text-white"
                onClick={() =>
                  router.push("https://www.instagram.com/yazidanehakim/")
                }
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                className="text-zinc-400 hover:text-white"
                onClick={() => router.push("https://github.com/zidanehakim")}
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
