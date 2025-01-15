import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Buttons from "./buttons";
import { Zap } from "lucide-react";
import { RefObject } from "react";

type DrawersProps = {
  remoteVideoRef: RefObject<HTMLVideoElement | null>;
};

export default function Drawers({ remoteVideoRef }: DrawersProps) {
  return (
    <Drawer>
      <DrawerTrigger
        className="absolute bottom-4 left-4 bg-black/80 border backdrop-blur-2xl rounded-full p-2 shadow-lg"
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <Zap className="w-6 h-6 text-yellow-200" />
      </DrawerTrigger>
      <DrawerContent className="p-4 shadow-lg shadow-purple-500/20 border border-gray-800 bg-black/60 backdrop-blur-sm text-gray-200">
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Start meeting your peer</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Buttons remoteVideoRef={remoteVideoRef} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
