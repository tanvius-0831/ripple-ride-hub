import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fella/AppShell";
import { Panel } from "@/components/fella/Stat";
import { Button } from "@/components/ui/button";
import { COMMUNITY, RIPPLE_STAGES } from "@/lib/fella-data";

export const Route = createFileRoute("/ripple-simulator")({
  component: RippleSimulator,
  head: () => ({
    meta: [
      { title: "Ripple Simulator — FellaFlow" },
      {
        name: "description",
        content:
          "Simulate how three seed drivers and their available seats ripple into connections, rides, referrals and an activated campus network.",
      },
      { property: "og:title", content: "Ripple Simulator — FellaFlow" },
      {
        property: "og:description",
        content: "Watch a cold-start community activate from 0 to 28 participants.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RippleSimulator() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stage = RIPPLE_STAGES[step]!;
  const done = step === RIPPLE_STAGES.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [playing, step, done]);

  return (
    <AppShell
      title="Ripple Simulator"
      subtitle="How a handful of seed drivers and their spare seats cascade into an active community."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Panel title={`🦋 ${stage.label}`} subtitle="Simulated network expansion">
          <div className="relative grid h-80 place-items-center overflow-hidden rounded-xl border border-border/70 bg-[radial-gradient(circle_at_center,oklch(0.24_0.03_254),oklch(0.18_0.03_254))]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-ripple absolute size-32 rounded-full border border-primary/50"
                style={{ animationDelay: `${i * 1}s` }}
              />
            ))}
            <svg viewBox="0 0 320 240" className="relative h-full w-full">
              {Array.from({ length: Math.max(stage.users, 1) }).map((_, i) => {
                const total = Math.max(stage.users, 1);
                const angle = (i / total) * Math.PI * 2;
                const radius = 30 + (i % 4) * 26;
                const x = 160 + Math.cos(angle) * radius;
                const y = 120 + Math.sin(angle) * radius;
                return (
                  <g key={i}>
                    <line
                      x1={160}
                      y1={120}
                      x2={x}
                      y2={y}
                      stroke="var(--color-primary)"
                      strokeWidth="1"
                      opacity="0.25"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={i < 3 ? 6 : 4}
                      fill={i < 3 ? "var(--color-primary)" : i % 3 === 0 ? "var(--color-cyan)" : "var(--color-violet)"}
                      opacity="0.95"
                    />
                  </g>
                );
              })}
              <circle cx="160" cy="120" r="9" fill="var(--color-primary)" />
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Metric label="Active participants" value={stage.users} />
            <Metric label="Seats unlocked" value={stage.seats} />
            <Metric label="Connections" value={stage.connections} />
            <Metric label="Ride opportunities" value={stage.opportunities} />
            <Metric label="Referrals" value={stage.referrals} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setPlaying(true)} disabled={playing || done}>
              Run simulation
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setPlaying(false);
                setStep(0);
              }}
            >
              Reset
            </Button>
          </div>

          {done && (
            <div className="mt-4 animate-float-soft rounded-xl border border-primary/35 bg-primary/10 p-4">
              <p className="text-lg font-semibold text-primary">🦋 NETWORK ACTIVATED</p>
              <p className="mt-1 text-xs text-muted-foreground">
                More users → More rides → Better matches → More users
              </p>
              <p className="mt-2 text-sm">
                Community Health: <span className="font-bold text-primary">{COMMUNITY.healthScore}/100</span>
              </p>
            </div>
          )}
        </Panel>

        <Panel title="Cascade path" subtitle="Seat capacity drives every downstream step">
          <ol className="space-y-2">
            {RIPPLE_STAGES.map((s, i) => (
              <li
                key={s.label}
                className={`rounded-xl border p-3 text-xs transition-colors ${
                  i <= step
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border/70 bg-secondary/20 text-muted-foreground"
                }`}
              >
                <p className="font-medium">{s.label}</p>
                <p className="mt-0.5">
                  {s.users} users · {s.seats} seats · {s.opportunities} ride opportunities ·{" "}
                  {s.referrals} referrals
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] text-muted-foreground">
            3 seed drivers → 8 available seats → 5 first ride opportunities → 14 referrals → 28
            active participants.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/30 p-3">
      <p className="text-xl font-bold text-primary">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
