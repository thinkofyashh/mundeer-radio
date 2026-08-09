"use client";

import { useMusic } from "@/components/player/MusicProvider";

export function EnterScreen({ onEnter }: { onEnter: () => void }) {
  const { hasEntered } = useMusic();
  return (
    <div className={`enter-screen ${hasEntered ? "has-entered" : ""}`} aria-hidden={hasEntered}>
      <div className="entry-grain" />
      <div className="entry-copy">
        <p>Somewhere in India, 2011.</p>
        <h1>The evening playlist<br />is still where you left it.</h1>
        <button onClick={onEnter} disabled={hasEntered}>
          <span className="power-symbol">⏻</span>
          <span><b>Turn the radio on</b><small>Music starts after you press power</small></span>
        </button>
      </div>
      <span className="entry-note">Best experienced with earphones</span>
    </div>
  );
}
