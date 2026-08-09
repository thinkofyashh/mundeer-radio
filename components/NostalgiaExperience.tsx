"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiFiPlayer } from "@/components/player/HiFiPlayer";
import { MusicProvider, useMusic } from "@/components/player/MusicProvider";

const chapters = [
  {
    id: "pickup",
    count: "01",
    place: "SECTOR 17 · 7:42 PM",
    title: <>Gaadi white thi.<br /><em>Playlist loud.</em></>,
    body: "Black alloys, four friends, one aux cable—and absolutely no agreement on what played next.",
    memory: <div className="memory-ticket"><span>TONIGHT&apos;S ROUTE</span><b>Gedi Route → Sukhna</b><small>PETROL ₹67/L · WINDOWS DOWN</small></div>,
  },
  {
    id: "cafe",
    count: "02",
    place: "CYBER CAFÉ · 8:06 PM",
    title: <>47 KB/s.<br /><em>Worth the wait.</em></>,
    body: "The song took forty minutes to download. Then someone copied it to a pen drive like it was contraband.",
    memory: <div className="download-chip"><div><span>new_song_final.mp3</span><b>87%</b></div><i><span /></i><small>Seeds: 3 · Peers: 18 · ETA 00:42</small></div>,
  },
  {
    id: "bluetooth",
    count: "03",
    place: "TUITION STOP · 8:31 PM",
    title: <>Phones together.<br /><em>Do not move.</em></>,
    body: "Before streaming, one person having the song meant the whole group would have it by tomorrow.",
    memory: <div className="transfer-chip"><span>▯</span><div><i /><i /><i /><i /><i /></div><span>▯</span><b>Transferring… 64%</b><small>Track_07.mp3 · 5.8 MB</small></div>,
  },
  {
    id: "cricket",
    count: "04",
    place: "MOHALLA SCREEN · 9:14 PM",
    title: <>One screen.<br /><em>A billion hearts.</em></>,
    body: "Every shop had the same match on. Every scooter slowed down. The cheer reached you before the score did.",
    memory: <div className="score-chip"><span>LIVE</span><b>IND 274/4</b><small>47.1 OVERS · NEED 1 TO WIN</small><i /></div>,
  },
  {
    id: "recharge",
    count: "05",
    place: "RECHARGE SHOP · 9:48 PM",
    title: <>Full signal.<br /><em>Zero balance.</em></>,
    body: "A missed call was a complete sentence. A two-rupee text had to be edited until every word earned its place.",
    memory: <div className="sms-chip"><span>1 NEW MESSAGE</span><b>“Bhai, gaana bhej na.”</b><small>BALANCE: ₹0.37 · DELIVERED</small></div>,
  },
  {
    id: "night-drive",
    count: "06",
    place: "THE LONG WAY HOME · 10:26 PM",
    title: <>Same songs.<br /><em>Different us.</em></>,
    body: "Maybe we do not miss the slow internet. Maybe we miss the people we were while waiting together.",
    memory: <div className="final-chip"><span>MEMORY SAVED</span><b>The ride can loop forever.</b><small>TURN IT UP. TAKE THE LONG WAY HOME.</small></div>,
  },
];

const chapterImages = [
  "/assets/hero-car-v3.jpg",
  "/assets/memories/cyber-cafe.jpg",
  "/assets/memories/rooftop-sharing.jpg",
  "/assets/memories/world-cup.jpg",
  "/assets/memories/recharge-shop.jpg",
  "/assets/memories/cricket-street.jpg",
];

function RoadTrip() {
  const music = useMusic();
  const root = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [playerExpanded, setPlayerExpanded] = useState(false);

  useEffect(() => {
    const sections = Array.from(root.current?.querySelectorAll<HTMLElement>(".drive-chapter") ?? []);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = sections.indexOf(visible.target as HTMLElement);
      if (index >= 0) setActiveChapter(index);
    }, { rootMargin: "-28% 0px -32%", threshold: [0.12, 0.35, 0.62] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const setExpanded = useCallback((expanded: boolean) => {
    setPlayerExpanded(expanded);
    document.body.classList.toggle("player-expanded", expanded);
  }, []);

  useEffect(() => () => {
    document.body.classList.remove("player-expanded");
  }, []);

  const beginRide = () => {
    setStarted(true);
    setExpanded(true);
    music.enter();
  };

  return (
    <main ref={root} className={`road-trip ${started ? "ride-started" : ""}`}>
      <div className="journey-backdrop" aria-hidden="true">
        <div key={chapterImages[activeChapter]} style={{ backgroundImage: `url(${chapterImages[activeChapter]})` }} />
      </div>
      <div className="road-grade" aria-hidden="true" />
      <div className="print-texture" aria-hidden="true" />

      <header className="trip-header">
        <a href="#pickup" className="trip-brand"><span>MR</span><div><b>MUNDEER RADIO</b><small>REFERENCE MUSIC SYSTEM · 2011</small></div></a>
        <div className="trip-route"><i /> CHANDIGARH <span>—</span> THE LONG WAY HOME</div>
        <div className="trip-frequency"><small>SINGLE FREQUENCY</small><b>{music.currentStation.frequency.toFixed(1)}</b><span>FM</span></div>
      </header>

      <nav className="chapter-dots" aria-label="Journey chapters">
        {chapters.map((chapter, index) => (
          <a key={chapter.id} href={`#${chapter.id}`} className={activeChapter === index ? "active" : ""} aria-label={`Chapter ${index + 1}: ${chapter.place}`}><i /><span>{chapter.count}</span></a>
        ))}
      </nav>

      <section className={`ride-entry ${started ? "is-hidden" : ""}`} aria-hidden={started}>
        <div className="entry-copy">
          <p>CHANDIGARH · WINTER 2011</p>
          <h1>The road is waiting.<br /><em>Your song is already cued.</em></h1>
          <span>A white hatchback, a glovebox of classics, and one beautifully simple radio.<br />Settle in. The first track starts when you press power.</span>
          <button onClick={beginRide}><i /><b>POWER ON</b><small>HEADPHONES RECOMMENDED</small></button>
        </div>
        <div className="entry-plaque"><span>REFERENCE</span><b>MR–11</b><small>CHANDIGARH · INDIA</small></div>
      </section>

      <div className="chapter-scroll">
        {chapters.map((chapter, index) => (
          <section id={chapter.id} className={`drive-chapter ${index % 2 ? "align-right" : "align-left"} ${activeChapter === index ? "is-active" : ""}`} key={chapter.id}>
            <article className="chapter-card">
              <div className="chapter-label"><span>{chapter.count}</span><i />{chapter.place}</div>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              {chapter.memory}
              {index === 0 && <div className="scroll-note">CONTINUE THE JOURNEY <span>↓</span></div>}
              {index === chapters.length - 1 && <button className="replay-song" onClick={() => music.selectTrack("brown-rang")}>PLAY BROWN RANG AGAIN</button>}
            </article>
          </section>
        ))}
      </div>

      <HiFiPlayer expanded={playerExpanded} onExpandedChange={setExpanded} />
    </main>
  );
}

export function NostalgiaExperience() {
  return <MusicProvider><RoadTrip /></MusicProvider>;
}
