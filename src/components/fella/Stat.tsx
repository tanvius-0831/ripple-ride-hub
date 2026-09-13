import type { ReactNode } from "react";

export function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        {icon}
      </div>
      <p className="stat-value mt-2 text-primary">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel p-5 ${className}`}>
      <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Bar({ label, value, max, tone = "primary" }: { label: string; value: number; max: number; tone?: "primary" | "cyan" | "violet" | "destructive" }) {
  const pct = Math.round((value / max) * 100);
  const bg = {
    primary: "bg-primary",
    cyan: "bg-cyan",
    violet: "bg-violet",
    destructive: "bg-destructive",
  }[tone];
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
        <div className={`h-full rounded-full ${bg} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
