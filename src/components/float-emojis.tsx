import { motion } from "framer-motion";

export default function FloatEmojis() {
  const floatingEmojis = [
    "✨",
    "💫",
    "💝",
    "🌟",
    "💫",
    "🎉",
    "🔥",
    "💖",
    "🚀",
    "🌈",
  ];

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),rgba(236,72,153,0.05))]" />
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, "-100vh"],
            x: [null, `${(Math.random() - 0.5) * 200}px`],
            opacity: [1, 0],
            scale: [1, 1.5, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
