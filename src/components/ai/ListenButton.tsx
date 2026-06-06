"use client";

import { useState } from "react";

interface ListenButtonProps {
  text: string;
  durationMinutes: number;
  // TODO: sambungkan ke TTS API — gunakan text untuk menghasilkan audio stream
  onPlay?: () => void;
  onStop?: () => void;
  variant?: "compact" | "full";
}

export default function ListenButton({
  text,
  durationMinutes,
  onPlay,
  onStop,
  variant = "compact",
}: ListenButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  function handleToggle() {
    if (isPlaying) {
      setIsPlaying(false);
      onStop?.();
      // TODO: hentikan TTS audio stream
      console.log("[TTS] Stop audio");
    } else {
      setIsPlaying(true);
      onPlay?.();
      // TODO: mulai TTS audio stream dari text prop
      console.log("[TTS] Play:", text.substring(0, 60) + "…");
    }
  }

  if (variant === "full") {
    return (
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? "Hentikan audio" : "Dengarkan artikel ini"}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 min-h-[44px]"
      >
        {isPlaying ? (
          <>
            <StopIcon />
            <span>Berhenti</span>
          </>
        ) : (
          <>
            <PlayIcon />
            <span>Dengarkan · {durationMinutes} mnt</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isPlaying ? "Hentikan audio" : `Dengarkan artikel, ${durationMinutes} menit`}
      className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 min-h-[44px]"
    >
      {isPlaying ? <StopIcon size={14} /> : <PlayIcon size={14} />}
      <span>Bisa didengar · {durationMinutes} mnt</span>
    </button>
  );
}

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
    </svg>
  );
}

function StopIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="10" height="10" rx="1" />
    </svg>
  );
}
