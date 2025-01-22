import React, { useRef, useEffect } from "react";
import {
  useProtocolContext,
  ConnectionState,
} from "../../../context/ProtocolContext";
import { useSessionContext } from "../../../context/SessionContext";

import Profile from "./profile";
import ButtonUser from "./button-user";

import { Skeleton } from "@/components/ui/skeleton";

import Buttons from "./buttons";
import Drawers from "./drawers";
import Chat from "./chat";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const MemoizedProfile = React.memo(Profile);
const MemoizedButtons = React.memo(Buttons);
const MemoizedDrawers = React.memo(Drawers);

export default function Cam() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const { peerConnection, setupCamRef, state, localStream } =
    useProtocolContext();
  const { isMatchClicked, isBackCamera, peers, isMobile } = useSessionContext();

  const isLocalVideo = useRef<boolean>(false);
  const audioContext = useRef<AudioContext>(null);
  setupCamRef.current = async (bypass: boolean) => {
    try {
      console.log("once");

      // Get the new local media stream (front or back camera)
      localStream.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true, // Reduce background noise
          echoCancellation: true, // Prevent audio feedback
          autoGainControl: true, // Maintain consistent volume
          channelCount: 2, // Stereo sound for a richer audio experience
          sampleRate: 48000, // High-quality audio (48 kHz)
        },
        video: {
          facingMode: isBackCamera.current ? "environment" : "user",
          frameRate: { ideal: 30, max: 60 }, // Smooth video at 30-60 FPS
        },
      });

      if (!audioContext.current) {
        audioContext.current = new window.AudioContext();
        const mediaStreamSource = audioContext.current.createMediaStreamSource(
          localStream.current
        );

        const biquadFilter = audioContext.current.createBiquadFilter();
        biquadFilter.type = "highpass";
        biquadFilter.frequency.setValueAtTime(
          1000,
          audioContext.current.currentTime
        );

        const gainNode = audioContext.current.createGain();
        gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);

        // Create a MediaStreamDestination
        const destination = audioContext.current.createMediaStreamDestination();

        // Connect audio nodes to the destination
        mediaStreamSource.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(destination);

        // Replace the audio track in the local stream with the processed audio track
        const processedAudioTrack = destination.stream.getAudioTracks()[0];
        const newStream = new MediaStream([
          processedAudioTrack,
          ...localStream.current.getVideoTracks(),
        ]);
        localStream.current = newStream;
      }

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
      const newAudioTrack = localStream.current.getAudioTracks()[0];

      // Find the corresponding senders for audio and video in the peer connection
      const senders = peerConnection.current.getSenders();
      const videoSender = senders.find(
        (sender) => sender.track && sender.track.kind === "video"
      );
      const audioSender = senders.find(
        (sender) => sender.track && sender.track.kind === "audio"
      );

      // Replace the video track
      if (videoSender) {
        console.log("Replacing video track with new one");
        await videoSender.replaceTrack(newVideoTrack);
      } else {
        console.log("No video sender found, adding new video track");
        peerConnection.current.addTrack(newVideoTrack, localStream.current);
      }

      // Replace the audio track
      if (audioSender) {
        console.log("Replacing audio track with processed one");
        await audioSender.replaceTrack(newAudioTrack);
      } else {
        console.log("No audio sender found, adding new audio track");
        peerConnection.current.addTrack(newAudioTrack, localStream.current);
      }

      if (!peerConnection.current.ontrack && !bypass) {
        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            remoteVideoRef.current.style.transform = "scaleX(-1)";
          }
        };
      }
    } catch (error) {
      console.error("WebRTC setup failed", error);
    }
  };

  useEffect(() => {
    setupCamRef.current(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" w-full h-full m-auto sm:py-1 sm:px-4">
      <div className="relative h-full w-full sm:rounded-[2rem] bg-black/30 border border-white/10 backdrop-blur-xl flex lg:flex-row flex-col overflow-hidden">
        {/* Left Video (Stranger) */}
        <div
          key="peer"
          className="relative lg:w-1/2 lg:h-full h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex"
        >
          <video
            autoPlay
            ref={remoteVideoRef}
            className="absolute w-full h-full object-cover"
          />

          {state === ConnectionState.Connected && (
            <MemoizedProfile
              username={peers[1].username}
              peer
              score={peers[1].score}
            />
          )}

          <div
            className={`transition-all transform m-auto ${
              isMatchClicked ? "opacity-80" : "opacity-70"
            } ${
              isMatchClicked
                ? "w-[50vw] h-[calc(50vw * 0.5)] sm:w-[30vw] sm:h-[calc(30vw * 0.5)] opacity-80"
                : "w-[60vw] h-[calc(60vw * 0.78)] sm:w-[40vw] sm:h-[calc(40vw * 0.78)] opacity-70"
            }`}
            hidden={state === ConnectionState.Connected}
          >
            <DotLottieReact
              src={isMatchClicked ? "/find.lottie" : "/bubble.lottie"}
              loop
              autoplay
              hidden={state === ConnectionState.Connected}
            />
          </div>

          {isMatchClicked && state !== ConnectionState.Connected && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 flex-wrap">
              <Skeleton className="bg-gradient-to-r from-blue-600 to-cyan-400 px-10 py-4 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-500 ease-in-out" />
              <Skeleton className="bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-full text-xs flex items-center gap-1 transition-all duration-500 ease-in-out"></Skeleton>
            </div>
          )}
        </div>

        {/* Animated Separator */}
        <div className="w-full lg:w-[2px] h-[2px] lg:h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 animate-gradient-y" />
        </div>

        {/* Right Video (You) */}
        <div
          key="user"
          className="relative lg:w-1/2 lg:h-full h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        >
          <video
            autoPlay
            muted
            ref={localVideoRef}
            className="absolute w-full h-full object-cover"
          />

          <MemoizedProfile username="You" peer={false} />
        </div>

        {/* Button User Toggle Button */}
        <ButtonUser />

        {/* Chat */}
        {state === ConnectionState.Connected && <Chat />}

        {/* Bottom Controls */}
        {isMobile.current && window.innerWidth < 768 ? (
          <MemoizedDrawers remoteVideoRef={remoteVideoRef} />
        ) : (
          <MemoizedButtons remoteVideoRef={remoteVideoRef} />
        )}
      </div>
    </div>
  );
}
