import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import { organSearchEntries, type OrganSearchEntry } from "../data/organSearch";
import type { BodyVariant } from "../data/anatomy";
import { hasReferenceTarget } from "../data/referenceAtlas";

export function OrganSearch({ variant, onSelect }: { variant: BodyVariant; onSelect: (entry: OrganSearchEntry) => void }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const results = organSearchEntries.filter((entry) => hasReferenceTarget(variant, entry.id) && `${entry.label} ${entry.aliases}`.toLowerCase().includes(query.trim().toLowerCase()));
  const expanded = open && query.trim().length > 0;
  function select(entry: OrganSearchEntry) { setQuery(entry.label); setOpen(false); setActive(-1); onSelect(entry); }
  return <div className="organ-search" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <label htmlFor={id}>Find an organ</label>
    <div className="organ-search-input"><Search size={16} aria-hidden="true" /><input id={id} type="text" role="combobox" aria-label="Search organs" aria-autocomplete="list" aria-expanded={expanded} aria-controls={`${id}-results`} aria-activedescendant={expanded && active >= 0 ? `${id}-${results[active]?.id}` : undefined} autoComplete="off" placeholder="Search organs, e.g. lungs or kidneys" value={query}
      onFocus={() => setOpen(true)} onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(-1); }} onKeyDown={(event) => {
        if (event.key === "Escape") { setOpen(false); setActive(-1); }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); if (results.length) setActive((index) => event.key === "ArrowDown" ? (index + 1) % results.length : index < 0 ? results.length - 1 : (index - 1 + results.length) % results.length); }
        if (event.key === "Enter" && expanded && results.length) { event.preventDefault(); select(results[Math.max(active, 0)]); }
      }} />{query && <button type="button" aria-label="Clear organ search" onClick={() => { setQuery(""); setOpen(false); setActive(-1); }}><X size={15} /></button>}</div>
    {expanded && <ul id={`${id}-results`} role="listbox" aria-label="Organ search results">{results.map((entry, index) => <li key={entry.id} id={`${id}-${entry.id}`} role="option" aria-selected={active === index} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setActive(index)} onClick={() => select(entry)}><strong>{entry.label}</strong><span>View in the diagram</span></li>)}{!results.length && <li role="presentation" className="organ-search-empty">No matching organs in this reference. Try another name.</li>}</ul>}
  </div>;
}
