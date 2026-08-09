"use client";

export type MemoryKind = "phone" | "usb" | "cd" | null;

export function MemoryPopup({ kind, onClose }: { kind: MemoryKind; onClose: () => void }) {
  if (!kind) return null;
  const content = {
    phone: { kicker: "Bluetooth exchange", title: "Receiving file…", file: "Brown_Rang_320kbps.mp3", detail: "████████░░ 82%" },
    usb: { kicker: "Removable disk (E:)", title: "USB Device Detected", file: "Songs_For_Phone", detail: "Open folder to view files" },
    cd: { kicker: "Now in the tray", title: "COLLEGE MIX '11", file: "22 tracks · 703 MB", detail: "Written with Nero StartSmart" },
  }[kind];
  return (
    <div className="memory-popup" role="dialog" aria-modal="true" aria-label={content.title}>
      <button onClick={onClose} aria-label="Close">×</button>
      <p>{content.kicker}</p><h3>{content.title}</h3><strong>{content.file}</strong><span>{content.detail}</span>
    </div>
  );
}
