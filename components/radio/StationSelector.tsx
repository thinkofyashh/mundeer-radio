"use client";

import { stations } from "@/data/stations";
import { useMusic } from "@/components/player/MusicProvider";

export function StationSelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { currentStation, changeStation } = useMusic();
  return (
    <aside className={`station-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer-close" onClick={onClose} aria-label="Close stations">Close</button>
      <p className="eyebrow">FM presets · Delhi NCR</p>
      <h2>Turn the dial.</h2>
      <div className="station-list">
        {stations.map((station) => (
          <button
            key={station.id}
            className={station.id === currentStation.id ? "active" : ""}
            onClick={() => { changeStation(station.id); onClose(); }}
          >
            <span>{station.frequency.toFixed(1)}</span>
            <div><strong>{station.name}</strong><small>{station.tagline}</small></div>
          </button>
        ))}
      </div>
    </aside>
  );
}
