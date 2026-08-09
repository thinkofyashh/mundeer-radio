"use client";

import { useEffect, useState } from "react";
import { MusicProvider, useMusic } from "@/components/player/MusicProvider";
import { TrackMetadata } from "@/components/player/TrackMetadata";
import { NostalgiaScene } from "@/components/scene/NostalgiaScene";
import { FrequencyDial } from "@/components/radio/FrequencyDial";
import { StationSelector } from "@/components/radio/StationSelector";
import { WindowsDesktop } from "@/components/nostalgia/WindowsDesktop";
import { MemoryPopup, type MemoryKind } from "@/components/nostalgia/MemoryPopup";
import { EnterScreen } from "@/components/ui/EnterScreen";
import { ListenerCount } from "@/components/ui/ListenerCount";
import { useInterfaceSound } from "@/hooks/useInterfaceSound";

function Experience() {
  const music = useMusic();
  const [stationsOpen, setStationsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [memory, setMemory] = useState<MemoryKind>(null);
  const [desktopOn, setDesktopOn] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const sound = useInterfaceSound(soundEnabled);

  const enter = () => { sound("click"); music.enter(); };
  const tuneAction = (action: () => void) => { sound("static"); action(); };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!music.hasEntered || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === "Space") { event.preventDefault(); music.togglePlay(); }
      if (event.code === "ArrowRight") music.nextTrack();
      if (event.code === "ArrowLeft") music.previousTrack();
      if (event.code === "ArrowUp") music.setVolume(music.volume + 5);
      if (event.code === "ArrowDown") music.setVolume(music.volume - 5);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [music]);

  useEffect(() => { if (music.isTuning) sound("static"); }, [music.isTuning, sound]);

  return (
    <main className={`experience ${music.hasEntered ? "is-awake" : ""}`} style={{ "--track-tint": music.currentTrack.tint } as React.CSSProperties}>
      <div className="room-light" />
      <div className="window-scene" aria-hidden="true">
        <div className="sun" /><span className="wire wire-one" /><span className="wire wire-two" />
        <div className="buildings"><i /><i /><i /><i /></div>
        <div className="grill"><i /><i /><i /><i /></div>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Mafia Mundeer Radio home"><span>MM</span><div><b>MAFIA MUNDEER</b><small>RADIO · EST. 2011</small></div></a>
        <ListenerCount />
      </header>

      <div className="desk-scene" id="top">
        <WindowsDesktop active={desktopOn} onOpen={() => { setDesktopOn(true); sound("device"); }} />
        <div className="wall-poster" aria-hidden="true"><span>NO<br />PROXY</span><small>Computer Lab · ₹20/hr</small></div>
        <div className="radio-zone">
          <FrequencyDial />
          <NostalgiaScene />
          <div className="radio-controls" aria-label="Radio controls">
            <button onClick={() => tuneAction(music.previousTrack)} aria-label="Previous track">‹‹</button>
            <button className="play-button" onClick={() => { sound("click"); music.togglePlay(); }} aria-label={music.isPlaying ? "Pause" : "Play"}>
              {music.isPlaying ? "Ⅱ" : "▶"}
            </button>
            <button onClick={() => tuneAction(music.nextTrack)} aria-label="Next track">››</button>
            <label className="volume-control">
              <span>VOL</span>
              <input type="range" min="0" max="100" value={music.volume} onChange={(event) => music.setVolume(Number(event.target.value))} aria-label="Volume" />
            </label>
            <button className="tune-button" onClick={() => setStationsOpen(true)}>TUNE</button>
          </div>
        </div>
        <TrackMetadata />
        <button className="prop phone-prop" onClick={() => { setMemory("phone"); sound("device"); }} aria-label="Inspect old phone"><span>12:04</span><i>████</i></button>
        <button className="prop usb-prop" onClick={() => { setMemory("usb"); sound("device"); }} aria-label="Inspect pendrive"><i /></button>
        <button className="prop cd-prop" onClick={() => setMemory("cd")} aria-label="Inspect CD stack"><i /><i /><span>DJ MIX 11</span></button>
        <div className="earphones" aria-hidden="true"><i /><i /><span /></div>
        <div className="keys" aria-hidden="true"><i>●</i><span /></div>
      </div>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <button onClick={() => setAboutOpen(true)}>About</button>
        <button onClick={() => setStationsOpen(true)}>Stations</button>
        <button onClick={() => setAboutOpen(true)}>Memories</button>
        <button className="sound-toggle" onClick={() => setSoundEnabled((value) => !value)}>{soundEnabled ? "SFX ON" : "SFX OFF"}</button>
      </nav>

      <StationSelector open={stationsOpen} onClose={() => setStationsOpen(false)} />
      <div className={`about-panel ${aboutOpen ? "is-open" : ""}`} aria-hidden={!aboutOpen}>
        <button onClick={() => setAboutOpen(false)} aria-label="Close about panel">×</button>
        <p className="eyebrow">A little time machine</p>
        <h2>Before algorithms<br />chose everything.</h2>
        <p>This is for everyone who downloaded songs at 50 KB/s, sent MP3s through Bluetooth, carried 2GB memory cards, and found their favourite track through a friend.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="memory-input">What song instantly takes you back?</label>
          <textarea id="memory-input" placeholder="Listening to this on my Nokia while going to tuition…" />
          <button type="submit" disabled>Leave a memory · coming later</button>
        </form>
      </div>
      {(stationsOpen || aboutOpen) && <button className="panel-scrim" onClick={() => { setStationsOpen(false); setAboutOpen(false); }} aria-label="Close panel" />}
      <MemoryPopup kind={memory} onClose={() => setMemory(null)} />
      <div className={`static-flash ${music.isTuning ? "active" : ""}`} aria-hidden="true" />
      <EnterScreen onEnter={enter} />
    </main>
  );
}

export function NostalgiaExperience() {
  return <MusicProvider><Experience /></MusicProvider>;
}
