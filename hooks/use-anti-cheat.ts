"use client";

import { useEffect, useRef } from "react";

export function useAntiCheat(enabled: boolean) {
  const warningCountRef = useRef(0);
  const MAX_WARNINGS = 3;

  useEffect(() => {
    if (!enabled) return;
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection and copying
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for dev tools, copy, paste, print
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J - Dev tools
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.shiftKey && e.key === "J")
      ) {
        e.preventDefault();
        showAntiCheatWarning("Developer tools are disabled");
        return false;
      }

      // Ctrl+C (Copy)
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        return false;
      }

      // Ctrl+V (Paste)
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        return false;
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
      }
    };

    // Handle window blur (tab switch)
    const handleWindowBlur = () => {
      warningCountRef.current++;
      if (warningCountRef.current >= MAX_WARNINGS) {
        showAntiCheatWarning(
          "You have been flagged for multiple suspicious activities. Please focus on the exam."
        );
      } else {
        showAntiCheatWarning(
          `Warning: Do not switch tabs during the exam (${warningCountRef.current}/${MAX_WARNINGS})`
        );
      }
    };

    // Prevent zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Prevent drag and drop
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("dragover", handleDragOver);

    // Disable right-click on all elements
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  const showAntiCheatWarning = (message: string) => {
    console.warn("[ANTI-CHEAT]", message);
    // You can add toast notifications here if needed
  };
}
