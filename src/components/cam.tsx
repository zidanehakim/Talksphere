import { useRef, useEffect } from "react";
import { useProtocolContext } from "../../context/ProtocolContext";

import Button from "./button";

export default function Cam() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { peerConnection, socket } = useProtocolContext();

  const isLocalVideo = useRef<boolean>(false);

  useEffect(() => {
    // Handling video references
    async function setupCam() {
      try {
        console.log("once");
        // Get local media stream
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: 650,
            height: 530,
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
    }

    setupCam();
  }, [peerConnection, socket]);

  return (
    <div className="bg-white border border-black flex" id="facecam">
      {/* Remote Video Container */}
      <div className="m-auto w-[650px] h-[530px] bg-black flex">
        <video
          autoPlay
          ref={remoteVideoRef}
          className="m-auto w-full h-full object-contain"
        ></video>
      </div>

      {/* Local Video Container */}
      <div className="m-auto w-[650px] h-[530px] bg-black flex flex-col">
        <video
          muted
          autoPlay
          ref={localVideoRef}
          className="m-auto w-full h-full object-contain"
        ></video>
        <Button />
      </div>
    </div>
  );
}
