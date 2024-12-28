"use client";
import React, {
  useState,
  useReducer,
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

// Define an enum for state
export enum ConnectionState {
  New = "new",
  Connecting = "connecting",
  Connected = "connected",
  Disconnected = "disconnected",
  Failed = "failed",
  Closed = "closed",
}

interface Action {
  type: ConnectionState;
}

function connectionReducer(
  state: ConnectionState,
  action: Action
): ConnectionState {
  switch (action.type) {
    case ConnectionState.New:
    case ConnectionState.Connecting:
    case ConnectionState.Connected:
    case ConnectionState.Disconnected:
    case ConnectionState.Failed:
    case ConnectionState.Closed:
      return action.type;
    default:
      throw new Error(`Unhandled state: ${action.type}`);
  }
}

interface ProtocolContextType {
  peerConnection: RefObject<RTCPeerConnection>;
  socket: RefObject<WebSocket | null>;
  state: ConnectionState;
  dispatch: React.ActionDispatch<[action: Action]>;
  setupWebRTC: () => void;
  setupCamRef: RefObject<() => void>;
  isWSConnected: boolean;
}

const ProtocolContext = createContext<ProtocolContextType>(
  {} as ProtocolContextType
);

const url = "wss://f5f7-140-112-243-184.ngrok-free.app/ws";

export const ProtocolContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const peerConnection = useRef<RTCPeerConnection>(
    new RTCPeerConnection(configuration)
  );
  const socket = useRef<WebSocket | null>(null);
  const { chat, setChat, roomID } = useSessionContext();
  const [state, dispatch] = useReducer(
    connectionReducer,
    ConnectionState.Disconnected
  );
  const [isWSConnected, setIsWsConnected] = useState<boolean>(false);
  const setupCamRef = useRef<() => void>(() => {});

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current!.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsWsConnected(true);
    };

    // Heartbeat to keep the connection alive, around 5-6 minutes
    const interval = setInterval(() => {
      socket.current!.send(JSON.stringify({ type: "ping" }));
    }, 1000 * 60 * 5);

    socket.current!.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setIsWsConnected(false);
    };

    return () => {
      console.log("Cleanup");
      clearInterval(interval);
      socket.current!.close();
    };
  }, []);

  const setupWebRTC = () => {
    socket.current!.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case "room":
          setTimeout(() => {
            sendOffer(data.roomID);
          }, 1000);
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
          dispatch({ type: ConnectionState.Disconnected });
          handleClose();
          socket.current!.send(JSON.stringify({ type: "reset-roomid" }));
          socket.current!.send(
            JSON.stringify({
              type: "queue",
              preference: "random",
            })
          );
          setupCamRef.current();
          setupWebRTC();
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
      const tempState = peerConnection.current
        .connectionState as ConnectionState;
      dispatch({
        type: tempState,
      });

      if (
        tempState === "disconnected" ||
        tempState === "failed" ||
        tempState === "closed"
      ) {
        handleClose(); // Mark as disconnected when the peer connection is lost
        socket.current!.send(JSON.stringify({ type: "reset-roomid" }));
        socket.current!.send(
          JSON.stringify({
            type: "queue",
            preference: "random",
          })
        );
        setupCamRef.current(); // Reinitialize the camera
        setupWebRTC(); // Reinitialize the WebRTC connection
      }
    };

    console.log(
      "ICE gathering state:",
      peerConnection.current.iceConnectionState
    );

    sendMatching();
  };

  return (
    <ProtocolContext.Provider
      value={{
        peerConnection,
        socket,
        setupWebRTC,
        setupCamRef,
        state,
        dispatch,
        isWSConnected,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = () => useContext(ProtocolContext);
