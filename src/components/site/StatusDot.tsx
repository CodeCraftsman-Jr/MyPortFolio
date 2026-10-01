import { statusText, type SiteStatus } from "@/hooks/useSiteStatus";

export function StatusDot({ status, quiet = false }: { status: SiteStatus; quiet?: boolean }) {
  return (
    <span className={`pf-status pf-status-${status}`}>
      <span className="pf-status-dot" aria-hidden="true" />
      <span className={quiet ? "sr-only" : undefined}>{statusText[status]}</span>
    </span>
  );
}
