import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { person, socials } from "@/data/site";
import { Reveal } from "./Reveal";

// No backend: the form drafts an email in the visitor's own mail app.
export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${name.trim() || "the portfolio"}`);
    const body = encodeURIComponent(`${message.trim()}\n\n- ${name.trim()}`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" data-section="contact" className="pf-section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="pf-wrap pf-contact">
        <Reveal>
          <p className="pf-label pf-eyebrow">
            <span className="pf-led" />
            Taking new work
          </p>
          <h2 id="contact-title" className="pf-contact-title">
            Let's build
            <br />
            <em>the next one.</em>
          </h2>
          <p className="pf-lead">
            A product, an internal tool, or a website that has to actually work. Tell me what it should do; I
            usually reply within a day.
          </p>
          <p className="mt-6">
            <a className="pf-link pf-mail" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </p>
          <div className="pf-socials">
            <a className="pf-btn" href={person.phoneLink}>
              <Phone size={15} aria-hidden="true" />
              {person.phone}
            </a>
            {socials.map((s) => (
              <a key={s.id} className="pf-btn" href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
                <ArrowUpRight className="pf-btn-icon" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="pf-panel pf-form" onSubmit={send}>
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
              <label className="pf-label" htmlFor="pf-message">
                What should it do?
              </label>
              <textarea
                id="pf-message"
                className="pf-input pf-input-area"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A booking app for my clinic, with payments..."
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
