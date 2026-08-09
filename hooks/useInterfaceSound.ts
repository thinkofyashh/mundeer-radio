"use client";

import { useCallback, useRef } from "react";

export function useInterfaceSound(enabled: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  return useCallback((kind: "click" | "static" | "device") => {
    if (!enabled || typeof window === "undefined") return;
    const context = contextRef.current ?? new AudioContext();
    contextRef.current = context;
    const now = context.currentTime;
    if (kind === "static") {
      const buffer = context.createBuffer(1, context.sampleRate * 0.18, context.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < channel.length; i += 1) channel[i] = (Math.random() * 2 - 1) * (1 - i / channel.length);
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      gain.gain.value = 0.035;
      source.connect(gain).connect(context.destination);
      source.start(now);
      return;
    }
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = kind === "device" ? "sine" : "square";
    oscillator.frequency.setValueAtTime(kind === "device" ? 740 : 120, now);
    if (kind === "device") oscillator.frequency.exponentialRampToValueAtTime(1040, now + 0.08);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.11);
  }, [enabled]);
}
