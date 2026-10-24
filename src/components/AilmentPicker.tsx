import { useState } from "react";
import { ailments } from "../data/ailments";

export function AilmentPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const results = ailments.filter((entry) => entry.id === value || `${entry.name} ${entry.id}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="ailment-picker card" aria-label="Choose an ailment first">
    <div><span className="eyebrow">1. CHOOSE THE AILMENT</span><h2>What would you like to explore?</h2><p>Choose an ailment to see its documented medication examples, then select a medicine and run its simulation.</p></div>
    <div><label htmlFor="ailment-search">Find an ailment</label><input id="ailment-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ailments or condition groups" />
      <label htmlFor="explorer-ailment">Ailment</label><select id="explorer-ailment" value={value} onChange={(event) => { setQuery(""); onChange(event.target.value); }}><option value="">Choose an ailment first</option>{results.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select>
      {!results.length && <p role="status">No matching ailments.</p>}
    </div>
  </section>;
}
