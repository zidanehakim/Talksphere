import {
  useProtocolContext,
  configuration,
} from "../../context/ProtocolContext";
import { useSessionContext } from "../../context/SessionContext";

export default function Button() {
  const {
    socket,
    setupWebRTC,
    peerConnection,
    connected,
    setConnected,
    setupCamRef,
  } = useProtocolContext();
  const { setChat, roomID } = useSessionContext();

  function handleMatch(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Matched");
    handleClose();
    setupCamRef.current();
    if (!socket.current) {
      console.log("Connecting to WebSocket server");
      setupWebRTC(false);
    } else {
      console.log("Did i clicked here?");
      setTimeout(() => {
        setupWebRTC(true);
      }, 1000);
    }
  }

  function handleStop(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Stopped");
    handleClose();
  }

  function handleClose() {
    if (connected) {
      console.log("Closing connection Instantly");
      socket.current!.send(
        JSON.stringify({ type: "close", roomID: roomID.current })
      );
      setChat(() => []);
      setConnected(false);
      roomID.current = "";
    }

    if (peerConnection) {
      peerConnection.current.close();
    }
    peerConnection.current = new RTCPeerConnection(configuration);
  }
  return (
    <div className="m-auto w-fit h-fit">
      <button className="bg-green-500 px-2 py-2 border" onClick={handleMatch}>
        Match
      </button>
      <button className="bg-red-500 px-2 py-2 border" onClick={handleStop}>
        Stop
      </button>
    </div>
  );
}
