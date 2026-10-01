import { person } from "@/data/site";
import { products } from "@/data/ecosystem";

export function SiteFooter() {
  return (
    <footer className="pf-foot">
      <div className="pf-wrap pf-foot-grid">
        <div>
          <p className="pf-foot-name">{person.name}</p>
          <p className="pf-copy m-0">{person.role}. Based in {person.place}.</p>
        </div>
        <nav aria-label="VarSys products">
          <p className="pf-label">Products</p>
          <ul className="pf-foot-links">
            {products.map((p) => (
              <li key={p.id}>
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
          (c) {new Date().getFullYear()} {person.name} / VarSys
        </p>
        <p className="pf-label m-0">{person.coords}</p>
      </div>
    </footer>
  );
}
