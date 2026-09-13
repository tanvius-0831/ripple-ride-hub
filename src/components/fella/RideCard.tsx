import { useState } from "react";
import { Car, Clock, Mic, Route as RouteIcon, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RouteMap } from "./RouteMap";
import { AudioSafety } from "./AudioSafety";
import type { Ride } from "@/lib/fella-data";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/60 px-2.5 py-1 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

export function RideCard({ ride }: { ride: Ride }) {
  const [openRoute, setOpenRoute] = useState(false);
  const [openRide, setOpenRide] = useState(false);

  return (
    <article className="panel flex flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{ride.driver}</h3>
          <p className="text-xs text-muted-foreground">
            {ride.origin} → Campus · {ride.departure}
          </p>
        </div>
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
          {ride.compatibility}% match
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Chip>
          <Car className="size-3" /> {ride.vehicle.model} • {ride.vehicle.type}
        </Chip>
        <Chip>
          <Users className="size-3" /> {ride.vehicle.availableSeats} of {ride.vehicle.capacity} seats
          available
        </Chip>
        <Chip>
          <Clock className="size-3" /> {ride.departure}
        </Chip>
      </div>

      <ul className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
        {ride.signals.map((s) => (
          <li key={s}>
            <span className="text-primary">✓</span> {s}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {ride.womenOnly ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-violet/15 px-2.5 py-1 text-[11px] text-violet">
            🛡 Women-only ride
          </span>
        ) : (
          ride.womenOnlyAvailable && <Chip>🛡 Women-only available</Chip>
        )}
        {ride.audioAvailable && <Chip>🎙 Audio recording available</Chip>}
        {ride.verified && <Chip>✓ Verified community member</Chip>}
      </div>

      <div className="mt-auto flex gap-2 pt-1">
        <Button size="sm" variant="secondary" onClick={() => setOpenRoute(true)}>
          <RouteIcon className="size-4" /> View Route
        </Button>
        <Button size="sm" onClick={() => setOpenRide(true)}>
          View Ride
        </Button>
      </div>

      <Dialog open={openRoute} onOpenChange={setOpenRoute}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>📍 Route · {ride.driver}</DialogTitle>
            <DialogDescription>Simulated route data for the demo community.</DialogDescription>
          </DialogHeader>
          <RouteMap ride={ride} />
        </DialogContent>
      </Dialog>

      <RideDetailsDialog ride={ride} open={openRide} onOpenChange={setOpenRide} />
    </article>
  );
}

export function RideDetailsDialog({
  ride,
  open,
  onOpenChange,
}: {
  ride: Ride;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ride Details</DialogTitle>
          <DialogDescription>
            Simulated demo ride — not a real person or a real booking.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <Field label="Driver" value={ride.driver} />
            <Field
              label="Route"
              value={[ride.origin, ride.via, ride.destination].filter(Boolean).join(" → ")}
            />
            <Field label="Departure" value={ride.departure} />
            <Field
              label="🚗 Vehicle"
              value={`${ride.vehicle.model} · ${ride.vehicle.type} · ${ride.vehicle.capacity} seats · ${ride.vehicle.availableSeats} available`}
            />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Safety preferences
              </p>
              <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                <li>
                  <ShieldCheck className="mr-1 inline size-3 text-primary" /> Verified community
                  member
                </li>
                <li>🛡 Women-only option {ride.womenOnly ? "(enabled)" : "(available)"}</li>
                <li>
                  <Mic className="mr-1 inline size-3 text-primary" /> Audio recording available
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <RouteMap ride={ride} />
            <AudioSafety rideLabel={`${ride.driver} · ${ride.departure}`} />
            <p className="text-[11px] text-muted-foreground">
              Audio recording requires consent from all participants.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
