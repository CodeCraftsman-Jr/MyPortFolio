import { useContent } from "@/content/ContentProvider";

export function SiteFooter() {
  const { site, products } = useContent();
  return (
    <footer className="pf-foot">
      <div className="pf-wrap pf-foot-grid">
        <div>
          <p className="pf-foot-name">{site.name}</p>
          <p className="pf-copy m-0">{site.role}. Based in {site.place}.</p>
        </div>
        <nav aria-label="VarSys products">
          <p className="pf-label">Products</p>
          <ul className="pf-foot-links">
            {products.filter((p) => p.url).map((p) => (
              <li key={p.slug}>
                <a className="pf-foot-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="pf-wrap pf-foot-row">
        <p className="pf-label m-0">
          (c) {new Date().getFullYear()} {site.name} / VarSys
        </p>
        <p className="pf-label m-0">{site.coords}</p>
      </div>
    </footer>
  );
}
