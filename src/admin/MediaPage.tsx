import { useEffect, useRef, useState } from "react";
import { Check, Copy, Trash2, Upload } from "lucide-react";
import { adminApi, type Media } from "./adminApi";

/** Upload images and copy their public links into image fields. */
export function MediaPage({ canDelete, uploads }: { canDelete: boolean; uploads: boolean }) {
  const [media, setMedia] = useState<Media[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const picker = useRef<HTMLInputElement>(null);

  const load = () => adminApi.listMedia().then(setMedia).catch((err) => setError((err as Error).message));
  useEffect(() => {
    void load();
  }, []);

  const send = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      await adminApi.upload([...files], "");
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
      if (picker.current) picker.current.value = "";
    }
  };

  const copy = async (item: Media) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(item.id);
    } catch {
      setError("Copy failed. Select the link text and copy it by hand.");
    }
  };

  const remove = async (item: Media) => {
    if (!window.confirm(`Delete ${item.fileName}? Pages using its link will show a broken image.`)) return;
    try {
      await adminApi.deleteMedia(item.id);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="pf-ad-page">
      <section className="pf-ad-pane pf-ad-pane-on pf-ad-single" aria-label="Media">
        <div className="pf-ad-pane-head">
          <h2 className="pf-ad-pane-title">Media</h2>
          <input ref={picker} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" multiple className="sr-only" id="pf-ad-upload" onChange={(e) => send(e.target.files)} />
          <label htmlFor="pf-ad-upload" className={`pf-ad-btn pf-ad-btn-main ${!uploads || busy ? "pf-ad-btn-off" : ""}`} aria-disabled={!uploads || busy}>
            <Upload size={14} aria-hidden="true" />
            {busy ? "Uploading" : "Upload images"}
          </label>
        </div>
        {!uploads && <p className="pf-ad-note">Uploads are not set up on this server yet. Paste image links from elsewhere in the meantime.</p>}
        {error && <p className="pf-ad-error" role="alert">{error}</p>}
        <ul className="pf-ad-media">
          {media.map((item) => (
            <li key={item.id} className="pf-ad-media-card">
              <img src={item.url} alt={item.altText || item.fileName} loading="lazy" />
              <div className="pf-ad-media-meta">
                <span className="pf-ad-media-name">{item.fileName}</span>
                <span className="pf-ad-hint">{Math.round(item.byteSize / 1024)} KB</span>
              </div>
              <div className="pf-ad-media-tools">
                <button type="button" className="pf-ad-btn" onClick={() => copy(item)}>
                  {copied === item.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  {copied === item.id ? "Copied" : "Copy link"}
                </button>
                {canDelete && (
                  <button type="button" className="pf-ad-icon pf-ad-icon-danger" onClick={() => remove(item)} aria-label={`Delete ${item.fileName}`}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </li>
          ))}
          {!media.length && <li className="pf-ad-empty">No images uploaded yet.</li>}
        </ul>
      </section>
    </div>
  );
}
