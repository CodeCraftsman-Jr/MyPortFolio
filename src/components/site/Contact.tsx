import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useContent } from "@/content/ContentProvider";
import { phoneLink } from "@/lib/planScope";
import { Reveal } from "./Reveal";

// No backend: the form drafts an email in the visitor's own mail app.
export function Contact() {
  const { site, socials } = useContent();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const send = (e: FormEvent) => {
    e.preventDefault();
    const who = [name.trim(), company.trim()].filter(Boolean).join(", ");
    const subject = encodeURIComponent(`Enquiry from ${who || "the portfolio"}`);
    const body = encodeURIComponent(`${message.trim()}\n\n${who}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" data-section="contact" className="pf-section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="pf-wrap pf-contact">
        <Reveal>
          <p className="pf-label pf-eyebrow">
            {site.available && <span className="pf-led" />}
            {site.available ? "Available for new projects" : "Contact"}
          </p>
          <h2 id="contact-title" className="pf-contact-title">
            {site.contactTitle} {site.contactAccent && <span className="pf-hero-accent">{site.contactAccent}</span>}
          </h2>
          <p className="pf-lead">{site.contactText}</p>
          <p className="mt-6">
            <a className="pf-link pf-mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <div className="pf-socials">
            {site.phone && (
              <a className="pf-btn" href={phoneLink(site.phone)}>
                <Phone size={15} aria-hidden="true" />
                {site.phone}
              </a>
            )}
            {socials.map((s) => (
              <a key={s.url} className="pf-btn" href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
                <ArrowUpRight className="pf-btn-icon" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="pf-panel pf-form" onSubmit={send}>
            <div className="pf-form-row">
              <div className="pf-field">
                <label className="pf-label" htmlFor="pf-name">
                  Your name
                </label>
                <input
                  id="pf-name"
                  className="pf-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="pf-field">
                <label className="pf-label" htmlFor="pf-company">
                  Company (optional)
                </label>
                <input
                  id="pf-company"
                  className="pf-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                />
              </div>
            </div>
            <div className="pf-field">
              <label className="pf-label" htmlFor="pf-message">
                About the project
              </label>
              <textarea
                id="pf-message"
                className="pf-input pf-input-area"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What it should do, who uses it, and any deadline."
                required
              />
            </div>
            <button type="submit" className="pf-btn pf-btn-main">
              <Mail size={16} aria-hidden="true" />
              Write the email
            </button>
            <p className="pf-form-note">Opens your mail app with this message filled in.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
