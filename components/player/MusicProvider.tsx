"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { stations } from "@/data/stations";
import { tracksForStation, type Track } from "@/data/tracks";
import type { YouTubePlayer } from "@/lib/youtube";

type MusicContextValue = {
  currentTrack: Track;
  currentStation: (typeof stations)[number];
  isPlaying: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  playerReady: boolean;
  hasEntered: boolean;
  isTuning: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (value: number) => void;
  changeStation: (id: string) => void;
  seek: (value: number) => void;
  enter: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [stationIndex, setStationIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeState, setVolumeState] = useState(68);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isTuning, setIsTuning] = useState(false);

  const currentStation = stations[stationIndex];
  const playlist = useMemo(() => tracksForStation(currentStation.id), [currentStation.id]);
  const currentTrack = playlist[trackIndex] ?? playlist[0];

  const playerRef = useRef<YouTubePlayer | null>(null);
  const initialVideoId = useRef(currentTrack.youtubeId);
  const playlistLengthRef = useRef(playlist.length);
  const volumeRef = useRef(volumeState);
  const playingRef = useRef(isPlaying);
  const tuningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    playlistLengthRef.current = playlist.length;
    volumeRef.current = volumeState;
    playingRef.current = isPlaying;
  }, [playlist.length, volumeState, isPlaying]);

  useEffect(() => {
    let cancelled = false;
    const createPlayer = () => {
      if (cancelled || !window.YT || playerRef.current || !document.getElementById("youtube-player")) return;
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: initialVideoId.current,
        playerVars: { controls: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            setPlayerReady(true);
            playerRef.current?.setVolume(volumeRef.current);
          },
          onStateChange: (event) => {
            if (event.data === 0) setTrackIndex((index) => (index + 1) % playlistLengthRef.current);
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2) setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT?.Player) createPlayer();
    else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!playerReady || !playerRef.current) return;
    playerRef.current.loadVideoById(currentTrack.youtubeId);
    if (!playingRef.current) playerRef.current.pauseVideo();
  }, [currentTrack.id, currentTrack.youtubeId, playerReady]);

  useEffect(() => {
    if (!playerReady || !playerRef.current) return;
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPlaying, playerReady]);

  useEffect(() => {
    if (!playerReady) return;
    const interval = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrentTime(player.getCurrentTime() || 0);
      setDuration(player.getDuration() || 0);
    }, 500);
    return () => window.clearInterval(interval);
  }, [playerReady]);

  const tune = useCallback(() => {
    setIsTuning(true);
    if (tuningTimer.current) clearTimeout(tuningTimer.current);
    tuningTimer.current = setTimeout(() => setIsTuning(false), 740);
  }, []);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying((value) => !value), []);
  const nextTrack = useCallback(() => {
    tune();
    setTrackIndex((index) => (index + 1) % playlist.length);
  }, [playlist.length, tune]);
  const previousTrack = useCallback(() => {
    tune();
    setTrackIndex((index) => (index - 1 + playlist.length) % playlist.length);
  }, [playlist.length, tune]);
  const setVolume = useCallback((value: number) => {
    const safe = Math.max(0, Math.min(100, value));
    setVolumeState(safe);
    playerRef.current?.setVolume(safe);
  }, []);
  const changeStation = useCallback((id: string) => {
    const next = stations.findIndex((station) => station.id === id);
    if (next < 0) return;
    tune();
    setStationIndex(next);
    setTrackIndex(0);
  }, [tune]);
  const seek = useCallback((value: number) => {
    playerRef.current?.seekTo(value, true);
    setCurrentTime(value);
  }, []);
  const enter = useCallback(() => {
    setHasEntered(true);
    setIsPlaying(true);
    tune();
  }, [tune]);

  const value = useMemo(() => ({
    currentTrack, currentStation, isPlaying, volume: volumeState, duration, currentTime,
    playerReady, hasEntered, isTuning, play, pause, togglePlay, nextTrack, previousTrack,
    setVolume, changeStation, seek, enter,
  }), [currentTrack, currentStation, isPlaying, volumeState, duration, currentTime, playerReady,
    hasEntered, isTuning, play, pause, togglePlay, nextTrack, previousTrack, setVolume,
    changeStation, seek, enter]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used within MusicProvider");
  return value;
}
