import { Clock, MapPin, Users } from "lucide-react";
import type { Ride } from "@/lib/fella-data";

export function RouteMap({ ride, compact = false }: { ride: Ride; compact?: boolean }) {
  const stops = [ride.origin, ride.via, ride.destination].filter(Boolean) as string[];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/70 bg-[linear-gradient(180deg,oklch(0.22_0.03_254),oklch(0.19_0.03_254))] p-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.85 0.16 165) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.16 165) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex items-start gap-3">
        <svg viewBox="0 0 40 120" className="h-28 w-8 shrink-0" aria-hidden>
          <path
            d="M12 12 C 34 40, 6 70, 28 108"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            className="animate-dash"
            opacity="0.85"
          />
          <circle cx="12" cy="12" r="5" fill="var(--color-primary)" />
          <circle cx="20" cy="60" r="4" fill="var(--color-cyan)" />
          <circle cx="28" cy="108" r="5" fill="var(--color-violet)" />
        </svg>

        <ol className="flex h-28 flex-1 flex-col justify-between py-1">
          {stops.map((stop, i) => (
            <li key={stop} className="text-xs">
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                {i === 0 ? "Start" : i === stops.length - 1 ? "Destination" : "Via"}
              </span>
              <span className="font-medium text-foreground">{stop}</span>
            </li>
          ))}
        </ol>
      </div>

      {!compact && (
        <div className="relative mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2 py-1">
            <Clock className="size-3" /> {ride.departure}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2 py-1">
            <Users className="size-3" /> {ride.vehicle.availableSeats} seats available
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2 py-1">
            <MapPin className="size-3" /> Simulated route
          </span>
        </div>
      )}
      {compact && (
        <span className="relative mt-2 block text-[10px] uppercase tracking-wider text-muted-foreground">
          Simulated route
        </span>
      )}
    </div>
  );
}
