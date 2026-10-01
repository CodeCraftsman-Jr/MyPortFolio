import { ArrowUpRight } from "lucide-react";
import { products, type Product } from "@/data/ecosystem";
import { ProductMark } from "./ProductMark";
import { Reveal } from "./Reveal";
import { useTilt } from "./useTilt";

function AppCard({ product }: { product: Product }) {
  const tilt = useTilt(6);
  return (
    <article
      className={`pf-panel pf-tilt pf-app pf-tone-${product.tone}`}
      {...tilt}
      aria-labelledby={`app-${product.id}`}
    >
      <div className="pf-app-top">
        <div>
          <h3 id={`app-${product.id}`} className="pf-app-name">
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

      <div className="pf-app-foot">
        {product.url ? (
          <a className="pf-app-host" href={product.url} target="_blank" rel="noopener noreferrer">
            {product.host}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <span className="pf-label">Ships via VarSys Store</span>
        )}
        <span className="pf-label">{product.mark === "orbit" ? "Hub" : "App"}</span>
      </div>
    </article>
  );
}

export function Ecosystem() {
  return (
    <section id="apps" data-section="apps" className="pf-section" tabIndex={-1} aria-labelledby="apps-title">
      <div className="pf-wrap">
        <Reveal className="pf-head">
          <p className="pf-label pf-eyebrow">
            <span className="pf-eyebrow-tag">Products</span> The VarSys suite
          </p>
          <h2 id="apps-title" className="pf-h2">
            One founder.
            <br />
            <span className="pf-h2-soft">Seven working products.</span>
          </h2>
          <p className="pf-lead">
            Each app solves one problem I or the people around me actually had: a shared household book, a meter
            that reads its own bills, a kitchen that knows its plate cost. They ship through one release
            pipeline and share one design language.
          </p>
        </Reveal>

        <div className="pf-apps">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06} className={i === 0 || i === 5 ? "pf-app-wide" : i === products.length - 1 ? "pf-app-last" : undefined}>
              <AppCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
