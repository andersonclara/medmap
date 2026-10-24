import { lazy, Suspense, useEffect, useState } from "react";
import "./learning.css";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  HeartPulse,
  GitCompareArrows,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { BrandLogo } from "./components/BrandLogo";
import { SimilarMedications } from "./components/SimilarMedications";
import { MedicationComparison } from "./components/MedicationComparison";
import { comparisonHref } from "./data/medicationRelationships";
import { TargetRegion } from "./components/TargetRegion";
import { AnatomicalGraphic } from "./components/AnatomicalGraphic";
import { conditionTreatments } from "./data/conditionTreatments";
import { AnatomyViewer } from "./components/AnatomyViewer";
import { MechanismAnimation } from "./components/MechanismAnimation";
import { KnowledgeQuiz } from "./components/KnowledgeQuiz";
import { conditionSource, conditions } from "./data/conditions";
import { medications } from "./data/medications";
import { USRankings } from "./components/USRankings";
import { SimulationMode } from "./components/SimulationMode";
import { AilmentPicker } from "./components/AilmentPicker";
import { firstAilmentForMedicine, medicinesForAilment, resolveAilment } from "./data/ailments";
const PatientStory = lazy(() => import("./components/PatientStory").then((module) => ({ default: module.PatientStory })));
function readRoute() {
  const [path, queryString] = location.hash.slice(1).split("?");
  const [section, medicationId, comparisonId] = path.split("/");
  const requestedCondition = new URLSearchParams(queryString).get("condition");
  const condition = resolveAilment(requestedCondition ?? (medicationId ? firstAilmentForMedicine(medicationId) : ""))?.id ?? "";
  const allowed = medicinesForAilment(condition);
  return {
    page:
      section === "demo" ? "demo" : section === "stories" ? "stories" : section === "rankings" ? "rankings" : section === "simulate" ? "explore" : section === "compare"
        ? "compare"
        : section === "explore"
          ? "explore"
          : section === "conditions"
            ? "conditions"
            : "home",
    id: allowed.some((med) => med.id === medicationId) ? medicationId : "",
    condition,
    compareIds: [medicationId ?? "", comparisonId ?? ""] as [string, string],
  };
}
export default function App() {
  const [page, setPage] = useState(readRoute().page);
  const [id, setId] = useState(readRoute().id);
  const [compareIds, setCompareIds] = useState(readRoute().compareIds);
  const [conditionContext, setConditionContext] = useState(
    readRoute().condition,
  );
  const [query, setQuery] = useState("");
  const [conditionQuery, setConditionQuery] = useState("");
  const [scientific, setScientific] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scored, setScored] = useState<string[]>([]);
  const med = medications.find((m) => m.id === id) ?? medications[0];
  const availableMedicines = medicinesForAilment(conditionContext);
  useEffect(() => {
    const sync = () => {
      const route = readRoute();
      setPage(route.page);
      setCompareIds(route.compareIds);
      setId(route.id);
      setConditionContext(route.condition);
      setScientific(false);
      setMenu(false);
      if (location.hash.startsWith("#simulate")) {
        const canonical = `#explore${route.id ? "/" + route.id : ""}${route.condition ? "?condition=" + encodeURIComponent(route.condition) : ""}`;
        history.replaceState(null, "", canonical);
      }
      if (location.hash !== "#about") window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const filtered = availableMedicines.filter((m) =>
    `${m.name} ${m.category} ${m.organ ?? ""} ${m.target ?? ""} ${m.uses} ${m.conditions.join(" ")} ${conditions
      .filter((c) => conditionTreatments[c.name].medicationIds.includes(m.id))
      .map((c) => c.name)
      .join(" ")}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const filteredConditions = conditions.filter((condition) =>
    `${condition.name} ${condition.medicationExamples} ${conditionTreatments[condition.name].medicationIds.map((id) => medications.find((m) => m.id === id)?.name ?? "").join(" ")}`
      .toLowerCase()
      .includes(conditionQuery.trim().toLowerCase()),
  );
  function choose(next: string) {
    setId(next);
    setScientific(false);
    const ailment = medicinesForAilment(conditionContext).some((med) => med.id === next) ? conditionContext : firstAilmentForMedicine(next);
    location.hash = "explore/" + next + (ailment ? "?condition=" + encodeURIComponent(ailment) : "");
  }
  function chooseAilment(next: string) {
    setId(""); setConditionContext(next); setQuery(""); setScientific(false);
    location.hash = "explore" + (next ? "?condition=" + encodeURIComponent(next) : "");
  }
  return (
    <>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="MedMap home">
          <BrandLogo />
        </a>
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          <a className={page === "home" ? "current" : ""} href="#home">
            Home
          </a>
          <a
            className={
              page === "explore" || page === "compare" ? "current" : ""
            }
            href="#explore"
          >
            Medication explorer
          </a>
          <a
            className={page === "conditions" ? "current" : ""}
            href="#conditions"
          >
            Condition directory
          </a>
          <a
            href="#about"
            onClick={() => {
              setPage("home");
              setTimeout(
                () =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" }),
                20,
              );
            }}
          >
            How it works
          </a>
          <a className={page === "rankings" ? "current" : ""} href="#rankings">U.S. rankings</a>
          <a className={page === "stories" || page === "demo" ? "current" : ""} href="#stories/asthma">Patient Stories</a>
        </nav>
        <a className="nav-cta" href="#demo">
          Start demo <ArrowUpRight size={16} />
        </a>
      </header>
      {page === "demo" || page === "stories" ? <Suspense fallback={<main className="explorer" role="status">Opening your interactive patient story...</main>}><PatientStory key={page} demo={page === "demo"} /></Suspense> : page === "rankings" ? <USRankings /> : page === "compare" ? (
        <MedicationComparison ids={compareIds} />
      ) : page === "conditions" ? (
        <main className="explorer conditions-page">
          <div className="explorer-heading">
            <div>
              <span className="eyebrow">CONDITION DIRECTORY</span>
              <h1>Common conditions, treatment context.</h1>
              <p>
                Browse {conditions.length} conditions and educational examples
                of medicines that clinicians may consider.
              </p>
              <p><a href="#rankings?type=conditions">Explore the expanded U.S. reported-condition rankings</a></p>
            </div>
            <span className="library-pill">
              <BookOpen size={16} /> {conditions.length} condition guides
            </span>
          </div>
          <label className="search condition-search">
            <Search size={18} />
            <input
              value={conditionQuery}
              onChange={(event) => setConditionQuery(event.target.value)}
              placeholder="Search conditions or medicine examples"
              aria-label="Search conditions or medicines"
            />
            {conditionQuery && (
              <button
                aria-label="Clear condition search"
                onClick={() => setConditionQuery("")}
              >
                <X size={15} />
              </button>
            )}
          </label>
          <p className="condition-count" aria-live="polite">
            Showing {filteredConditions.length} of {conditions.length}{" "}
            conditions
          </p>
          <div className="directory-notice">
            <ShieldCheck size={20} />
            <p>
              <strong>
                Examples to learn about, not medicines to choose for yourself.
              </strong>{" "}
              {
                Object.values(conditionTreatments).filter(
                  (t) => t.medicationIds.length,
                ).length
              }{" "}
              conditions have linked medication examples;{" "}
              {
                Object.values(conditionTreatments).filter(
                  (t) => !t.medicationIds.length,
                ).length
              }{" "}
              explain why no general medication is listed. Some examples apply
              only to a subtype, a symptom, or one part of a complete treatment
              plan. These draft guides have not had clinical review.
            </p>
          </div>
          <div className="condition-grid">
            {filteredConditions.map((condition) => (
              <article
                className="condition-row"
                data-testid="condition-guide"
                key={condition.name}
              >
                <div>
                  <h2>{condition.name}</h2>
                  <p>
                    <strong>Medication examples:</strong>{" "}
                    {condition.medicationExamples}
                  </p>
                  <div className="condition-medication-links">
                    {conditionTreatments[condition.name].medicationIds.map(
                      (medId) => {
                        const example = medications.find(
                          (m) => m.id === medId,
                        )!;
                        return (
                          <a
                            className="condition-medication-link"
                            key={medId}
                            href={`#explore/${medId}?condition=${encodeURIComponent(condition.name)}`}
                            onClick={() => setQuery("")}
                            aria-label={`Explore ${example.name} for ${condition.name}`}
                          >
                            {example.name}
                            <ArrowRight size={15} />
                          </a>
                        );
                      },
                    )}
                  </div>
                  <div className="condition-role">
                    <strong>{conditionTreatments[condition.name].role}</strong>
                    <p>{conditionTreatments[condition.name].context}</p>
                  </div>
                </div>
                <a
                  href={conditionSource(condition.name)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read about ${condition.name} on MedlinePlus`}
                >
                  <BookOpen size={15} /> MedlinePlus <ArrowUpRight size={13} />
                </a>
              </article>
            ))}
            {!filteredConditions.length && (
              <p className="empty" role="status">
                No conditions found. Try another condition or medicine name.
              </p>
            )}
          </div>
          <aside className="condition-disclaimer">
            <ShieldCheck size={19} />
            <p>
              <strong>
                Educational examples, not treatment recommendations.
              </strong>{" "}
              This alphabetical list is not a prevalence ranking and is not
              clinically reviewed. The right treatment depends on diagnosis,
              medical history, other medicines, and individual risks. Do not
              start, stop, or change medicines based on this directory. Use the
              MedlinePlus links to learn more and consult a qualified clinician
              or pharmacist for care decisions.
            </p>
          </aside>
        </main>
      ) : page === "home" ? (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="hero-badge">
                <span /> A little understanding. A healthier you.
              </div>
              <h1>
                Understand your
                <br />
                medication.
                <br />
                <em>
                  Understand
                  <br className="desktop-break" /> your body.
                </em>
              </h1>
              <p>
                Your medicine has a story. See it unfold with interactive
                anatomy and clear explanations that make the science feel human.
              </p>
              <a className="primary large" href="#demo">
                Start Interactive Demo <ArrowRight size={19} />
              </a>
              <a className="hero-secondary" href="#explore">Explore Medications <ArrowUpRight size={16} /></a>
              <p className="hero-demo-note">One fictional asthma story. From anatomy to a mechanism you can explore.</p>
              <div className="hero-assurance">
                <ShieldCheck size={16} /> Free to explore. No sign-up. Just
                understanding.
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-kicker">
                <span className="tiny-line" /> SEE HOW YOUR MEDICINE WORKS
              </div>
              <AnatomyViewer compact />
              <div className="floating-card">
                <span className="float-icon">
                  <AnatomicalGraphic organ="Lungs" decorative eager />
                </span>
                <div>
                  <span>MEET YOUR MEDICATION</span>
                  <strong>
                    Albuterol <ArrowUpRight size={15} />
                  </strong>
                  <p>A clearer path for every breath.</p>
                </div>
              </div>
              <div className="visual-note">
                <span /> Made for curiosity. Designed for clarity.
              </div>
            </div>
          </section>
          <section className="trust-strip">
            <span>COMPLEX SCIENCE. CLEARER CONNECTIONS.</span>
            <p>
              <Check size={16} /> Evidence-informed education
            </p>
            <p>
              <Check size={16} /> Interactive by design
            </p>
            <p>
              <Check size={16} /> Built around you
            </p>
          </section>
          <section id="about" className="features">
            <div className="section-intro">
              <span className="eyebrow">
                FROM “WHAT IS THIS?” TO “NOW I GET IT.”
              </span>
              <h2>A new way to get to know your medicine.</h2>
              <p>Less confusing terminology. More lightbulb moments.</p>
            </div>
            <div className="feature-grid">
              {[
                {
                  icon: <AnatomicalGraphic organ="Body" decorative />,
                  number: "01",
                  title: "Explore your body",
                  text: "Connect your medication to the organs and systems it affects. Your body, brought into focus.",
                },
                {
                  icon: <Sparkles />,
                  number: "02",
                  title: "See the science in action",
                  text: "Watch simple, interactive illustrations turn complex mechanisms into something you can see.",
                },
                {
                  icon: <BookOpen />,
                  number: "03",
                  title: "Learn at your own pace",
                  text: "Start with the basics or go a little deeper. Choose the explanation that feels right for you.",
                },
              ].map((f) => (
                <article key={f.number}>
                  <div className="feature-top">
                    <span>{f.icon}</span>
                    <small>{f.number}</small>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="home-medications">
            <div>
              <span className="eyebrow">SMALL LIBRARY. BIG UNDERSTANDING.</span>
              <h2>Meet the medicines.</h2>
              <p>
                Explore {medications.length} medication guides for common
                conditions.
              </p>
            </div>
            <div className="med-preview-grid">
              {medications.slice(0, 6).map((m) => (
                <a
                  href={`#explore/${m.id}`}
                  key={m.id}
                  onClick={() => choose(m.id)}
                >
                  <span className={`med-symbol ${m.id}`}>
                    {m.organ ? (
                      <AnatomicalGraphic organ={m.organ} decorative />
                    ) : (
                      <HeartPulse />
                    )}
                  </span>
                  <div>
                    <strong>{m.name}</strong>
                    <span>
                      {m.category} · {m.organ}
                    </span>
                  </div>
                  <ArrowUpRight size={20} />
                </a>
              ))}
            </div>
            <a className="primary all-medications" href="#explore">
              Browse all {medications.length} medications{" "}
              <ArrowRight size={16} />
            </a>
          </section>
        </main>
      ) : (
        <main className="explorer">
          <div className="explorer-heading">
            <div>
              <span className="eyebrow">YOUR MEDICATION, MAPPED OUT</span>
              <h1>A little clarity goes a long way.</h1>
              <p>Choose an ailment, select a documented medicine, and run its simulation here.</p>
            </div>
            <span className="library-pill">
              <BookOpen size={16} /> {medications.length} medication guides
            </span>
          </div>
          <AilmentPicker value={conditionContext} onChange={chooseAilment} />
          <div className="explorer-layout">
            <aside className="med-sidebar">
              <label className="search">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search medications…"
                  aria-label="Search medications"
                  disabled={!conditionContext || !availableMedicines.length}
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
              <span className="eyebrow sidebar-label">2. CHOOSE A MEDICINE</span>
              <p className="search-help">
                Only documented educational examples for the selected ailment appear here. These are not a personalized treatment recommendation.
              </p>
              <p className="search-help"><a href="#rankings">Browse U.S. prescription-use rankings</a></p>
              <p className="med-result-count" aria-live="polite">
                {filtered.length} of {availableMedicines.length} documented medication options
              </p>
              <div className="med-list" aria-label="Medication results">
                {filtered.map((m) => (
                  <button
                    key={m.id}
                    className={m.id === id ? "selected" : ""}
                    onClick={() => choose(m.id)}
                    aria-pressed={m.id === id}
                  >
                    <span className={`med-symbol ${m.id}`}>
                      {m.organ ? (
                        <AnatomicalGraphic organ={m.organ} decorative />
                      ) : (
                        <HeartPulse size={20} />
                      )}
                    </span>
                    <span>
                      <strong>{m.name}</strong>
                      <small>{m.category}</small>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                ))}
                {!filtered.length && (
                  <p className="empty" role="status">
                    {!conditionContext ? "Choose an ailment first to see its medication options." : !availableMedicines.length ? "No documented medication options are currently mapped to this ailment. A simulation is unavailable." : "No medications found for this ailment. Try a different search."}
                  </p>
                )}
              </div>
              <div className="sidebar-tip">
                <Stethoscope size={23} />
                <h4>Good questions lead to better conversations.</h4>
                <p>
                  Use what you learn as a starting point with your doctor or
                  pharmacist.
                </p>
              </div>
            </aside>
            {!id ? <section className="card explorer-selection-prompt" aria-live="polite"><h2>{!conditionContext ? "Start with the ailment." : availableMedicines.length ? "Choose a medicine to explore and simulate." : "No simulation available for this ailment yet."}</h2><p>{!conditionContext ? "The medication list will appear after you select an ailment above." : availableMedicines.length ? "Select one of the documented options. Its guide, anatomy, and simulation will open on this page." : "No medication relationship will be inferred from a shared organ or drug class. You can choose another ailment or read the source reference."}</p>{conditionContext && !availableMedicines.length && <a href={conditionSource(resolveAilment(conditionContext)?.name ?? conditionContext)} target="_blank" rel="noreferrer">Read about this ailment on MedlinePlus</a>}</section> : <div className="med-detail">
              <div className="med-heading">
                <div>
                  <span className="eyebrow">{med.system}</span>
                  <h2>
                    {med.name}
                    <span>{med.category}</span>
                  </h2>
                  <p>
                    <span className="target-dot" /> Primary focus:{" "}
                    {(med.target ?? med.organ ?? "Target area").toLowerCase()}
                  </p>
                </div>
                <a
                  className="guide-compare-button"
                  href={comparisonHref(med.id)}
                >
                  <GitCompareArrows size={16} /> Compare medicines
                </a>
              </div>
              {conditionContext &&
                conditionTreatments[conditionContext]?.medicationIds.includes(
                  id,
                ) && (
                  <aside
                    className="selected-condition-context"
                    aria-label="Condition-specific context"
                  >
                    <a href="#conditions">← Back to condition directory</a>
                    <h3>{conditionContext}</h3>
                    <strong>
                      {conditionTreatments[conditionContext].role}
                    </strong>
                    <p>{conditionTreatments[conditionContext].context}</p>
                  </aside>
                )}
              <div className="condition-tags" aria-label="Common uses">
                {med.conditions.map((condition) => (
                  <span key={condition}>{condition}</span>
                ))}
              </div>
              <SimulationMode key={`${id}:${conditionContext}`} medicationId={id} ailment={conditionContext} />
              <div className="detail-grid">
                {med.organ ? (
                  <section
                    className="card guide-anatomy-summary"
                    aria-label="Medication target summary"
                  >
                    <AnatomicalGraphic organ={med.organ} />
                    <h3>{med.target ?? med.organ}</h3>
                    <p>
                      The atlas above locates representative anatomy. Explore
                      the mechanism below to learn about the medicine’s action.
                    </p>
                  </section>
                ) : (
                  <TargetRegion
                    target={med.target ?? "Target area"}
                    category={med.category}
                  />
                )}
                <section className="explanation card">
                  <span className="eyebrow">THE CONNECTION</span>
                  <h3>How does it work?</h3>
                  <div className="mode-toggle" aria-label="Explanation level">
                    <button
                      aria-pressed={!scientific}
                      className={!scientific ? "active" : ""}
                      onClick={() => setScientific(false)}
                    >
                      Simple
                    </button>
                    <button
                      aria-pressed={scientific}
                      className={scientific ? "active" : ""}
                      onClick={() => setScientific(true)}
                    >
                      Scientific
                    </button>
                  </div>
                  <div className="explanation-content" aria-live="polite">
                    <span className="explanation-icon">
                      <Sparkles size={22} />
                    </span>
                    <h4>
                      {scientific
                        ? "Let’s look a little closer."
                        : "The everyday explanation."}
                    </h4>
                    <p>{scientific ? med.scientific : med.simple}</p>
                    {scientific && (
                      <div className="definition">
                        <strong>A helpful definition</strong>
                        <p>{med.definition}</p>
                      </div>
                    )}
                  </div>
                  <div className="connection-note">
                    <span className="target-dot" />{" "}
                    {med.organ ? "Follow the highlighted" : "Explore the"}{" "}
                    {(med.target ?? med.organ ?? "Target area").toLowerCase()}{" "}
                    {med.organ
                      ? "on the body map."
                      : "in the mechanism illustration below."}
                  </div>
                </section>
              </div>
              <SimilarMedications medication={med} allowedMedicationIds={availableMedicines.map((entry) => entry.id)} ailment={conditionContext} />
              <MechanismAnimation key={id + "mechanism"} med={med} />
              <div className="education-grid">
                <details className="card education" open>
                  <summary>
                    <span>
                      <BookOpen size={18} /> What is it used for?
                    </span>
                    <ChevronDown size={18} />
                  </summary>
                  <p>{med.uses}</p>
                </details>
                <details className="card education" open>
                  <summary>
                    <span>
                      <ShieldCheck size={18} /> What should I know?
                    </span>
                    <ChevronDown size={18} />
                  </summary>
                  <p>{med.safety}</p>
                </details>
              </div>
              <section className="provider card">
                <div>
                  <span className="eyebrow">TAKE THE CONVERSATION FURTHER</span>
                  <h3>Questions for your provider</h3>
                  <p>
                    You don’t need to have all the answers.
                    <br />
                    Here are a few places to start.
                  </p>
                </div>
                <ol>
                  {med.questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ol>
              </section>
              <KnowledgeQuiz
                key={id + "quiz"}
                med={med}
                score={scored.length}
                onScore={() =>
                  setScored((s) => (s.includes(id) ? s : [...s, id]))
                }
              />
              <div className="sources">
                <BookOpen size={16} />
                <span>
                  Keep learning:{" "}
                  <a href={med.source} target="_blank" rel="noreferrer">
                    {med.sourceLabel ?? "MedlinePlus"} — {med.name}{" "}
                    <ArrowUpRight size={13} />
                  </a>
                  <span className="source-note">
                    General medication education · Read the full source for
                    additional warnings and information
                  </span>
                </span>
              </div>
            </div>}
          </div>
        </main>
      )}
      <footer>
        <a className="brand" href="#home">
          <BrandLogo />
        </a>
        <p>See how your medicine works.</p>
        <p className="anatomy-attribution">
          Anatomy: BoneHub CT skeletons (Alavi &amp; Asseln, 2026) and Human
          Reference Atlas v1.10 organs (Browne &amp; Schlehlein), based on the
          NLM Visible Human Project. CC BY 4.0.{" "}
          <a href={`${import.meta.env.BASE_URL}models/reference/NOTICE.md`}>
            Sources and attribution
          </a>
          .
        </p>
        <div className="disclaimer">
          <ShieldCheck size={19} />
          <p>
            <strong>
              Understanding starts here. Medical advice comes from your care
              team.
            </strong>{" "}
            MedMap is an educational resource and does not replace professional
            medical advice, diagnosis, or treatment. Illustrations are
            simplified. Never change medication based on this site. No personal
            health information is collected.
          </p>
        </div>
        <span className="footer-bottom">
          Made for understanding. Built with care.{" "}
          <span>MedMap · Educational prototype</span>
        </span>
      </footer>
    </>
  );
}
