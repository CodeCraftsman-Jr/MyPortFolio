import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadProps {
  id: string;
  tag: string;
  title: ReactNode;
  children?: ReactNode;
}

export function SectionHead({ id, tag, title, children }: SectionHeadProps) {
  return (
    <Reveal className="pf-head">
      <p className="pf-label pf-label-accent">{tag}</p>
      <h2 id={id} className="pf-h2">
        {title}
      </h2>
      {children && <p className="pf-lead">{children}</p>}
    </Reveal>
  );
}
