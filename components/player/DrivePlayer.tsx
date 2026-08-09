"use client";

import { useEffect, useState } from "react";
import { tracks } from "@/data/tracks";
import { formatTime } from "@/lib/youtube";
import { useMusic } from "@/components/player/MusicProvider";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";

export function DrivePlayer() {
  const music = useMusic();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const togglePlayback = () => {
    if (!music.hasEntered) music.enter();
    else music.togglePlay();
  };

  return (
    <>
      <aside className={`song-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div><span>GLOVEBOX CASSETTES</span><b>THE OG SONGS</b><small>{tracks.length} tracks · one frequency · no skips</small></div>
          <button onClick={() => setOpen(false)} aria-label="Close song list">×</button>
        </div>
        <div className="track-list">
          {tracks.map((track, index) => {
            const active = music.currentTrack.id === track.id;
            return (
              <button key={track.id} className={active ? "active" : ""} onClick={() => music.selectTrack(track.id)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><b>{track.title}</b><small>{track.artist}</small></div>
                <em>{track.year}</em>
                {active && <i>{music.isPlaying ? "NOW PLAYING" : "PAUSED"}</i>}
              </button>
            );
          })}
        </div>
      </aside>
      {open && <button className="drawer-scrim" onClick={() => setOpen(false)} aria-label="Close song list" />}

      <section className="drive-player" aria-label="Music player">
        <div className="player-video"><YouTubePlayer /><span>OFFICIAL VIDEO</span></div>
        <div className="player-track">
          <div className="player-eyebrow"><span className={music.isPlaying ? "live" : ""} /> NOW PLAYING · {music.currentStation.frequency.toFixed(1)} FM</div>
          <div className="track-marquee"><b>{music.currentTrack.title}</b><span>{music.currentTrack.artist} · {music.currentTrack.year}</span></div>
          <div className="player-progress">
            <time>{formatTime(music.currentTime)}</time>
            <input
              type="range"
              min="0"
              max={Math.max(music.duration, 1)}
              value={Math.min(music.currentTime, Math.max(music.duration, 1))}
              onChange={(event) => music.seek(Number(event.target.value))}
              aria-label="Song progress"
            />
            <time>{formatTime(music.duration)}</time>
          </div>
        </div>
        <div className="player-controls">
          <button onClick={music.previousTrack} aria-label="Previous song">‹‹</button>
          <button className="play-button" onClick={togglePlayback} aria-label={music.isPlaying ? "Pause song" : "Play song"}>
            {music.isPlaying ? "Ⅱ" : "▶"}
          </button>
          <button onClick={music.nextTrack} aria-label="Next song">››</button>
        </div>
        <label className="volume-control">
          <span>VOL</span>
          <input type="range" min="0" max="100" value={music.volume} onChange={(event) => music.setVolume(Number(event.target.value))} aria-label="Volume" />
        </label>
        <button className="songs-button" onClick={() => setOpen(true)}><span>☰</span><b>ALL OG SONGS</b><small>{tracks.length} TRACKS</small></button>
      </section>
    </>
  );
}
