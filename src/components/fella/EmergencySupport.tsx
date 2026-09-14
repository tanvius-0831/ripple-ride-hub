import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EMERGENCY_OPTIONS } from "@/lib/fella-data";
import type { EmergencyContact } from "@/lib/fella-data";

export function EmergencySupport({ contact }: { contact: EmergencyContact }) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
      <h4 className="text-sm font-semibold">Emergency support</h4>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Simulated demo contacts. No real numbers and no real emergency services.
      </p>
      <div className="mt-3 grid gap-2">
        {EMERGENCY_OPTIONS.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => setPicked(o.label)}
            className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/40 px-3 py-2 text-left text-xs transition-colors hover:border-primary/50"
          >
            <span aria-hidden>{o.icon}</span>
            <span>
              <span className="block font-medium text-foreground">{o.label}</span>
              <span className="block text-[11px] text-muted-foreground">{o.detail}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-border/70 bg-background/40 p-3">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Emergency contact
        </p>
        <p className="mt-1 text-sm font-medium">{contact.name}</p>
        <p className="text-xs text-muted-foreground">Relationship: {contact.relationship}</p>
        <span className="mt-2 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">
          Shared with consent
        </span>
      </div>

      <Dialog open={picked !== null} onOpenChange={(o) => !o && setPicked(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo emergency action</DialogTitle>
            <DialogDescription>
              {picked} selected. This prototype does not place real calls or contact real emergency
              services. No real emergency call has been placed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setPicked(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
