"use client";
import { useContext, useState, createContext, useRef, RefObject } from "react";

export interface ChatType {
  name: string;
  message: string;
}

export interface PeerType {
  username: string;
  preference: string;
}

interface SessionContextType {
  chat: ChatType[];
  setChat: React.Dispatch<React.SetStateAction<ChatType[]>>;
  peerID: RefObject<string>;
  isMatchClicked: boolean;
  setIsMatchClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isBackCamera: RefObject<boolean>;
  isChatBoxOpen: boolean;
  setIsChatBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  peers: PeerType[];
  setPeers: React.Dispatch<React.SetStateAction<PeerType[]>>;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  minScore: RefObject<number>;
  matchBest: RefObject<NodeJS.Timeout | null>;
}

export const SessionContext = createContext({} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chat, setChat] = useState<ChatType[]>([
    { name: "User", message: "Hello!" },
    { name: "User", message: "How are you?" },
    { name: "User", message: "I'm good!" },
    { name: "User", message: "How about you?" },
    { name: "User", message: "I'm good too!" },
    { name: "User", message: "Nice to meet you!" },
    { name: "User", message: "Nice to meet you too!" },
  ]);
  const [isMatchClicked, setIsMatchClicked] = useState(false);
  const peerID = useRef<string>("");
  const isBackCamera = useRef<boolean>(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(true);

  const [peers, setPeers] = useState<PeerType[]>([
    { username: "", preference: "" },
    { username: "", preference: "" },
  ]);
  const minScore = useRef<number>(0.5);
  const matchBest = useRef<NodeJS.Timeout>(null);

  return (
    <SessionContext.Provider
      value={{
        chat,
        setChat,
        peerID,
        isMatchClicked,
        setIsMatchClicked,
        isBackCamera,
        isChatBoxOpen,
        setIsChatBoxOpen,
        peers,
        setPeers,
        isEditProfileOpen,
        setIsEditProfileOpen,
        minScore,
        matchBest,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
