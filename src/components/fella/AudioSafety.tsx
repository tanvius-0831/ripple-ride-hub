import { useEffect, useRef, useState } from "react";
import { Mic, Square, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function AudioSafety({ rideLabel }: { rideLabel: string }) {
  const [enabled, setEnabled] = useState(false);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recording) {
      timer.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [recording]);

  return (
    <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold">🎙 Audio Safety</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            All participants must consent before audio recording begins.
          </p>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={(v) => {
            setEnabled(v);
            if (!v) {
              setRecording(false);
              setSeconds(0);
              setSaved(false);
            }
          }}
          aria-label="Enable recording"
        />
      </div>

      {enabled && (
        <div className="mt-3 space-y-3">
          <p className="flex items-center gap-2 text-xs text-primary">
            <span className="size-2 rounded-full bg-primary" /> Recording enabled
          </p>
          <p className="text-xs text-muted-foreground">
            Ride audio can be recorded for safety and incident review. Simulated only — this demo
            never accesses your microphone.
          </p>

          {!recording ? (
            <Button
              size="sm"
              onClick={() => {
                setSeconds(0);
                setSaved(false);
                setRecording(true);
              }}
            >
              <Mic className="size-4" /> Start Recording
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-xs text-destructive">
                <span className="size-2 animate-pulse rounded-full bg-destructive" /> Recording
                <span className="font-mono">{fmt(seconds)}</span>
              </span>
              <Button size="sm" variant="secondary" onClick={() => {
                setRecording(false);
                setSaved(true);
              }}>
                <Square className="size-4" /> Stop Recording
              </Button>
            </div>
          )}

          {saved && (
            <p className="flex items-center gap-2 text-xs text-primary">
              <ShieldCheck className="size-3.5" /> Audio recording saved for this demo ride (
              {rideLabel}).
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function SafetyChecklist() {
  const items = [
    "Women-only option",
    "Verified community members",
    "Shareable route",
    "Audio recording option",
  ];
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
      <h4 className="text-sm font-semibold">🛡 Ride Safety</h4>
      <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            {i}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Additional safety preferences for the prototype — these do not guarantee safety.
      </p>
    </div>
  );
}
