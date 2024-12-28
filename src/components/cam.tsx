import { useRef, useEffect } from "react";
import { useProtocolContext } from "../../context/ProtocolContext";
import Button from "./button";

export default function Cam() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { peerConnection, setupCamRef } = useProtocolContext();

  const isLocalVideo = useRef<boolean>(false);

  setupCamRef.current = async function setupCam() {
    try {
      console.log("once");
      // Get local media stream
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          frameRate: { ideal: 30, max: 60 },
        },
        audio: true,
      });

      if (localVideoRef.current && !isLocalVideo.current) {
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.style.transform = "scaleX(-1)";
        isLocalVideo.current = true;
      }

      if (!peerConnection) {
        return;
      }
      console.log("add peer connection track");

      // Add local tracks to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });

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
    setupCamRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-auto w-full h-full grid grid-cols-[1fr_1fr] grid-rows-1">
      <div className="w-full-full">
        <video
          muted
          autoPlay
          ref={localVideoRef}
          className="w-full h-full object-cover bg-red-500"
        ></video>
      </div>
      <div className="w-full-full object-contain relative">
        <video
          autoPlay
          ref={remoteVideoRef}
          className="w-full h-full object-cover bg-green-200"
        ></video>
        <Button />
      </div>
    </div>
  );
}
