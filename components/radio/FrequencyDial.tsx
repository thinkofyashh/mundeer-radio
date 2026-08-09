"use client";

import { stations } from "@/data/stations";
import { useMusic } from "@/components/player/MusicProvider";

export function FrequencyDial() {
  const { currentStation, isTuning } = useMusic();
  const index = stations.findIndex((station) => station.id === currentStation.id);
  return (
    <div className={`frequency-strip ${isTuning ? "is-scanning" : ""}`} aria-label={`Tuned to ${currentStation.frequency.toFixed(1)} FM`}>
      <div className="frequency-numbers" style={{ transform: `translateX(calc(50% - ${index * 74 + 28}px))` }}>
        {stations.map((station) => <span key={station.id}>{station.frequency.toFixed(1)}</span>)}
      </div>
      <i aria-hidden="true" />
    </div>
  );
}
