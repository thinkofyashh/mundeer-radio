"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrivePlayer } from "@/components/player/DrivePlayer";
import { MusicProvider, useMusic } from "@/components/player/MusicProvider";
import { RoadJourney } from "@/components/scene/RoadJourney";

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
  "/assets/memories/cyber-street.jpg",
  "/assets/memories/cyber-cafe.jpg",
  "/assets/memories/rooftop-sharing.jpg",
  "/assets/memories/world-cup.jpg",
  "/assets/memories/recharge-shop.jpg",
  "/assets/memories/cricket-street.jpg",
];

function RoadTrip() {
  const music = useMusic();
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [started, setStarted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 720px)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => { progress.current = self.progress; },
      });

      gsap.utils.toArray<HTMLElement>(".drive-chapter").forEach((chapter, index) => {
        const card = chapter.querySelector(".chapter-card");
        gsap.fromTo(card, { opacity: 0, y: 70, rotateX: 5 }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 72%",
            end: "top 38%",
            scrub: reducedMotion ? false : 0.8,
          },
        });
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            if (self.isActive) setActiveChapter(index);
          },
        });
      });
    }, root);
    return () => scope.revert();
  }, [reducedMotion]);

  const beginRide = () => {
    setStarted(true);
    music.enter();
  };

  return (
    <main ref={root} className={`road-trip ${started ? "ride-started" : ""}`}>
      <RoadJourney progress={progress} started={started} reducedMotion={reducedMotion} />
      <div className="memory-backdrops" aria-hidden="true">
        <div key={chapterImages[activeChapter]} className="memory-backdrop active" style={{ backgroundImage: `url(${chapterImages[activeChapter]})` }} />
      </div>
      <div className="road-grade" aria-hidden="true" />
      <div className="print-texture" aria-hidden="true" />

      <header className="trip-header">
        <a href="#pickup" className="trip-brand"><span>MR</span><div><b>MUNDEER RADIO</b><small>STREAMING MEMORIES SINCE 2011</small></div></a>
        <div className="trip-route"><i /> CHANDIGARH <span>→</span> THE LONG WAY HOME</div>
        <div className="trip-frequency"><small>LIVE FREQUENCY</small><b>{music.currentStation.frequency.toFixed(1)}</b><span>FM</span></div>
      </header>

      <nav className="chapter-dots" aria-label="Journey chapters">
        {chapters.map((chapter, index) => (
          <a key={chapter.id} href={`#${chapter.id}`} className={activeChapter === index ? "active" : ""} aria-label={`Chapter ${index + 1}: ${chapter.place}`}><i /><span>{chapter.count}</span></a>
        ))}
      </nav>

      <div className="road-hud left"><small>TRIP</small><b>{String(14 + activeChapter * 7).padStart(2, "0")}.8 KM</b><span>PB · 2011</span></div>
      <div className="road-hud right"><small>NOW PLAYING</small><b>{music.currentTrack.title}</b><span>{music.currentTrack.artist}</span></div>

      <section className={`ride-entry ${started ? "is-hidden" : ""}`} aria-hidden={started}>
        <div className="entry-copy">
          <p>CHANDIGARH · WINTER 2011</p>
          <h1>The car is here.<br /><em>Passenger seat is empty.</em></h1>
          <span>A white hatchback. Black alloys. A glovebox full of songs.<br />Take the aux and choose the first track.</span>
          <button onClick={beginRide}><i>▶</i><b>START THE RIDE</b><small>HEADPHONES RECOMMENDED</small></button>
        </div>
        <div className="entry-stamp"><span>PB</span><b>10</b><small>2011</small></div>
      </section>

      <div className="chapter-scroll">
        {chapters.map((chapter, index) => (
          <section id={chapter.id} className={`drive-chapter ${index % 2 ? "align-right" : "align-left"}`} key={chapter.id}>
            <article className="chapter-card">
              <div className="chapter-label"><span>{chapter.count}</span><i />{chapter.place}</div>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              {chapter.memory}
              {index === 0 && <div className="scroll-note">SCROLL TO DRIVE <span>↓</span></div>}
              {index === chapters.length - 1 && <button className="replay-song" onClick={() => music.selectTrack("brown-rang")}>PLAY BROWN RANG AGAIN ↺</button>}
            </article>
          </section>
        ))}
      </div>

      <DrivePlayer />
    </main>
  );
}

export function NostalgiaExperience() {
  return <MusicProvider><RoadTrip /></MusicProvider>;
}
