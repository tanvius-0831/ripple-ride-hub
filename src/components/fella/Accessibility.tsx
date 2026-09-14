import { Accessibility as AccessibilityIcon, HeartPulse } from "lucide-react";
import type { AccessibilityNeed, HealthNeed, Ride } from "@/lib/fella-data";
import { accessibilityCompatible, PRIVACY_NOTE } from "@/lib/fella-data";

export function AccessibilityNeeds({ needs }: { needs: AccessibilityNeed[] }) {
  const none = needs.length === 0 || needs[0] === "No additional assistance required";
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <AccessibilityIcon className="size-3" /> Accessibility needs
      </p>
      {none ? (
        <p className="mt-1 text-xs text-muted-foreground">No additional assistance required</p>
      ) : (
        <ul className="mt-1 space-y-0.5 text-xs">
          {needs.map((n) => (
            <li key={n}>
              <span className="text-primary">✓</span> {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function HealthNeeds({ needs, note }: { needs: HealthNeed[]; note?: string }) {
  const none = needs.length === 0 || needs[0] === "No health-related support needed";
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <HeartPulse className="size-3" /> Health &amp; support needs
      </p>
      {none ? (
        <p className="mt-1 text-xs text-muted-foreground">No health-related support needed</p>
      ) : (
        <ul className="mt-1 space-y-0.5 text-xs">
          {needs.map((n) => (
            <li key={n}>
              <span className="text-primary">✓</span> {n}
            </li>
          ))}
          {note && <li className="text-muted-foreground">“{note}”</li>}
        </ul>
      )}
      <p className="mt-2 text-[10px] text-muted-foreground">{PRIVACY_NOTE}</p>
    </div>
  );
}

export function VehicleAccessibility({ ride }: { ride: Ride }) {
  const v = ride.vehicle;
  const features = [
    v.wheelchairAccessible && "Wheelchair compatible",
    v.stepFreeEntry && "Step-free entry",
    v.extraLuggageSpace && "Extra luggage space",
  ].filter(Boolean) as string[];
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Accessibility</p>
      {features.length ? (
        <ul className="mt-1 space-y-0.5 text-xs">
          {features.map((f) => (
            <li key={f}>
              <span className="text-primary">✓</span> {f}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">
          No accessibility features listed for this simulated vehicle
        </p>
      )}
    </div>
  );
}

export function AccessibilityMatch({
  ride,
  needs,
}: {
  ride: Ride;
  needs: AccessibilityNeed[];
}) {
  const ok = accessibilityCompatible(ride, needs);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${
        ok ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
      }`}
    >
      <AccessibilityIcon className="size-3" />
      Accessibility {ok ? "✓ Compatible" : "✕ Not compatible"}
    </span>
  );
}

export function ScoreBreakdownList({ ride }: { ride: Ride }) {
  const b = ride.scoreBreakdown;
  const rows: [string, number, number][] = [
    ["Route", b.route, 40],
    ["Timing", b.timing, 25],
    ["Capacity", b.capacity, 20],
    ["Accessibility", b.accessibility, 10],
    ["Preference", b.preference, 5],
  ];
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {ride.compatibility}% match — rule-based breakdown
      </p>
      <ul className="mt-1 space-y-0.5 font-mono text-xs text-muted-foreground">
        {rows.map(([l, v, m]) => (
          <li key={l} className="flex justify-between">
            <span>{l}</span>
            <span className="text-foreground">
              {v}/{m}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
