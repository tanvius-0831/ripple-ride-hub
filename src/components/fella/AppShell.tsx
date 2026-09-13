import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Activity,
  Dna,
  GitBranch,
  LayoutDashboard,
  Radar,
  Sparkles,
  Car,
} from "lucide-react";
import { COMMUNITY, DISCLAIMER } from "@/lib/fella-data";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/community-dna", label: "Community DNA", icon: Dna },
  { to: "/bottleneck", label: "Bottleneck", icon: Activity },
  { to: "/seed-finder", label: "Seed Finder", icon: Radar },
  { to: "/ripple-simulator", label: "Ripple Simulator", icon: Sparkles },
  { to: "/ride-matches", label: "Ride Matches", icon: Car },
  { to: "/network-growth", label: "Network Growth", icon: GitBranch },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-lg">
                🦋
              </span>
              <span className="leading-tight">
                <span className="block text-base font-semibold tracking-tight">FellaFlow</span>
                <span className="block text-[11px] text-muted-foreground">
                  Community Activation Engine
                </span>
              </span>
            </Link>
            <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] text-muted-foreground">
              {COMMUNITY.name}, {COMMUNITY.city} · Simulated demo data
            </span>
          </div>
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="flex shrink-0 items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground data-[status=active]:border-primary/40 data-[status=active]:bg-primary/15 data-[status=active]:text-primary"
              >
                <item.icon className="size-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
        <footer className="mt-12 rounded-2xl border border-border/70 bg-secondary/30 p-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Safety &amp; Privacy · </span>
          {DISCLAIMER}
        </footer>
      </main>
    </div>
  );
}
