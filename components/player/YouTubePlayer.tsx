"use client";

export function YouTubePlayer() {
  return (
    <div className="monitor-video" aria-label="YouTube video player">
      <div id="youtube-player" />
      <div className="crt-scanlines" aria-hidden="true" />
    </div>
  );
}
