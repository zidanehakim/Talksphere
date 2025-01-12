"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Video,
  Shield,
  Globe,
  Users,
  Languages,
  Zap,
  Send,
  Sparkles,
  Headphones,
  Smile,
  Heart,
  Star,
  Award,
  Gift,
  ArrowRight,
} from "lucide-react";
import { SmoothSection } from "../../components/SmoothSection";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A0B2E] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black/30 backdrop-blur-xl fixed w-full z-50 border-b border-white/10">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl grid place-items-center shadow-lg shadow-purple-500/20"
          >
            <span className="text-white font-bold text-xl">TS</span>
          </motion.div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            TalkSphere
          </h1>
        </div>
        <Button
          variant="secondary"
          className="rounded-full px-6 bg-white/10 hover:bg-purple-500 hover:text-white transition-all duration-300 backdrop-blur-xl border border-white/20"
        >
          Login
        </Button>
      </header>

      {/* Hero Section */}
      <SmoothSection>
        <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Content */}
              <div className="lg:w-1/2 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Connect & Chat
                    </span>
                    <br />
                    <span className="relative">
                      with the World
                      <motion.div
                        className="absolute -right-12 -top-6"
                        animate={{ rotate: [0, 20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                      </motion.div>
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-xl">
                    Experience real connections through our playful and secure
                    platform. Meet new friends, learn languages, and explore
                    different cultures!
                  </p>
                  <div className="flex gap-4 items-center">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-xl shadow-purple-500/20 group bg-white"
                    >
                      <Send
                        className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform"
                        color="white"
                      />
                      <span className="text-white">Start Chatting</span>
                    </Button>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 py-6 border-purple-400/30 hover:bg-purple-400/10 text-purple-400"
                      >
                        Watch Demo
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Right Content - 3D Illustration */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative z-10 bg-gradient-to-b from-purple-600/20 to-pink-500/20 p-8 rounded-[2.5rem] border border-white/20 backdrop-blur-xl w-[85%]">
                    <img
                      src="thumbnail2.png"
                      alt="Chat Interface"
                      className="rounded-2xl shadow-2xl bg-cover"
                    />
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -left-8 top-1/4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-4 shadow-xl"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -right-8 top-1/2 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl p-4 shadow-xl"
                    >
                      <Video className="w-6 h-6" />
                    </motion.div>
                  </div>
                  {/* Background Blur Effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-3xl rounded-full z-0"></div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Animated Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0"
            >
              <svg
                className="w-full h-full opacity-30"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#grad1)"
                  d="M43.5,-68.5C55.9,-62.1,65.2,-49.2,71.7,-35.1C78.2,-20.9,81.9,-5.5,79.8,9.2C77.7,24,69.8,38.1,59.1,48.8C48.4,59.5,34.9,66.8,20.4,71.3C5.9,75.8,-9.6,77.5,-23.6,73.6C-37.6,69.8,-50.1,60.4,-60.9,48.8C-71.7,37.2,-80.8,23.4,-83.5,8.3C-86.2,-6.9,-82.5,-23.3,-74.2,-36.6C-65.9,-49.8,-53,-59.8,-39.5,-65.5C-25.9,-71.2,-13,-72.6,1.5,-75C15.9,-77.4,31.1,-74.9,43.5,-68.5Z"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 20 20; 0 0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#7C3AED", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#EC4899", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </motion.div>
          </div>
        </section>
      </SmoothSection>

      {/* Features Section */}
      <SmoothSection>
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-bold mb-4">
                Why Choose TalkSphere?
              </h3>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Experience a new way of connecting with people around the globe
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Globe className="w-12 h-12" />}
                title="Global Community"
                description="Connect with people from over 190+ countries"
                color="from-purple-600 to-pink-500"
              />
              <FeatureCard
                icon={<Shield className="w-12 h-12" />}
                title="Safe & Secure"
                description="Advanced encryption and privacy features"
                color="from-blue-600 to-cyan-400"
              />
              <FeatureCard
                icon={<Languages className="w-12 h-12" />}
                title="Multi-Language"
                description="Real-time translation in 50+ languages"
                color="from-yellow-500 to-orange-500"
              />
            </div>
          </div>
        </section>
      </SmoothSection>

      {/* How It Works */}
      <SmoothSection>
        <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-transparent to-purple-900/20">
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-bold mb-4">How It Works</h3>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Get started in three simple steps
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {[
                {
                  number: 1,
                  title: "Sign Up",
                  icon: <Zap />,
                  description: "Create your account instantly",
                },
                {
                  number: 2,
                  title: "Match",
                  icon: <Users />,
                  description: "Find your perfect chat partner",
                },
                {
                  number: 3,
                  title: "Chat",
                  icon: <MessageCircle />,
                  description: "Start meaningful conversations",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative flex-1"
                >
                  <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                      <div className="text-2xl font-bold">{step.title}</div>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SmoothSection>

      {/* App Features */}
      <SmoothSection>
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-bold mb-4">Discover TalkSphere</h3>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Explore our amazing features designed for meaningful connections
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <AppFeatureCard
                title="Voice & Video Calls"
                description="Crystal clear HD video calls with noise cancellation"
                icon={<Video className="w-8 h-8" />}
                color="from-purple-500 to-pink-500"
                image="/placeholder.svg?height=300&width=300"
              />
              <AppFeatureCard
                title="Smart Translation"
                description="Real-time chat translation in over 50 languages"
                icon={<Languages className="w-8 h-8" />}
                color="from-blue-500 to-cyan-400"
                image="/placeholder.svg?height=300&width=300"
              />
            </div>
          </div>
        </section>
      </SmoothSection>

      {/* User Experience */}
      <SmoothSection>
        <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-purple-900/20 to-transparent">
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-4xl font-bold mb-6">
                    Experience the Magic
                  </h3>
                  <p className="text-gray-300 text-xl mb-8">
                    Our platform is designed to make every conversation special.
                    With intuitive features and playful interactions, connecting
                    with others has never been more enjoyable.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Star className="w-6 h-6 text-yellow-400" />,
                        text: "Personalized matching algorithm",
                      },
                      {
                        icon: <Heart className="w-6 h-6 text-pink-500" />,
                        text: "Build lasting friendships",
                      },
                      {
                        icon: <Shield className="w-6 h-6 text-green-400" />,
                        text: "Safe and secure environment",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 backdrop-blur-xl"
                      >
                        <div className="p-2 bg-white/10 rounded-xl">
                          {item.icon}
                        </div>
                        <p className="text-lg text-gray-200">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <div className="relative bg-gradient-to-b from-purple-600/20 to-pink-500/20 p-8 rounded-[2.5rem] border border-white/20 backdrop-blur-xl">
                    <img
                      src="/placeholder.svg?height=600&width=400"
                      alt="TalkSphere Interface"
                      className="rounded-2xl shadow-2xl"
                    />
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -right-8 top-1/4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-4 shadow-xl"
                    >
                      <Smile className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -left-8 top-2/4 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl p-4 shadow-xl"
                    >
                      <Headphones className="w-6 h-6" />
                    </motion.div>
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-3xl rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </SmoothSection>

      {/* Premium Features */}
      <SmoothSection>
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 rounded-full px-4 py-1 text-sm font-medium mb-4">
                Premium Features
              </span>
              <h3 className="text-4xl font-bold mb-4">
                Unlock More Possibilities
              </h3>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Take your experience to the next level with our premium features
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Priority Matching",
                  description:
                    "Get matched with users who share your interests first",
                },
                {
                  icon: <Gift className="w-8 h-8" />,
                  title: "Custom Themes",
                  description:
                    "Personalize your chat experience with unique themes",
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Advanced Filters",
                  description:
                    "Find the perfect chat partners with detailed filters",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white shadow-xl">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SmoothSection>

      {/* Call to Action */}
      <SmoothSection>
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-[3rem] p-12 backdrop-blur-xl border border-white/10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-4xl font-bold mb-6">
                    Ready to Start Chatting?
                  </h3>
                  <p className="text-xl text-gray-300 mb-8">
                    Join millions of users already connecting on TalkSphere.
                    Your next great conversation is just a click away!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-300 group"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 py-6 border-white/20 hover:bg-white/10"
                    >
                      View Demo
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </SmoothSection>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl grid place-items-center">
                <span className="text-white font-bold">TS</span>
              </div>
              <span className="text-xl font-bold">TalkSphere</span>
            </div>
            <div className="flex gap-8 text-gray-300">
              <a href="#" className="hover:text-purple-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-300">
            <p>&copy; 2025 TalkSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="group relative"
    >
      <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
        <div className="mb-6">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 text-white shadow-xl`}
          >
            {icon}
          </div>
        </div>
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10"></div>
    </motion.div>
  );
}

function AppFeatureCard({
  icon,
  title,
  description,
  color,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  image: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="group relative"
    >
      <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 text-white shadow-xl mb-6`}
            >
              {icon}
            </div>
            <h4 className="text-2xl font-bold mb-4">{title}</h4>
            <p className="text-gray-300">{description}</p>
          </div>
          <div className="w-full md:w-48">
            <img src={image} alt={title} className="rounded-2xl shadow-xl" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10"></div>
    </motion.div>
  );
}
