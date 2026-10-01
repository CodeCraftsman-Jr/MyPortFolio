import { person } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="pf-foot">
      <div className="pf-wrap pf-foot-row">
        <p className="pf-label m-0">
          (c) {new Date().getFullYear()} {person.name} / VarSys
        </p>
        <p className="pf-label m-0">
          {person.place} / {person.coords}
        </p>
      </div>
    </footer>
  );
}
