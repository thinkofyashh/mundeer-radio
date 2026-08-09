"use client";

import { useState } from "react";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";

const folders = ["Punjabi Songs New", "Bollywood Hits 2011", "Songs For Phone", "Bluetooth", "Downloads", "Videos", "College"];

export function WindowsDesktop({ active, onOpen }: { active: boolean; onOpen: () => void }) {
  const [download, setDownload] = useState(false);
  return (
    <div className={`computer-prop ${active ? "is-on" : ""}`}>
      <button className="computer-screen-button" onClick={onOpen} aria-label="Open the old computer desktop">
        <div className="monitor-shell">
          <div className="monitor-screen">
            <YouTubePlayer />
            <div className="desktop-icons">
              {folders.slice(0, 5).map((folder) => <span key={folder}><i>▣</i>{folder}</span>)}
            </div>
            <div className="taskbar"><span>◉ start</span><time>8:41 PM</time></div>
            {download && (
              <div className="download-mini">
                <strong>Punjabi_Hits_2011.zip</strong><span>Downloading… 83%</span><i><b /></i><small>47 KB/s · ETA 27 min</small>
              </div>
            )}
          </div>
        </div>
        <span className="monitor-neck" />
        <span className="monitor-base" />
      </button>
      <button className="computer-caption" onClick={() => setDownload((value) => !value)}>MY COMPUTER</button>
    </div>
  );
}
