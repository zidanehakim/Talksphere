import {
  useProtocolContext,
  configuration,
} from "../../context/ProtocolContext";
import { useSessionContext } from "../../context/SessionContext";

export default function Button() {
  const { socket, setSocket, peerConnection, connected, setConnected } =
    useProtocolContext();
  const { setChat, roomID } = useSessionContext();

  function handleMatch(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Matched");
    handleClose();
    setSocket(new WebSocket("wss://fe3b-140-112-243-184.ngrok-free.app/ws"));
  }

  function handleStop(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Stopped");
    handleClose();
    setSocket(null);
  }

  function handleClose() {
    setChat(() => []);
    if (connected) {
      socket!.send(JSON.stringify({ type: "close", roomID: roomID.current }));
      setConnected(false);
    }

    if (peerConnection) {
      peerConnection.current.close();
    }
    if (socket) {
      socket.close();
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
