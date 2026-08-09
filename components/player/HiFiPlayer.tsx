"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { tracks } from "@/data/tracks";
import { formatTime } from "@/lib/youtube";
import { useMusic } from "@/components/player/MusicProvider";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";

type HiFiPlayerProps = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

export function HiFiPlayer({ expanded, onExpandedChange }: HiFiPlayerProps) {
  const music = useMusic();
  const [libraryOpen, setLibraryOpen] = useState(false);
  const progress = music.duration > 0 ? Math.min(1, music.currentTime / music.duration) : 0;
  const shellStyle = {
    "--track-accent": music.currentTrack.tint,
    "--seek-progress": `${progress * 360}deg`,
    "--volume-angle": `${-132 + music.volume * 2.64}deg`,
  } as CSSProperties;

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (libraryOpen) setLibraryOpen(false);
      else if (expanded) onExpandedChange(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [expanded, libraryOpen, onExpandedChange]);

  const togglePlayback = () => {
    if (!music.hasEntered) music.enter();
    else music.togglePlay();
  };

  const seekBy = (seconds: number) => {
    music.seek(Math.max(0, Math.min(music.duration || 0, music.currentTime + seconds)));
  };

  const chooseTrack = (id: string) => {
    music.selectTrack(id);
    setLibraryOpen(false);
  };

  return (
    <>
      {expanded && <button className="hifi-scrim" onClick={() => onExpandedChange(false)} aria-label="Minimize player" />}
      <section className={`hifi-player ${expanded ? "is-expanded" : "is-compact"}`} style={shellStyle} aria-label="Mundeer Radio music player">
        <div className="hifi-shell">
          <div className="hifi-toprail">
            <div className="hifi-maker"><i /><span>MUNDEER</span><small>REFERENCE 91.1</small></div>
            <div className="hifi-source"><span className={music.playerReady ? "ready" : ""} /> {music.playerReady ? "SOURCE LOCKED" : "WARMING UP"}</div>
            <div className="hifi-actions">
              <button onClick={() => setLibraryOpen(true)}>LIBRARY <span>{tracks.length}</span></button>
              <button onClick={() => onExpandedChange(!expanded)} aria-label={expanded ? "Minimize player" : "Open full player"}>{expanded ? "MINIMIZE" : "NOW PLAYING"}</button>
            </div>
          </div>

          <div className="hifi-media">
            <div className="media-bezel">
              <YouTubePlayer />
              <div className="media-vignette" aria-hidden="true" />
            </div>
            <div className="media-caption"><span>YOUTUBE IFRAME SOURCE</span><b>ORIGINAL VIDEO FEED</b></div>
          </div>

          <div className="hifi-information">
            <div className="track-index">{String(tracks.findIndex((track) => track.id === music.currentTrack.id) + 1).padStart(2, "0")} / {tracks.length}</div>
            <p>MUNDEER RADIO · {music.currentStation.frequency.toFixed(1)} FM</p>
            <h2>{music.currentTrack.title}</h2>
            <h3>{music.currentTrack.artist}</h3>
            <div className="track-specs"><span>{music.currentTrack.year}</span><span>STEREO</span><span>ORIGINAL VIDEO</span></div>
            <div className="hairline-progress">
              <time>{formatTime(music.currentTime)}</time>
              <input
                type="range"
                min="0"
                max={Math.max(music.duration, 1)}
                value={Math.min(music.currentTime, Math.max(music.duration, 1))}
                onChange={(event) => music.seek(Number(event.target.value))}
                aria-label="Song position"
              />
              <time>{formatTime(music.duration)}</time>
            </div>
          </div>

          <div className="hifi-transport">
            <div className="transport-label"><span>TRANSPORT</span><i />PRECISION CONTROL</div>
            <div className="transport-controls">
              <button className="metal-button track-skip" onClick={music.previousTrack} aria-label="Previous song"><span>│◀</span><small>PREV</small></button>
              <button className="metal-button time-skip" onClick={() => seekBy(-10)} aria-label="Seek back ten seconds"><span>−10</span><small>BACK</small></button>
              <div className="seek-dial" aria-label={`${Math.round(progress * 100)} percent played`}>
                <div className="seek-ring"><i /></div>
                <button className="hero-play" onClick={togglePlayback} aria-label={music.isPlaying ? "Pause song" : "Play song"}>
                  <span>{music.isPlaying ? "Ⅱ" : "▶"}</span>
                </button>
              </div>
              <button className="metal-button time-skip" onClick={() => seekBy(10)} aria-label="Seek forward ten seconds"><span>+10</span><small>FWD</small></button>
              <button className="metal-button track-skip" onClick={music.nextTrack} aria-label="Next song"><span>▶│</span><small>NEXT</small></button>
            </div>
          </div>

          <div className="hifi-volume">
            <span>OUTPUT</span>
            <div className="volume-knob" aria-hidden="true"><i /></div>
            <label>VOLUME · {music.volume}
              <input type="range" min="0" max="100" value={music.volume} onChange={(event) => music.setVolume(Number(event.target.value))} aria-label="Volume" />
            </label>
          </div>
        </div>
      </section>

      <aside className={`record-library ${libraryOpen ? "is-open" : ""}`} aria-hidden={!libraryOpen}>
        <header><div><span>THE GLOVEBOX ARCHIVE</span><h2>OG recordings</h2><p>One frequency. Fifteen memories.</p></div><button onClick={() => setLibraryOpen(false)} aria-label="Close music library">×</button></header>
        <div className="library-list">
          {tracks.map((track, index) => {
            const active = track.id === music.currentTrack.id;
            return (
              <button key={track.id} className={active ? "active" : ""} onClick={() => chooseTrack(track.id)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><b>{track.title}</b><small>{track.artist}</small></div>
                <time>{track.year}</time>
                {active && <i>{music.isPlaying ? "PLAYING" : "CUED"}</i>}
              </button>
            );
          })}
        </div>
      </aside>
      {libraryOpen && <button className="library-scrim" onClick={() => setLibraryOpen(false)} aria-label="Close music library" />}
    </>
  );
}
