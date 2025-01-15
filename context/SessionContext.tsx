"use client";
import { useContext, useState, createContext, useRef, RefObject } from "react";

export interface ChatType {
  name: string;
  message: string;
}

export interface PeerType {
  username: string;
  preference: string;
  score?: string;
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
  online: number;
  setOnline: React.Dispatch<React.SetStateAction<number>>;
  isMobile: RefObject<boolean>;
}

export const SessionContext = createContext({} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chat, setChat] = useState<ChatType[]>([]);
  const [isMatchClicked, setIsMatchClicked] = useState(false);
  const peerID = useRef<string>("");
  const isBackCamera = useRef<boolean>(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(true);
  const [online, setOnline] = useState(0);

  const [peers, setPeers] = useState<PeerType[]>([
    { username: "", preference: "" },
    { username: "", preference: "" },
  ]);
  const minScore = useRef<number>(0.5);
  const matchBest = useRef<NodeJS.Timeout>(null);

  const mobileDevices =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobile = useRef<boolean>(
    mobileDevices.test(navigator.userAgent.toLowerCase())
  );

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
        online,
        setOnline,
        isMobile,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
