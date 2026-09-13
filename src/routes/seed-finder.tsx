import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fella/AppShell";
import { Panel } from "@/components/fella/Stat";
import { RIDES } from "@/lib/fella-data";

export const Route = createFileRoute("/seed-finder")({
  component: SeedFinder,
  head: () => ({
    meta: [
      { title: "Seed Finder — FellaFlow" },
      {
        name: "description",
        content:
          "Explainable Community Impact Score that ranks simulated seed members most likely to activate the first rides.",
      },
      { property: "og:title", content: "Seed Finder — FellaFlow" },
      {
        property: "og:description",
        content: "Rank seed drivers by route overlap, seat capacity and peak-time travel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SeedFinder() {
  const seeds = [...RIDES].sort((a, b) => b.impactScore - a.impactScore);

  return (
    <AppShell
      title="Seed Finder"
      subtitle="Ranked by Community Impact Score — a transparent rule-based score, not a machine-learning model."
    >
      <Panel title="How the Community Impact Score works" subtitle="Every point is explainable">
        <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-4">
          {[
            ["Route overlap", "How many members share this corridor"],
            ["Seat capacity", "Available seats in the vehicle"],
            ["Peak-time fit", "Departure inside 8:00–8:30 AM"],
            ["Social reach", "Distinct circles the member touches"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-border/70 bg-secondary/30 p-3">
              <p className="text-sm font-medium text-foreground">{t}</p>
              <p className="mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {seeds.map((s, i) => (
          <article key={s.id} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Seed #{i + 1}
                </p>
                <h3 className="text-lg font-semibold">{s.driver}</h3>
                <p className="text-xs text-muted-foreground">{s.role}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{s.impactScore}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Community Impact Score
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
              <p>📍 {s.origin} → Campus</p>
              <p>🕗 {s.departure}</p>
              <p>🚗 {s.vehicle.model} • {s.vehicle.type}</p>
              <p>👥 {s.vehicle.availableSeats} seats available</p>
            </div>

            <div className="mt-3 rounded-xl border border-border/70 bg-secondary/30 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Why selected
              </p>
              <p className="mt-1 text-xs">{s.reason}</p>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
