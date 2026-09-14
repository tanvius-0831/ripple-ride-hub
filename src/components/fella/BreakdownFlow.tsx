import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { findAlternatives } from "@/lib/fella-data";
import type { AccessibilityNeed, Ride } from "@/lib/fella-data";
import { AccessibilityMatch } from "./Accessibility";

const STEPS = [
  "Same route found",
  "Similar departure time",
  "Seats available",
  "Accessibility compatible",
];

export function BreakdownFlow({
  ride,
  needs = [],
  womenOnly = false,
}: {
  ride: Ride;
  needs?: AccessibilityNeed[];
  womenOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);

  const alternatives = findAlternatives(ride, needs, womenOnly);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setRequested(null);
    const t = setInterval(() => setStep((s) => (s >= STEPS.length ? s : s + 1)), 600);
    return () => clearInterval(t);
  }, [open]);

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        <Wrench className="size-4" /> Vehicle Breakdown?
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Need an alternative ride?</DialogTitle>
            <DialogDescription>
              Simulated matching flow only — FellaFlow does not provide roadside assistance or
              guarantee an alternative ride.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
            <p className="text-[10px] uppercase tracking-wider text-destructive">
              Breakdown detected
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Searching community network…</p>
            <ul className="mt-2 space-y-1 text-xs">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={`transition-opacity duration-500 ${
                    i < step ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span className="text-primary">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {step >= STEPS.length && (
            <div className="space-y-3">
              {alternatives.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No compatible alternative ride in this simulated community right now.
                </p>
              )}
              {alternatives.map((a, i) => (
                <article key={a.id} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Alternative ride #{i + 1}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{a.driver}</h4>
                    <span className="text-xs font-semibold text-primary">
                      {a.compatibility}% compatibility
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.origin} → Campus · {a.departure}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    🚗 {a.vehicle.type} · {a.vehicle.model} · {a.vehicle.availableSeats} seats
                    available
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <AccessibilityMatch ride={a} needs={needs} />
                    {a.womenOnlyAvailable && (
                      <span className="rounded-full bg-violet/15 px-2.5 py-1 text-[11px] text-violet">
                        Women-only preference ✓ Compatible
                      </span>
                    )}
                  </div>
                  {requested === a.id ? (
                    <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
                      ✓ Alternative ride requested (demo confirmation only)
                    </p>
                  ) : (
                    <Button className="mt-3" size="sm" onClick={() => setRequested(a.id)}>
                      Request Alternative →
                    </Button>
                  )}
                </article>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
