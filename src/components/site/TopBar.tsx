import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { sections, useActiveSection } from "@/lib/activeSection";
import { useJump } from "@/lib/jumpTo";
import { setTheme, useTheme } from "@/hooks/useTheme";

const links = sections.filter((s) => s.id !== "home" && s.id !== "plan");
const menuLinks = sections.filter((s) => s.id !== "home");

export function TopBar() {
  const active = useActiveSection();
  const jump = useJump();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const check = () => setSolid(window.scrollY > 24);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    jump(id);
  };

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className={`pf-bar ${solid || open ? "pf-bar-solid" : ""}`}>
      <div className="pf-wrap pf-bar-row">
        <a
          href="#home"
          className="pf-brand"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
        >
          <span className="pf-brand-mark">VE</span>
          <span className="pf-brand-text">
            Vasanthan E<span className="pf-brand-sub">VarSys</span>
          </span>
        </a>

        <nav className="pf-nav" aria-label="Sections">
          {links.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`pf-nav-link ${active === s.id ? "pf-nav-link-on" : ""}`}
              aria-current={active === s.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(s.id);
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="pf-bar-tools">
          <button
            type="button"
            className="pf-icon-btn"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} theme`}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <a
            href="#plan"
            className="pf-btn pf-btn-main pf-bar-hire"
            onClick={(e) => {
              e.preventDefault();
              go("plan");
            }}
          >
            Plan a project
          </a>
          <button
            type="button"
            className="pf-icon-btn pf-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="pf-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div id="pf-menu" className="pf-menu">
          <ul className="pf-wrap pf-menu-list">
            {menuLinks.map((s, i) => (
              <li key={s.id}>
                <button type="button" className="pf-menu-link" onClick={() => go(s.id)}>
                  <span>{s.label}</span>
                  <span>{String(i + 2).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
