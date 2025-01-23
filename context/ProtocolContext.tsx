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

import { toast } from "sonner";

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
  setupCamRef: RefObject<(bypass: boolean) => void>;
  isWSConnected: boolean;
  localStream: RefObject<MediaStream | null>;
}

const ProtocolContext = createContext<ProtocolContextType>(
  {} as ProtocolContextType
);

const url = `wss://${process.env.NEXT_PUBLIC_API_URL}/ws`;

export const ProtocolContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const peerConnection = useRef<RTCPeerConnection>(
    new RTCPeerConnection(configuration)
  );
  const socket = useRef<WebSocket | null>(null);
  const {
    chat,
    setChat,
    peerID,
    peers,
    setPeers,
    minScore,
    matchBest,
    setOnline,
    online,
  } = useSessionContext();
  const [state, dispatch] = useReducer(
    connectionReducer,
    ConnectionState.Disconnected
  );
  const [isWSConnected, setIsWsConnected] = useState<boolean>(false);
  const setupCamRef = useRef<(bypass: boolean) => void>(() => {});
  const localStream = useRef<MediaStream | null>(null);

  async function sendOffer(
    username: string,
    preference: string,
    cID: string,
    pID: string,
    score: number
  ) {
    peerID.current = pID;

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.current!.send(
      JSON.stringify({
        type: "offer",
        offer: peerConnection.current.localDescription,
        connID: cID,
        peerID: pID,
        peerUsername: username,
        peerPreference: preference,
        score: score,
      })
    );
    console.log("Offer sent");
  }

  async function sendMatching(
    preference: string,
    peerID: string,
    minScore: number,
    minScoreTemp: number
  ) {
    socket.current!.send(
      JSON.stringify({
        type: "matching",
        preference: preference,
        peerID: peerID,
        minScore: minScore,
        minScoreTemp: minScoreTemp,
      })
    );
  }

  async function handleOffer(offer: RTCSessionDescriptionInit, pID: string) {
    peerID.current = pID;

    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.current!.send(
      JSON.stringify({
        type: "answer",
        answer: peerConnection.current.localDescription,
        peerID: pID,
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
    setChat((prevChat) => [...prevChat, { name: peers[1].username, message }]);
    console.log("Chat message received:", message);
  }

  function handleClose() {
    if (chat && chat.length > 0) {
      setChat(() => []);
    }

    if (peerConnection.current) {
      peerConnection.current.onicecandidate = null;
      peerConnection.current.ontrack = null;
      peerConnection.current.close();
    }

    peerConnection.current = new RTCPeerConnection(configuration);

    socket.current!.send(
      JSON.stringify({
        type: "queue",
        username: peers[0].username,
        preference: peers[0].preference,
        minScore: minScore.current,
      })
    );
    setupCamRef.current(false);
    setupWebRTC();
  }

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current!.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.current!.send(JSON.stringify({ type: "ping" }));
      const interval = setInterval(() => {
        socket.current!.send(JSON.stringify({ type: "ping" }));
      }, 1000 * 10);
      setIsWsConnected(true);

      return () => clearInterval(interval);
    };

    socket.current!.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setIsWsConnected(false);
    };

    setupWSOnMessage();

    return () => {
      console.log("Cleanup");
      socket.current!.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupWSOnMessage = () => {
    socket.current!.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case "room":
          if (matchBest.current) {
            clearInterval(matchBest.current);
            matchBest.current = null;
          }
          setPeers((prevPeers) => [
            {
              username: prevPeers[0].username,
              preference: prevPeers[0].preference,
            },
            {
              username: data.peerUsername,
              preference: data.peerPreference,
              score: Number(data.score).toFixed(2),
            },
          ]);
          console.log(data.peerUsername, data.peerPreference);
          setTimeout(() => {
            sendOffer(
              peers[0].username,
              peers[0].preference,
              data.connID,
              data.peerID,
              data.score
            );
          }, 1000);
          break;
        case "offer":
          if (matchBest.current) {
            clearInterval(matchBest.current);
            matchBest.current = null;
          }
          setPeers((prevPeers) => [
            {
              username: prevPeers[0].username,
              preference: prevPeers[0].preference,
            },
            {
              username: data.peerUsername,
              preference: data.peerPreference,
              score: Number(data.score).toFixed(2),
            },
          ]);
          console.log(data.peerUsername, data.peerPreference);
          handleOffer(data.offer, data.connID);
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
          break;
        case "chat":
          handleChat(data.message);
          break;
        case "pong":
          console.log("Pong received ", data.online);
          if (online !== data.online) {
            setOnline(data.online);
          }
          break;
        default:
          break;
      }
    };
  };

  useEffect(() => {
    if (!isWSConnected) {
      return;
    }

    setupWSOnMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers, setPeers]);

  const setupWebRTC = () => {
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
            peerID: peerID.current,
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
        handleClose();
      }
    };

    console.log(
      "ICE gathering state:",
      peerConnection.current.iceConnectionState
    );

    const delay = 1500;
    const reduce = 0.1;
    let minScoreTemp = minScore.current;
    sendMatching(
      peers[0].preference,
      peerID.current,
      minScore.current,
      minScore.current
    );
    matchBest.current = setInterval(() => {
      if (minScoreTemp - reduce < 0 && minScoreTemp > 0) {
        minScoreTemp = 0;
        toast.info("Reducing min score by 10%: now at 0%");
      } else if (minScoreTemp > 0) {
        minScoreTemp = parseFloat((minScoreTemp - reduce).toFixed(2));
        toast.info(
          "Reducing min score by 10%: now at " + minScoreTemp * 100 + "%"
        );
      }
      sendMatching(
        peers[0].preference,
        peerID.current,
        minScore.current,
        minScoreTemp
      );
    }, delay);
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
        localStream,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = () => useContext(ProtocolContext);
