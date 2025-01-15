"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:shadow-lg group-[.toaster]:bg-gray-950 group-[.toaster]:text-gray-50 group-[.toaster]:border-gray-800",
          description:
            "group-[.toast]:text-gray-500 group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50 group-[.toast]:bg-gray-50 group-[.toast]:text-gray-900",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 group-[.toast]:bg-gray-800 group-[.toast]:text-gray-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
