import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bike, CheckCircle2, RotateCcw, ShieldCheck, Wind } from "lucide-react";
import { medications } from "../data/medications";
import { medicineMaps } from "../data/anatomy";
import { lessonSources, postQuestions, preQuestions, type AssessmentResult, type LearningQuestion } from "../data/asthmaLesson";
import { AnatomyViewer } from "./AnatomyViewer";
import { AirwayMechanism } from "./AirwayMechanism";
import { LearningAssessment } from "./KnowledgeQuiz";

const steps = ["Meet Maya", "Explore the body", "Understand the mechanism", "Check understanding", "Learning summary"];
const storageKey = "medmap-story-asthma-v1";
interface Progress { step: number; pre?: AssessmentResult; post?: AssessmentResult; bodyVisited: boolean; bodyExplored: boolean; illustration: number; explored: string[]; mechanismPracticed: boolean; }
const fresh = (): Progress => ({ step: 0, bodyVisited: false, bodyExplored: false, illustration: 0, explored: [], mechanismPracticed: false });
function readAssessment(value: AssessmentResult | undefined, questions: LearningQuestion[]) {
  if (!value) return undefined;
  const choicesValid = (answers: number[]) => Array.isArray(answers) && answers.length === questions.length && answers.every((answer, index) => Number.isInteger(answer) && answer >= 0 && answer < questions[index].choices.length);
  if (!choicesValid(value.firstAnswers) || !choicesValid(value.finalAnswers) || !Array.isArray(value.attempts) || value.attempts.length !== questions.length || value.attempts.some((count) => !Number.isInteger(count) || count < 1)) throw Error("Invalid assessment checkpoint");
  return { ...value, firstScore: value.firstAnswers.filter((answer, index) => answer === questions[index].correct).length, finalScore: value.finalAnswers.filter((answer, index) => answer === questions[index].correct).length };
}
function initialProgress(demo: boolean): { progress: Progress; remember: boolean } {
  if (demo) return { progress: fresh(), remember: false };
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (!stored || stored.version !== 1) return { progress: fresh(), remember: false };
    const p = stored.progress as Progress;
    const pre = readAssessment(p.pre, preQuestions), post = readAssessment(p.post, postQuestions);
    if (post && (!pre || !p.mechanismPracticed || post.finalScore !== postQuestions.length) || p.step > 0 && !p.bodyVisited) throw Error("Inconsistent lesson checkpoint");
    if (!Number.isInteger(p.step) || p.step < 0 || p.step > 4 || !Number.isFinite(p.illustration) || p.illustration < 0 || p.illustration > 100 || !Array.isArray(p.explored) || p.explored.some((id) => !["opening", "receptor", "signal", "muscle"].includes(id)) || (p.step > 0 && !pre) || (p.step > 1 && !p.bodyExplored) || (p.step > 2 && !p.mechanismPracticed) || (p.step === 4 && post?.finalScore !== postQuestions.length)) throw Error("Invalid lesson checkpoint");
    return { progress: { ...p, pre, post, bodyVisited: !!p.bodyVisited, bodyExplored: !!p.bodyExplored, mechanismPracticed: !!p.mechanismPracticed }, remember: true };
  } catch { return { progress: fresh(), remember: false }; }
}

export function PatientStory({ demo = false }: { demo?: boolean }) {
  const [initial] = useState(() => initialProgress(demo));
  const [progress, setProgress] = useState<Progress>(initial.progress);
  const [remember, setRemember] = useState(initial.remember);
  const [storageNotice, setStorageNotice] = useState(initial.remember ? "Completed-step progress restored for this tab." : "");
  const [preStarted, setPreStarted] = useState(false);
  const [scientific, setScientific] = useState(false);
  const [focusSignal, setFocusSignal] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(progress.step);
  const med = medications.find((entry) => entry.id === "albuterol")!;
  const profile = medicineMaps.find((entry) => entry.id === "albuterol")!;
  const completed = progress.post ? 5 : progress.mechanismPracticed ? 3 : progress.bodyExplored ? 2 : progress.pre ? 1 : 0;
  useEffect(() => {
    if (demo) return;
    try {
      if (remember) sessionStorage.setItem(storageKey, JSON.stringify({ version: 1, progress }));
      else sessionStorage.removeItem(storageKey);
    } catch { setStorageNotice("Session saving is unavailable. You can still complete the lesson without it."); }
  }, [remember, progress, demo]);
  useEffect(() => {
    if (previousStep.current !== progress.step) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      previousStep.current = progress.step;
    }
  }, [progress.step]);
  const canVisit = (index: number) => index === 0 || index === 1 && !!progress.pre || index === 2 && progress.bodyExplored || index === 3 && progress.mechanismPracticed || index === 4 && !!progress.post;
  function go(step: number) {
    setProgress((value) => ({ ...value, step, bodyVisited: value.bodyVisited || step === 1, bodyExplored: value.bodyExplored || step === 2 }));
    if (step === 1 || step === 2) setFocusSignal((value) => value + 1);
  }
  function restart() { setProgress(fresh()); setRemember(false); setPreStarted(false); setScientific(false); }
  return <main className="patient-story explorer" data-testid="patient-story">
    <header className="story-heading"><div><span className="eyebrow">PATIENT STORIES / ASTHMA + ALBUTEROL</span><h1>A little more room to breathe.</h1><p>Meet a fictional patient. Explore real reference anatomy. Make the mechanism visible.</p></div><span className="story-duration"><Wind size={16} /> About 3 minutes &middot; self-paced</span></header>
    <div className="content-review"><ShieldCheck size={16} /><span>Fictional, educational scenario. Source-informed prototype; not independently clinically reviewed. No personalized treatment or dosage recommendations.</span></div>
    <nav className="story-steps" aria-label="Patient story steps">{steps.map((label, index) => <button key={label} disabled={!canVisit(index)} aria-current={progress.step === index ? "step" : undefined} onClick={() => go(index)}><span>{completed > index ? <CheckCircle2 size={18} /> : index + 1}</span>{label}</button>)}</nav>
    <div className="story-progress"><div role="progressbar" aria-label="Lesson progress" aria-valuemin={0} aria-valuemax={5} aria-valuenow={completed} aria-valuetext={`${completed} of 5 steps completed`}><span style={{ width: `${completed * 20}%` }} /></div><small>{completed} of 5 steps completed</small></div>
    <h2 className="story-step-title" ref={heading} tabIndex={-1}>{steps[progress.step]}</h2>
    {progress.step === 0 && <div className="story-introduction">
      <article className="story-patient card"><div className="patient-avatar" aria-hidden="true"><Bike size={52} /><span>M</span></div><div><span className="eyebrow">MAYA, 24 &middot; FICTIONAL PATIENT</span><h3>She knows the name of her inhaler.<br />She wants to understand the story inside.</h3><p>Maya loves cycling. She has asthma and is learning about an inhaler discussed in her care plan. Today, she wants to understand what happens when the muscles around an airway tighten, and how albuterol can help relax them.</p><p className="learning-objective"><strong>Your objective:</strong> connect the lungs, the airway muscle, and beta-2 receptor signaling, then explain why bronchodilation is not a cure for asthma.</p></div></article>
      {!progress.pre && !preStarted && <button className="primary story-next" onClick={() => setPreStarted(true)}>Start pre-lesson check <ArrowRight size={17} /></button>}
      {!progress.pre && preStarted && <LearningAssessment questions={preQuestions} phase="pre" onComplete={(pre) => setProgress((value) => ({ ...value, pre }))} />}
      {progress.pre && <div className="story-checkpoint card"><CheckCircle2 /><div><h3>Starting point recorded</h3><p>{progress.pre.firstScore} of {preQuestions.length} correct on the first attempt. This is a starting point, not a judgment.</p></div><button className="primary" onClick={() => go(1)}>Explore Maya's lungs <ArrowRight size={17} /></button></div>}
    </div>}
    {progress.step === 1 && <div className="story-instruction card"><span className="eyebrow">REFERENCE ANATOMY</span><h3>From a whole person to the airways.</h3><p>The lungs contain branching airways. Smooth muscle wraps around those airways; it is too small to resolve fully in this reference model. The camera focuses on the lungs while keeping the surrounding anatomy available.</p><div className="story-actions"><button onClick={() => setFocusSignal((value) => value + 1)}>Focus lungs</button><button className="primary" onClick={() => go(2)}>Zoom into the airway <ArrowRight size={17} /></button></div></div>}
    <div className={`story-visual-workspace ${progress.step === 2 ? "is-magnified" : ""}`} hidden={progress.step !== 1 && progress.step !== 2}>
      {progress.bodyVisited && <div className="story-anatomy"><AnatomyViewer medicineProfile={profile} showMedicineControls={false} initialControlsExpanded={false} autoFocusTarget focusSignal={focusSignal} /><p className="story-visual-caption">3D reference anatomy &middot; incomplete model coverage, not Maya's body scan</p></div>}
      {progress.bodyExplored && <div className="story-magnification" hidden={progress.step !== 2}>
        <div className="story-instruction"><span className="eyebrow">FROM ORGAN TO MECHANISM</span><h3>A signal. A muscle. A little more space.</h3><p>This magnified illustration explains the muscle mechanism. It is separate from the anatomical mesh and does not reproduce an individual's response.</p></div>
        <div className="mode-toggle" aria-label="Story explanation level"><button aria-pressed={!scientific} onClick={() => setScientific(false)}>Simple</button><button aria-pressed={scientific} onClick={() => setScientific(true)}>Scientific</button></div>
        <AirwayMechanism progress={progress.illustration} scientific={scientific} onProgressChange={(illustration) => setProgress((value) => ({ ...value, illustration, mechanismPracticed: value.mechanismPracticed || illustration >= 80 && value.explored.length > 0 }))} onExplore={(id) => setProgress((value) => ({ ...value, explored: [...new Set([...value.explored, id])], mechanismPracticed: value.mechanismPracticed || value.illustration >= 80 }))} />
        <div className="story-practice-check" role="status">{progress.mechanismPracticed ? "Interaction complete. Ready to check understanding." : "Move the slider toward the relaxed illustration and explore at least one hotspot or pathway."}</div>
        <button className="primary story-next" disabled={!progress.mechanismPracticed} onClick={() => go(3)}>Check understanding <ArrowRight size={17} /></button>
      </div>}
    </div>
    {progress.step === 3 && (progress.post ? <div className="story-checkpoint card"><p>Your challenge is recorded. You can review the mechanism without changing your first-attempt results.</p><button className="primary" onClick={() => go(4)}>View learning summary</button></div> : <LearningAssessment questions={postQuestions} phase="post" onComplete={(post) => setProgress((value) => ({ ...value, post, step: 4 }))} />)}
    {progress.step === 4 && progress.pre && progress.post && <section className="story-summary card" aria-label="Learning summary">
      <CheckCircle2 size={36} /><span className="eyebrow">EXPLORE → VISUALIZE → INTERACT → UNDERSTAND → APPLY</span><h3>You followed the mechanism.</h3><p>Albuterol activates beta-2 receptors. cAMP signaling contributes to smooth-muscle relaxation, opening the airway. That explains bronchodilation, not a cure for asthma or a complete treatment plan.</p>
      <div className="learning-results"><div><span>Pre-lesson first attempt</span><strong>{progress.pre.firstScore} / {preQuestions.length}</strong></div><div><span>Post-lesson first attempt</span><strong>{progress.post.firstScore} / {postQuestions.length}</strong></div><div><span>Correct after practice</span><strong>{progress.post.finalScore} / {postQuestions.length}</strong></div></div>
      <p className="learning-results-note">These are your quiz results for this lesson. They are not validated evidence of educational effectiveness or a prediction of clinical understanding. Retries are practice, not additional first-attempt credit.</p>
      <div className="story-actions"><a className="primary" href="#compare/albuterol/tiotropium">Compare medication roles <ArrowRight size={17} /></a><a href="#explore/albuterol?condition=Asthma">Open the albuterol guide</a><button onClick={restart}><RotateCcw size={15} /> Replay story</button></div>
    </section>}
    <footer className="story-sources"><details><summary>Lesson sources, review status, and limitations</summary><p>Content checked against these sources on October 24, 2026. This prototype has not had independent clinical review. Illustrations omit many biological details and show no measured treatment effects. Anatomy licensing and coverage remain available in the viewer's credits.</p><ul>{lessonSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}</a></li>)}</ul></details>
      {demo ? <p className="session-note">Demo mode starts fresh and does not use saved lesson checkpoints.</p> : <label className="story-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Keep completed-step progress for this tab. No account needed.</label>}
      {storageNotice && <p role="status">{storageNotice}</p>}
      <button className="story-restart" onClick={restart}>Start this lesson over</button>
    </footer>
  </main>;
}
