"use client";

import { useMusic } from "./MusicProvider";
import { formatTime } from "@/lib/youtube";

export function TrackMetadata() {
  const { currentTrack, currentStation, currentTime, duration, seek, isTuning } = useMusic();
  return (
    <section className={`track-card ${isTuning ? "is-tuning" : ""}`} aria-live="polite">
      <div className="track-label"><span /> Now playing · {currentStation.frequency.toFixed(1)} FM</div>
      <div className="track-copy">
        <div>
          <h1>{isTuning ? "Finding a memory…" : currentTrack.title}</h1>
          <p>{isTuning ? currentStation.name : currentTrack.artist}</p>
        </div>
        <b>{currentTrack.year}</b>
      </div>
      <input
        aria-label="Seek through current track"
        className="seek-track"
        type="range"
        min={0}
        max={duration || 1}
        value={Math.min(currentTime, duration || 1)}
        onChange={(event) => seek(Number(event.target.value))}
        style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
      />
      <div className="time-row"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
    </section>
  );
}
