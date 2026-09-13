import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Mic, ShieldCheck, Users } from "lucide-react";
import { AppShell } from "@/components/fella/AppShell";
import { Panel, Stat } from "@/components/fella/Stat";
import { Button } from "@/components/ui/button";
import { COMMUNITY, RIDES, SAFETY_STATS } from "@/lib/fella-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "FellaFlow Dashboard — Community Activation Engine" },
      {
        name: "description",
        content:
          "FellaFlow dashboard for the simulated Northbridge Institute of Technology community: drivers, passengers, seat capacity and ride safety signals.",
      },
      { property: "og:title", content: "FellaFlow Dashboard — Community Activation Engine" },
      {
        property: "og:description",
        content: "Simulated cold-start mobility analytics for a Bengaluru campus community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Dashboard() {
  return (
    <AppShell
      title="Community Activation Dashboard"
      subtitle={`${COMMUNITY.name}, ${COMMUNITY.city} — a simulated demo community used to solve the FellaRide cold-start problem.`}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Profiles mapped" value={COMMUNITY.profiles} hint="Simulated member graph" icon={<Users className="size-4" />} />
        <Stat label="Potential drivers" value={COMMUNITY.potentialDrivers} hint="With vehicle access" icon={<Car className="size-4" />} />
        <Stat label="Potential passengers" value={COMMUNITY.potentialPassengers} hint="Peak 8:00–8:30 AM" icon={<Users className="size-4" />} />
        <Stat label="Community health" value={`${COMMUNITY.healthScore}/100`} hint="Activation readiness" icon={<span>🦋</span>} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="🚗 Mobility Capacity" subtitle="Can this community physically move itself?" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniStat label="Available seats" value={COMMUNITY.availableSeats} />
            <MiniStat label="Potential connectors" value={COMMUNITY.potentialConnectors} />
            <MiniStat label="Seat gap" value={COMMUNITY.potentialPassengers - COMMUNITY.availableSeats} tone="destructive" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Passenger demand exceeds available ride capacity. Prioritise high-impact drivers with 2+
            available seats.
          </p>
          <div className="mt-4 flex gap-2">
            <Button asChild size="sm">
              <Link to="/seed-finder">Find seed drivers</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/ride-matches">View ride matches</Link>
            </Button>
          </div>
        </Panel>

        <Panel title="🛡 Safety-Enabled Rides" subtitle="Consent-based preferences, simulated">
          <ul className="space-y-3 text-sm">
            <SafetyRow icon={<ShieldCheck className="size-4 text-primary" />} label="Safety-enabled rides" value={SAFETY_STATS.safetyEnabledRides} />
            <SafetyRow icon={<span>🛡</span>} label="Women-only eligible rides" value={SAFETY_STATS.womenOnlyEligible} />
            <SafetyRow icon={<Mic className="size-4 text-primary" />} label="Audio-enabled rides" value={SAFETY_STATS.audioEnabled} />
          </ul>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Additional safety preferences — they do not guarantee safety.
          </p>
        </Panel>
      </div>

      <Panel className="mt-6" title="Top simulated ride opportunities" subtitle="Highest compatibility in the morning cluster">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {RIDES.slice(0, 3).map((r) => (
            <div key={r.id} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{r.driver}</span>
                <span className="text-xs font-semibold text-primary">{r.compatibility}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {r.origin} → Campus · {r.departure}
              </p>
              <p className="mt-2 text-xs">
                🚗 {r.vehicle.model} • {r.vehicle.type}
              </p>
              <p className="text-xs text-muted-foreground">
                👥 {r.vehicle.availableSeats} seats available
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: number; tone?: "destructive" }) {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone === "destructive" ? "text-destructive" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function SafetyRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold">{value}</span>
    </li>
  );
}
