import {
  useProtocolContext,
  configuration,
  ConnectionState,
} from "../../context/ProtocolContext";
import { useSessionContext } from "../../context/SessionContext";
import { useState } from "react";

export default function Button() {
  const {
    socket,
    setupWebRTC,
    peerConnection,
    setupCamRef,
    state,
    dispatch,
    isWSConnected,
  } = useProtocolContext();
  const { setChat, roomID } = useSessionContext();

  const [isMatchClicked, setIsMatchClicked] = useState(false);

  function handleMatch(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Matched");
    setIsMatchClicked(true);

    handleClose();
    socket.current!.send(
      JSON.stringify({
        type: "queue",
        preference: "random",
      })
    );
    setupCamRef.current();
    setupWebRTC();
  }

  function handleStop(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Stopped");

    if (state !== ConnectionState.Connected) {
      socket.current!.send(
        JSON.stringify({
          type: "deque",
        })
      );
    }
    handleClose();
    setIsMatchClicked(false);
  }

  function handleClose() {
    if (state === ConnectionState.Connected) {
      console.log("Closing connection Instantly");
      socket.current!.send(
        JSON.stringify({ type: "close", roomID: roomID.current })
      );
      setChat(() => []);
      dispatch({ type: ConnectionState.Closed });
      roomID.current = "";
    }

    if (peerConnection) {
      peerConnection.current.close();
    }
    peerConnection.current = new RTCPeerConnection(configuration);
  }
  return (
    <div className="w-fit h-fit text-xl absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <button
        className="bg-green-500 hover:bg-green-700 disabled:bg-gray-500 disabled:hover:bg-gray-500 px-2 py-2 border transition"
        onClick={handleMatch}
        disabled={
          (isMatchClicked || !isWSConnected) &&
          state !== ConnectionState.Connected
        }
      >
        Match
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 disabled:bg-gray-500 disabled:hover:bg-gray-500 px-2 py-2 border transition"
        onClick={handleStop}
        disabled={
          (!isMatchClicked || !isWSConnected) &&
          state !== ConnectionState.Connected
        }
      >
        Stop
      </button>
    </div>
  );
}
