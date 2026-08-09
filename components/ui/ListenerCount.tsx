export function ListenerCount() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return (
    <div className="listener-count" title={configured ? "Realtime presence connected" : "Realtime listener count is not configured"}>
      <i /> {configured ? "listening live" : "radio room open"}
    </div>
  );
}
