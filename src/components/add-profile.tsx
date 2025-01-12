import { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useSessionContext } from "../../context/SessionContext";

export default function AddProfile() {
  const { peers, setPeers, isEditProfileOpen, setIsEditProfileOpen, minScore } =
    useSessionContext();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const preferenceInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [minScoreValue, setMinScoreValue] = useState(
    minScore.current === 0.1
      ? "tolerant"
      : minScore.current === 0.5
      ? "normal"
      : "strict"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      usernameInputRef.current &&
      preferenceInputRef.current &&
      minScoreValue
    ) {
      setPeers(() => [
        {
          username: usernameInputRef.current!.value,
          preference: preferenceInputRef.current!.value,
        },
        { username: "", preference: "" },
      ]);
      if (minScoreValue === "tolerant") {
        minScore.current = 0.1;
      } else if (minScoreValue === "normal") {
        minScore.current = 0.5;
      } else {
        minScore.current = 0.9;
      }
    }
    setIsEditProfileOpen(false);
  };

  return (
    <>
      <AlertDialog open={isEditProfileOpen}>
        <AlertDialogContent className="max-w-[23rem] sm:max-w-sm text-gray-100 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit profile</AlertDialogTitle>
            <AlertDialogDescription className="font-normal">
              Add to your profile here. Click save when you are done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 py-1 pb-2 text-xs"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                defaultValue={peers[0].username}
                ref={usernameInputRef}
                className="col-span-3 bg-gray-950 border-gray-600 font-normal"
                autoFocus
                minLength={3}
                maxLength={20}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="preference" className="text-right">
                Preference
              </Label>
              <Textarea
                id="preference"
                name="preference"
                placeholder="Try mentioning your hobbies, interests, etc."
                defaultValue={peers[0].preference}
                ref={preferenceInputRef}
                className="col-span-3 bg-gray-950 border-gray-600 font-normal resize-none"
                minLength={3}
                maxLength={100}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minscore" className="text-right">
                Min Score
              </Label>
              <ToggleGroup
                id="minscore"
                type="single"
                value={minScoreValue}
                className="col-span-3 bg-gray-950 border-gray-600 font-normal"
                onValueChange={(value) => {
                  if (value === "") return;
                  setMinScoreValue(value);
                }}
              >
                <ToggleGroupItem value="tolerant" className="py-6">
                  <div className="flex flex-col items-center justify-center">
                    <span>Tolerant</span>
                    <span className="text-gray-400">🥳10%</span>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value="normal" className="py-6">
                  <div className="flex flex-col items-center justify-center">
                    <span>Normal</span>
                    <span className="text-gray-400">🤩50%</span>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value="strict" className="py-6">
                  <div className="flex flex-col items-center justify-center">
                    <span>Strict</span>
                    <span className="text-gray-400">😎90%</span>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <AlertDialogFooter>
              <Button
                type="submit"
                className="bg-gray-100 hover:bg-gray-300 text-gray-950"
              >
                Save profile
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
