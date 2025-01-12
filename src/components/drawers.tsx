import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  useProtocolContext,
  ConnectionState,
} from "../../context/ProtocolContext";

import Chat from "./chat";
import Button from "./buttons";

export default function Drawers() {
  const { state } = useProtocolContext();

  return (
    <Drawer open>
      <DrawerTrigger
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <div className="w-fit h-fit hover:bg-gray-900 px-2 py-1 sm:px-4 sm:py-3 rounded-sm sm:rounded-lg mx-2">
          asd
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-4 shadow-lg shadow-purple-500/20 border border-gray-700/50 text-gray-200">
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Start meeting your peer</DrawerDescription>
        </DrawerHeader>
        {state === ConnectionState.Connected && <Chat />}

        <DrawerFooter>
          <div className="mt-4 justify-center gap-4 flex">
            <Button />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
