import { ArrowUpRight, Play } from "lucide-react";
import { channels, kitchen } from "@/data/site";
import { Reveal } from "./Reveal";

export function Beyond() {
  return (
    <section id="beyond" data-section="beyond" className="pf-section" tabIndex={-1} aria-labelledby="beyond-title">
      <div className="pf-wrap">
        <Reveal className="pf-head">
          <p className="pf-label pf-eyebrow">
            <span className="pf-eyebrow-tag">Off-screen</span> Kitchen + channels
          </p>
          <h2 id="beyond-title" className="pf-h2">
            Not everything
            <br />
            <span className="pf-h2-soft">I run is software.</span>
          </h2>
        </Reveal>

        <div className="pf-beyond">
          <Reveal className="pf-panel pf-kitchen">
            <p className="pf-label pf-label-accent m-0">Restaurant / {kitchen.area}</p>
            <h3 className="pf-kitchen-title">{kitchen.name}</h3>
            <p className="pf-copy m-0">{kitchen.about}</p>
            <div className="pf-ticket" aria-label="What the kitchen offers">
              <div className="pf-ticket-row">
                <span>Cuisine</span>
                <span>Home-style Indian</span>
              </div>
              <div className="pf-ticket-row">
                <span>Service</span>
                <span>Delivery + takeaway</span>
              </div>
              <div className="pf-ticket-row">
                <span>Runs on</span>
                <span>CookSuite</span>
              </div>
            </div>
            <div className="pf-hero-cta">
              <a className="pf-btn pf-btn-main" href={kitchen.swiggy} target="_blank" rel="noopener noreferrer">
                Order on Swiggy
                <ArrowUpRight className="pf-btn-icon" aria-hidden="true" />
              </a>
              <a className="pf-btn" href={kitchen.zomato} target="_blank" rel="noopener noreferrer">
                Order on Zomato
                <ArrowUpRight className="pf-btn-icon" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <ul className="pf-channels">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 0.06}>
                <a className="pf-panel pf-channel" href={c.url} target="_blank" rel="noopener noreferrer">
                  <span className="pf-channel-play">
                    <Play size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="pf-label">{c.kind}</span>
                    <span className="pf-channel-name block">{c.name}</span>
                    <span className="pf-channel-about block">{c.about}</span>
                  </span>
                  <ArrowUpRight className="pf-channel-arrow" aria-hidden="true" />
                  <span className="sr-only">(YouTube, opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.2}>
              <a
                className="pf-panel pf-channel"
                href="https://www.swaggamerz444.store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="pf-channel-play">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="pf-label">Blog</span>
                  <span className="pf-channel-name block">Swag Gamerz blog</span>
                  <span className="pf-channel-about block">Reviews, news and the gaming community.</span>
                </span>
                <ArrowUpRight className="pf-channel-arrow" aria-hidden="true" />
              </a>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
