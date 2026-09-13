import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fella/AppShell";
import { Panel } from "@/components/fella/Stat";
import { RideCard } from "@/components/fella/RideCard";
import { SafetyChecklist } from "@/components/fella/AudioSafety";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RIDES } from "@/lib/fella-data";

export const Route = createFileRoute("/ride-matches")({
  component: RideMatches,
  head: () => ({
    meta: [
      { title: "Ride Matches — FellaFlow" },
      {
        name: "description",
        content:
          "Simulated ride matches with compatibility score, vehicle details, available seats, women-only preference, audio safety and route maps.",
      },
      { property: "og:title", content: "Ride Matches — FellaFlow" },
      {
        property: "og:description",
        content: "Compatibility-scored demo rides with vehicle, seat and safety information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RideMatches() {
  const [womenOnly, setWomenOnly] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);

  const matches = RIDES.filter(
    (r) =>
      (!womenOnly || (r.womenOnlyAvailable && r.gender === "female")) &&
      (!audioOnly || r.audioAvailable),
  ).map((r) => (womenOnly ? { ...r, womenOnly: true } : r));

  return (
    <AppShell
      title="Ride Matches"
      subtitle="Simulated matches for the 8:00–8:45 AM campus window. All drivers, vehicles and routes are demo data."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div>
          <Panel title="Ride preferences" subtitle="Filters apply to the simulated matching results">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Switch id="women-only" checked={womenOnly} onCheckedChange={setWomenOnly} />
                <Label htmlFor="women-only" className="text-xs">
                  🛡 Women Only
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="audio" checked={audioOnly} onCheckedChange={setAudioOnly} />
                <Label htmlFor="audio" className="text-xs">
                  🎙 Audio recording available
                </Label>
              </div>
            </div>
            {womenOnly && (
              <p className="mt-3 rounded-lg bg-violet/10 px-3 py-2 text-[11px] text-violet">
                Women-only ride preference is on — only compatible female driver and passenger
                profiles are shown. This is an additional safety preference, not a guarantee.
              </p>
            )}
          </Panel>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {matches.map((r) => (
              <RideCard key={r.id} ride={r} />
            ))}
          </div>
          {matches.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              No simulated rides match these preferences.
            </p>
          )}
        </div>

        <aside className="space-y-4">
          <SafetyChecklist />
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-xs text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">📍 Route data</p>
            <p className="mt-2">
              Route panels use simulated coordinates. No live location is collected and no real map
              service is called.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
