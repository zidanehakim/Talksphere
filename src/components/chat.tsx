import { useRef } from "react";

import { useProtocolContext } from "../../context/ProtocolContext";
import { useSessionContext, ChatType } from "../../context/SessionContext";

export default function Chat() {
  const { socket, connected } = useProtocolContext();
  const { chat, setChat, roomID } = useSessionContext();

  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value.length > 0) {
      const newMessage: ChatType = {
        name: "User",
        message: inputRef.current.value,
      };
      setChat((prevChat) => [...prevChat, newMessage]);
      inputRef.current.value = "";

      socket!.send(
        JSON.stringify({
          type: "chat",
          message: newMessage.message,
          roomID: roomID.current,
        })
      );
    }
  }

  return (
    <div className="bg-white border border-black w-full h-full flex">
      <div className="bg-neutral-300 h-full w-full max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] m-auto shadow-sm shadow-neutral-200 grid grid-rows-[90%_10%]">
        <div className=" w-full h-full bg-red-100">
          {chat.map((message, index) => {
            return message.name == "User" ? (
              <div
                key={index}
                className="bg-blue-900 w-full h-[2em] border-b border-black flex items-center px-3"
              >
                <p>
                  {message.name}: {message.message}
                </p>
              </div>
            ) : (
              <div
                key={index}
                className="bg-red-800 w-full h-[2em] border-b border-black flex items-center px-3 justify-end"
              >
                <p>
                  {message.name}: {message.message}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full h-full flex">
          <form
            onSubmit={sendMessage}
            className="w-full h-full flex text-black"
          >
            <input
              ref={inputRef}
              type="text"
              className="w-full h-full border border-black"
              maxLength={25}
            />
            <button
              type="submit"
              className="w-[4em] h-full bg-blue-900 text-white"
              disabled={!connected}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
