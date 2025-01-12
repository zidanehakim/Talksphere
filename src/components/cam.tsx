import { useRef, useEffect, useState } from "react";
import {
  useProtocolContext,
  ConnectionState,
} from "../../context/ProtocolContext";
import { useSessionContext } from "../../context/SessionContext";

import Profile from "./profile";
import ButtonUser from "./button-user";

import { Skeleton } from "@/components/ui/skeleton";

import { motion } from "framer-motion";

import Buttons from "./buttons";
import Chat from "./chat";

export default function Cam() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const { peerConnection, setupCamRef, state, localStream } =
    useProtocolContext();
  const { isMatchClicked, isBackCamera, peers } = useSessionContext();

  const isLocalVideo = useRef<boolean>(false);

  setupCamRef.current = async function setupCam(bypass: boolean) {
    try {
      console.log("once");

      // Get the new local media stream (front or back camera)
      localStream.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true, // Reduce background noise
          echoCancellation: true, // Prevent audio feedback
          autoGainControl: true, // Maintain consistent volume
          sampleRate: 48000, // High-quality audio (48 kHz)
          sampleSize: 16, // CD-quality audio sample size
          channelCount: 1, // Mono (better for speech clarity)
        },
        video: {
          facingMode: isBackCamera.current ? "environment" : "user",
          width: { ideal: 1280, max: 1920 }, // HD resolution (1280x720 or higher)
          height: { ideal: 720, max: 1080 },
          frameRate: { ideal: 30, max: 60 }, // Smooth video at 30-60 FPS
        },
      });

      // Create an AudioContext for processing the audio
      const audioContext = new window.AudioContext();

      const mediaStreamSource = audioContext.createMediaStreamSource(
        localStream.current
      );

      // Create and configure the biquad filter (high-pass filter)
      const biquadFilter = audioContext.createBiquadFilter();
      biquadFilter.type = "highpass";
      biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Remove low frequencies

      // Create the gain node (volume control)
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // 50% volume

      // Connect the nodes in sequence
      mediaStreamSource.connect(biquadFilter);
      biquadFilter.connect(gainNode);

      if (localVideoRef.current && (!isLocalVideo.current || bypass)) {
        // Set the media stream to the local video element
        localVideoRef.current.srcObject = localStream.current;

        // Apply mirroring unless bypassed
        if (!isBackCamera.current) {
          localVideoRef.current.style.transform = "scaleX(-1)";
        } else {
          localVideoRef.current.style.transform = ""; // Reset transform if bypassing
        }

        // Mark the video as having the local stream
        isLocalVideo.current = true;
      }

      if (!peerConnection) {
        console.warn("No peerConnection found.");
        return;
      }

      console.log("Updating peer connection with new tracks");

      // Get the video track from the new stream
      const newVideoTrack = localStream.current.getVideoTracks()[0];

      // Find the corresponding sender for the video track in the peer connection
      const senders = peerConnection.current.getSenders();
      const videoSender = senders.find(
        (sender) => sender.track && sender.track.kind === "video"
      );

      // Replace the video track with the new track if a sender is found
      if (videoSender) {
        console.log("Replacing video track with new one");
        await videoSender.replaceTrack(newVideoTrack);
      } else {
        // If no sender found, add the track as a new sender
        console.log("No video sender found, adding new track");
        localStream.current.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, localStream.current!);
        });
      }

      // Ensure the remote stream is updated in the video element
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          remoteVideoRef.current.style.transform = "scaleX(-1)";
        }
      };
    } catch (error) {
      console.error("WebRTC setup failed", error);
    }
  };

  useEffect(() => {
    setupCamRef.current(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto pt-20 h-screen">
      <div className="relative h-[calc(100%-.4rem)] rounded-[2rem] bg-black/30 border border-white/10 backdrop-blur-xl flex md:flex-row flex-col overflow-hidden">
        {/* Left Video (Stranger) */}
        <motion.div
          className="relative md:w-1/2 md:h-full h-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <video
            autoPlay
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <Profile username={peers[1].username} peer />
        </motion.div>

        {/* Animated Separator */}
        <motion.div
          className="w-full md:w-[2px] h-[2px] md:h-full relative overflow-hidden"
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
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Video (You) */}
        <motion.div
          className="relative md:w-1/2 md:h-full h-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <video
            autoPlay
            muted
            ref={localVideoRef}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <Profile username="You" peer={false} />
        </motion.div>

        {/* Chat Toggle Button */}
        <ButtonUser />

        {/* Floating Chat */}
        <Chat />

        {/* Bottom Controls */}
        <Buttons remoteVideoRef={remoteVideoRef} />
      </div>
    </div>
  );
}
