import { Toaster } from "sonner";
import { ProtocolContextProvider } from "../../../context/ProtocolContext";
import { SessionContextProvider } from "../../../context/SessionContext";

export default function TalkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster
        theme="dark"
        position="top-center"
        duration={1600}
        expand={false}
      />
      <SessionContextProvider>
        <ProtocolContextProvider>{children}</ProtocolContextProvider>
      </SessionContextProvider>
    </>
  );
}
