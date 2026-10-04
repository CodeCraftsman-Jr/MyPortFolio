import { ArrowUpRight } from "lucide-react";
import type { Product } from "@shared/portfolio";
import { useContent } from "@/content/ContentProvider";
import { useSiteStatus, type SiteStatus } from "@/hooks/useSiteStatus";
import { ProductMark } from "./ProductMark";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { StatusDot } from "./StatusDot";
import { useTilt } from "./useTilt";

function ProductCard({ product, status }: { product: Product; status: SiteStatus }) {
  const tilt = useTilt(4);
  return (
    <article className={`pf-panel pf-tilt pf-app pf-tone-${product.tone}`} {...tilt} aria-labelledby={`app-${product.slug}`}>
      <div className="pf-app-top">
        <div className="min-w-0">
          <p className="pf-label">{product.kind}</p>
          <h3 id={`app-${product.slug}`} className="pf-app-name">
            {product.name}
          </h3>
          <p className="pf-app-line">{product.line}</p>
        </div>
        <ProductMark kind={product.mark} />
      </div>

      <div className="pf-app-body">
        <p className="pf-app-about">{product.about}</p>
        <ul className="pf-app-points">
          {product.points.map((p) => (
            <li key={p} className="pf-app-point">
              {p}
            </li>
          ))}
        </ul>
      </div>

      {product.url && (
        <div className="pf-app-foot">
          <a className="pf-app-host" href={product.url} target="_blank" rel="noopener noreferrer">
            {product.host || product.url.replace(/^https?:\/\//, "")}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <StatusDot status={status} />
        </div>
      )}
    </article>
  );
}

export function Products() {
  const { site, products } = useContent();
  const status = useSiteStatus(products.map((p) => p.url).filter(Boolean));
  const checked = products.filter((p) => p.url);
  const up = checked.filter((p) => status[p.url] === "online").length;
  const done = checked.every((p) => status[p.url] && status[p.url] !== "checking");
  const head = site.sections.products;

  return (
    <section id="products" data-section="products" className="pf-section" tabIndex={-1} aria-labelledby="products-title">
      <div className="pf-wrap">
        <SectionHead id="products-title" tag={head.tag} title={head.title}>
          {head.lead}
        </SectionHead>

        {checked.length > 0 && (
          <p className="pf-label pf-uptime" aria-live="polite">
            <span className={`pf-status-dot ${done ? "pf-status-dot-online" : ""}`} aria-hidden="true" />
            {done ? `${up} of ${checked.length} sites answering` : "Checking sites"}
          </p>
        )}

        <div className="pf-apps">
          {products.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 0.05}
              className={i === 0 ? "pf-app-wide" : i === products.length - 1 && products.length % 2 === 0 ? "pf-app-last" : undefined}
            >
              <ProductCard product={p} status={status[p.url] ?? "checking"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
