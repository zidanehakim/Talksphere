"use client";
import React, {
  useState,
  useEffect,
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
  socket: WebSocket | null;
  setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  connected: boolean;
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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { chat, setChat, roomID } = useSessionContext();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    console.log(socket);

    const setupWebRTC = () => {
      socket.onopen = () => {
        console.log("Connected to WebSocket server");
        sendMatching();
      };

      socket.onmessage = (message) => {
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
            handleClose();
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
        socket!.send(
          JSON.stringify({
            type: "offer",
            offer: peerConnection.current.localDescription,
            roomID: roomID.current,
          })
        );
        console.log("Offer sent");
      }

      async function sendMatching() {
        socket!.send(
          JSON.stringify({
            type: "matching",
            preference: "random",
          })
        );
      }

      async function sendQueue() {
        socket!.send(
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
        socket!.send(
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

        if (peerConnection) {
          peerConnection.current.close();
        }
        if (socket) {
          socket.close();
        }
        peerConnection.current = new RTCPeerConnection(configuration);
        setSocket(
          new WebSocket("wss://5e87-140-112-243-184.ngrok-free.app/ws")
        );
      }

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("New ICE candidate:", event.candidate);
          console.log(
            "ICE gathering state:",
            peerConnection.current.iceConnectionState
          );
          socket.send(
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
          handleClose(); // Mark as disconnected when the peer connection is lost
        }
      };

      console.log(
        "ICE gathering state:",
        peerConnection.current.iceConnectionState
      );
    };

    setupWebRTC();

    return () => {
      if (socket) {
        // console.log("Closing WebSocket...");
        // socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerConnection, socket]); // Runs when peerConnection or socket changes

  return (
    <ProtocolContext.Provider
      value={{ peerConnection, socket, setSocket, connected, setConnected }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = () => useContext(ProtocolContext);
