"use client";
import { useContext, useState, createContext, useRef, RefObject } from "react";

export interface ChatType {
  name: string;
  message: string;
}

interface SessionContextType {
  chat: ChatType[];
  setChat: React.Dispatch<React.SetStateAction<ChatType[]>>;
  roomID: RefObject<string>;
}

export const SessionContext = createContext({} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chat, setChat] = useState<ChatType[]>([]);
  const roomID = useRef<string>("");

  return (
    <SessionContext.Provider value={{ chat, setChat, roomID }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
