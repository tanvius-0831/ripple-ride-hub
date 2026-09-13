import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fella/AppShell";
import { Bar, Panel, Stat } from "@/components/fella/Stat";
import { CAPACITY_DISTRIBUTION, COMMUNITY } from "@/lib/fella-data";

export const Route = createFileRoute("/community-dna")({
  component: CommunityDna,
  head: () => ({
    meta: [
      { title: "Community DNA — FellaFlow" },
      {
        name: "description",
        content:
          "Simulated mobility DNA of a campus community: potential drivers, passengers, connectors and vehicle seat capacity distribution.",
      },
      { property: "og:title", content: "Community DNA — FellaFlow" },
      {
        property: "og:description",
        content: "Drivers, passengers, connectors and seat capacity for a simulated campus community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const CLUSTERS = [
  { name: "Whitefield corridor", members: 34, drivers: 5, seats: 12 },
  { name: "HSR / Agara", members: 22, drivers: 3, seats: 7 },
  { name: "Indiranagar / Domlur", members: 19, drivers: 2, seats: 5 },
  { name: "Bellandur belt", members: 27, drivers: 3, seats: 9 },
  { name: "Northern cluster", members: 26, drivers: 1, seats: 5 },
];

function CommunityDna() {
  return (
    <AppShell
      title="Community DNA"
      subtitle="What the simulated community is made of — roles, clusters and vehicle capacity."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Potential drivers" value={COMMUNITY.potentialDrivers} hint="Own or access a vehicle" />
        <Stat label="Potential passengers" value={COMMUNITY.potentialPassengers} hint="Regular peak-time travel" />
        <Stat label="Potential connectors" value={COMMUNITY.potentialConnectors} hint="Bridge separate circles" />
        <Stat label="Available seats" value={COMMUNITY.availableSeats} hint="Across all vehicles" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="🚗 Vehicle Capacity Distribution" subtitle="Simulated fleet across the community">
          <div className="space-y-3">
            {CAPACITY_DISTRIBUTION.map((c, i) => (
              <Bar
                key={c.label}
                label={`${c.label} — ${c.vehicles} vehicles`}
                value={c.vehicles}
                max={10}
                tone={i === 0 ? "primary" : i === 1 ? "cyan" : "violet"}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Seat Capacity Bottleneck" subtitle="Does the community have enough capacity to activate rides?">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Drivers", COMMUNITY.potentialDrivers],
              ["Passengers", COMMUNITY.potentialPassengers],
              ["Seats", COMMUNITY.availableSeats],
            ].map(([l, v]) => (
              <div key={l as string} className="rounded-xl border border-border/70 bg-secondary/30 p-3">
                <p className="text-xl font-bold">{v}</p>
                <p className="text-[11px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs">
            <span className="text-muted-foreground">Insight: </span>
            Passenger demand exceeds available ride capacity.
          </p>
          <p className="mt-1 text-xs">
            <span className="text-muted-foreground">Recommended action: </span>
            <span className="text-primary">
              Prioritize high-impact drivers with 2+ available seats.
            </span>
          </p>
        </Panel>
      </div>

      <Panel className="mt-6" title="📍 Residential clusters" subtitle="Simulated travel geography">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {CLUSTERS.map((c) => (
            <div key={c.name} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.members} members</p>
              <div className="mt-3 flex gap-2 text-[11px] text-muted-foreground">
                <span className="rounded-full bg-secondary px-2 py-1">🚗 {c.drivers} drivers</span>
                <span className="rounded-full bg-secondary px-2 py-1">👥 {c.seats} seats</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
