import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fella/AppShell";
import { Bar, Panel } from "@/components/fella/Stat";
import { BOTTLENECKS } from "@/lib/fella-data";

export const Route = createFileRoute("/bottleneck")({
  component: Bottleneck,
  head: () => ({
    meta: [
      { title: "Activation Bottleneck — FellaFlow" },
      {
        name: "description",
        content:
          "Bottleneck analysis for a simulated campus ride community: driver shortage, seating capacity, route and time mismatch.",
      },
      { property: "og:title", content: "Activation Bottleneck — FellaFlow" },
      {
        property: "og:description",
        content: "Which constraint blocks the first rides in a cold-start community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Bottleneck() {
  return (
    <AppShell
      title="Activation Bottleneck"
      subtitle="What exactly is stopping the first rides from happening in this simulated community?"
    >
      <section className="panel border-primary/35 p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Primary bottleneck</p>
        <h2 className="mt-2 text-2xl font-semibold">Driver / seating capacity shortage</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          2–3 high-potential drivers could unlock this travel cluster.
        </p>
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Recommended action</p>
          <p className="mt-1 text-sm text-primary">
            Recruit high-impact drivers travelling from Whitefield between 8:00–8:30 AM with 2+
            available seats.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Bottleneck scan" subtitle="Severity across all detected constraint types">
          <div className="space-y-4">
            {BOTTLENECKS.map((b) => (
              <Bar
                key={b.key}
                label={b.key}
                value={b.severity}
                max={100}
                tone={b.status === "critical" ? "destructive" : b.status === "moderate" ? "cyan" : "primary"}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Diagnosis detail" subtitle="Simulated reasoning behind each signal">
          <ul className="space-y-3">
            {BOTTLENECKS.map((b) => (
              <li key={b.key} className="rounded-xl border border-border/70 bg-secondary/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.key}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      b.status === "critical"
                        ? "bg-destructive/15 text-destructive"
                        : b.status === "moderate"
                          ? "bg-cyan/15 text-cyan"
                          : "bg-primary/15 text-primary"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{b.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
