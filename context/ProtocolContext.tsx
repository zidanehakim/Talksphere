"use client";
import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useRef,
  RefObject,
} from "react";
import { useSessionContext } from "./SessionContext";

export const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // STUN server
  ],
};

interface ProtocolContextType {
  peerConnection: RefObject<RTCPeerConnection>;
  socket: RefObject<WebSocket>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  connected: boolean;
  setupWebRTC: (isWebsocketOpen: boolean) => void;
  setupCamRef: RefObject<() => void>;
}

const ProtocolContext = createContext<ProtocolContextType>(
  {} as ProtocolContextType
);

export const ProtocolContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const peerConnection = useRef<RTCPeerConnection>(
    new RTCPeerConnection(configuration)
  );
  const socket = useRef<WebSocket>(
    new WebSocket("wss://4378-140-112-243-184.ngrok-free.app/ws")
  );
  const { chat, setChat, roomID } = useSessionContext();
  const [connected, setConnected] = useState(false);
  const setupCamRef = useRef<() => void>(() => {});

  const setupWebRTC = (isWebsocketOpen: boolean) => {
    if (!isWebsocketOpen) {
      socket.current!.onopen = () => {
        console.log("Connected to WebSocket server");
        sendMatching();
      };
    } else {
      sendMatching();
    }

    socket.current!.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case "room":
          sendOffer(data.roomID);
          break;
        case "queue":
          sendQueue();
          break;
        case "offer":
          handleOffer(data.offer, data.roomID);
          break;
        case "answer":
          handleAnswer(data.answer);
          break;
        case "ice-candidate":
          handleIceCandidate(data.candidate);
          break;
        case "close":
          socket.current!.send(JSON.stringify({ type: "reset-roomid" }));
          handleClose();
          setupCamRef.current();
          setupWebRTC(true);
          break;
        case "chat":
          handleChat(data.message);
          break;
        default:
          break;
      }
    };

    async function sendOffer(roomId: string) {
      roomID.current = roomId;

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.current!.send(
        JSON.stringify({
          type: "offer",
          offer: peerConnection.current.localDescription,
          roomID: roomID.current,
        })
      );
      console.log("Offer sent");
    }

    async function sendMatching() {
      socket.current!.send(
        JSON.stringify({
          type: "matching",
          preference: "random",
        })
      );
    }

    async function sendQueue() {
      socket.current!.send(
        JSON.stringify({
          type: "queue",
          preference: "random",
        })
      );
    }

    async function handleOffer(
      offer: RTCSessionDescriptionInit,
      roomId: string
    ) {
      roomID.current = roomId;

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current!.send(
        JSON.stringify({
          type: "answer",
          answer: peerConnection.current.localDescription,
          roomID: roomID.current,
        })
      );
      console.log("Offer received, answering");
    }

    async function handleAnswer(answer: RTCSessionDescriptionInit) {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      console.log("Answer received, setting remote description");
    }

    async function handleIceCandidate(candidate: RTCIceCandidate) {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
      console.log("ICE candidate received, adding to peer connection");
    }

    function handleChat(message: string) {
      console.log(chat);
      setChat((prevChat) => [...prevChat, { name: "Peer", message }]);
      console.log("Chat message received:", message);
    }

    function handleClose() {
      setChat(() => []);
      setConnected(false);
      roomID.current = "";

      if (peerConnection.current) {
        peerConnection.current.close();
      }
      peerConnection.current = new RTCPeerConnection(configuration);
    }

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
        console.log(
          "ICE gathering state:",
          peerConnection.current.iceConnectionState
        );
        socket.current!.send(
          JSON.stringify({
            type: "ice-candidate",
            candidate: event.candidate,
            roomID: roomID.current,
          })
        );
      } else {
        console.log("ICE candidate gathering is complete.");
      }
    };

    // Listen for signaling state changes or connection state changes
    peerConnection.current.onconnectionstatechange = () => {
      const state = peerConnection.current?.connectionState;
      if (state === "connected") {
        setConnected(true); // Mark as connected when the peer connection is fully established
      } else if (
        state === "disconnected" ||
        state === "failed" ||
        state === "closed"
      ) {
        socket.current!.send(JSON.stringify({ type: "reset-roomid" }));
        handleClose(); // Mark as disconnected when the peer connection is lost
        setupCamRef.current(); // Reinitialize the camera
        setupWebRTC(true); // Reinitialize the WebRTC connection
      }
    };

    console.log(
      "ICE gathering state:",
      peerConnection.current.iceConnectionState
    );
  };

  return (
    <ProtocolContext.Provider
      value={{
        peerConnection,
        socket,
        setupWebRTC,
        connected,
        setConnected,
        setupCamRef,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = () => useContext(ProtocolContext);
