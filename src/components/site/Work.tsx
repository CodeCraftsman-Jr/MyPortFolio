import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@shared/portfolio";
import { useContent } from "@/content/ContentProvider";
import { Reveal } from "./Reveal";
import { useTilt } from "./useTilt";
import { SectionHead } from "./SectionHead";

const kindLabel: Record<Project["category"], string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  ai: "Vision / AI",
  automation: "Automation",
};

function WorkCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const tilt = useTilt(5);
  return (
    <button type="button" className="pf-panel pf-tilt pf-work" onClick={onOpen} {...tilt}>
      <div className="pf-work-media">
        <img
          className="pf-work-img"
          src={project.image}
          alt=""
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
        />
        <span className="pf-label pf-work-kind">{kindLabel[project.category]}</span>
      </div>
      <div className="pf-work-body">
        <h3 className="pf-work-title">{project.title}</h3>
        <p className="pf-work-text">{project.shortDescription}</p>
        <ul className="pf-tags">
          {project.tags.slice(0, 3).map((t) => (
            <li key={t} className="pf-tag">
              {t.replace(/\s+/g, "")}
            </li>
          ))}
        </ul>
        <span className="pf-label pf-work-open">
          View case study
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}

function WorkDetail({ project }: { project: Project }) {
  return (
    <>
      <img className="pf-dialog-media" src={project.image} alt="" width={1200} height={514} />
      <div className="pf-dialog-body">
        <div>
          <p className="pf-label pf-label-accent">{kindLabel[project.category]} project</p>
          <Dialog.Title className="pf-dialog-title">{project.title}</Dialog.Title>
        </div>
        <Dialog.Description className="pf-lead m-0">{project.fullDescription}</Dialog.Description>

        <div className="pf-dialog-cols">
          <div>
            <p className="pf-label">What it does</p>
            <ul className="pf-ticks">
              {project.features.map((f) => (
                <li key={f} className="pf-tick">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="pf-label">Built with</p>
            <ul className="pf-ticks">
              {project.technologies.map((t) => (
                <li key={t.name} className="pf-tick">
                  <span>
                    <strong>{t.name}</strong> - {t.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-3">
          <p className="pf-label">Challenges</p>
          {project.challenges.map((c) => (
            <div key={c.title} className="pf-problem">
              <strong>{c.title}</strong>
              <p>{c.description}</p>
              <p>
                <span className="pf-label pf-label-accent">Solution </span>
                {c.solution}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-3">
          <p className="pf-label">Timeline</p>
          <ol className="pf-phases m-0 p-0 list-none">
            {project.timeline.map((t) => (
              <li key={t.phase} className="pf-phase">
                <span className="pf-label">{t.duration}</span>
                <strong>{t.phase}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export function Work() {
  const { site, projects } = useContent();
  const head = site.sections.work;
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openId) ?? null;

  return (
    <section id="work" data-section="work" className="pf-section" tabIndex={-1} aria-labelledby="work-title">
      <div className="pf-wrap">
        <SectionHead id="work-title" tag={head.tag} title={head.title}>
          {head.lead}
        </SectionHead>

        <ul className="pf-work-list">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
              <WorkCard project={p} onOpen={() => setOpenId(p.slug)} />
            </Reveal>
          ))}
        </ul>
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(v) => !v && setOpenId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="pf-dialog-scrim" />
          <Dialog.Content className="pf-dialog" data-lenis-prevent>
            {open && <WorkDetail project={open} />}
            <Dialog.Close className="pf-icon-btn pf-dialog-close" aria-label="Close">
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
