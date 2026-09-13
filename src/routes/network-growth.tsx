import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fella/AppShell";
import { Panel, Stat } from "@/components/fella/Stat";
import { COMMUNITY, GROWTH_SERIES } from "@/lib/fella-data";

export const Route = createFileRoute("/network-growth")({
  component: NetworkGrowth,
  head: () => ({
    meta: [
      { title: "Network Growth — FellaFlow" },
      {
        name: "description",
        content:
          "Simulated six-week growth of participants, completed rides and unlocked seats after community activation.",
      },
      { property: "og:title", content: "Network Growth — FellaFlow" },
      {
        property: "og:description",
        content: "Six weeks of simulated participant, ride and seat growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function NetworkGrowth() {
  const max = 40;
  return (
    <AppShell
      title="Network Growth"
      subtitle="Simulated trajectory after the seed drivers activate the Whitefield cluster."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active participants" value={28} hint="Week 6, simulated" />
        <Stat label="Rides per week" value={13} hint="Up from 1 in week 1" />
        <Stat label="Seats unlocked" value={COMMUNITY.availableSeats} hint="Across 15 vehicles" />
      </div>

      <Panel className="mt-6" title="Growth curve" subtitle="Participants · rides · seats per week">
        <div className="flex h-64 items-end gap-4">
          {GROWTH_SERIES.map((g) => (
            <div key={g.week} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-52 w-full items-end justify-center gap-1">
                <Column value={g.participants} max={max} className="bg-primary" />
                <Column value={g.rides} max={max} className="bg-cyan" />
                <Column value={g.seats} max={max} className="bg-violet" />
              </div>
              <span className="text-[11px] text-muted-foreground">{g.week}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-[11px] text-muted-foreground">
          <Legend className="bg-primary" label="Participants" />
          <Legend className="bg-cyan" label="Rides" />
          <Legend className="bg-violet" label="Seats" />
        </div>
      </Panel>

      <Panel className="mt-6" title="🦋 Flywheel" subtitle="Why growth compounds in this model">
        <div className="grid gap-3 sm:grid-cols-4">
          {["More users", "More rides", "Better matches", "More users"].map((s, i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-center text-sm">
              {s}
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function Column({ value, max, className }: { value: number; max: number; className: string }) {
  return (
    <div
      className={`w-3 rounded-t-md transition-all duration-700 ${className}`}
      style={{ height: `${(value / max) * 100}%` }}
      title={String(value)}
    />
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`size-2.5 rounded-full ${className}`} />
      {label}
    </span>
  );
}
