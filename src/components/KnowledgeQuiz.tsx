import { useEffect, useRef, useState } from "react";
import type { AssessmentResult, LearningQuestion } from "../data/asthmaLesson";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { medications, type Medication } from "../data/medications";
export function KnowledgeQuiz({
  med,
  score,
  onScore,
}: {
  med: Medication;
  score: number;
  onScore: () => void;
}) {
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <section className="quiz card">
      <span className="eyebrow">
        <Lightbulb size={15} /> A LITTLE KNOWLEDGE GOES A LONG WAY
      </span>
      <div className="section-heading">
        <h3>{med.quiz}</h3>
        <span className="small-pill">
          Session score: {score}/{medications.length}
        </span>
      </div>
      <div className="quiz-options">
        {med.choices.map((c, i) => (
          <button
            key={c}
            disabled={answer !== null}
            className={
              answer !== null && i === med.correct
                ? "correct"
                : answer === i
                  ? "incorrect"
                  : ""
            }
            onClick={() => {
              setAnswer(i);
              if (i === med.correct) onScore();
            }}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {c}
            {answer !== null && i === med.correct && <CheckCircle2 size={18} />}
          </button>
        ))}
      </div>
      {answer !== null && (
        <p role="status">
          {answer === med.correct ? "That’s right! " : "Keep learning! "}
          {med.simple}
        </p>
      )}
      {answer !== null && answer !== med.correct && <button className="quiz-retry" onClick={() => setAnswer(null)}>Try this question again</button>}
    </section>
  );
}

export function LearningAssessment({ questions, phase, onComplete }: { questions: LearningQuestion[]; phase: "pre" | "post"; onComplete: (result: AssessmentResult) => void }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [firstAnswers, setFirstAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [finalAnswers, setFinalAnswers] = useState<number[]>(questions.map(() => -1));
  const [attempts, setAttempts] = useState<number[]>(questions.map(() => 0));
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [index]);
  const question = questions[index];
  const correct = answer === question.correct;
  function respond(choice: number) {
    setAnswer(choice);
    setFirstAnswers((values) => values.map((value, position) => position === index && value === null ? choice : value));
    setFinalAnswers((values) => values.map((value, position) => position === index ? choice : value));
    setAttempts((values) => values.map((value, position) => position === index ? value + 1 : value));
  }
  function next() {
    if (index + 1 < questions.length) { setIndex(index + 1); setAnswer(null); return; }
    const first = firstAnswers as number[];
    onComplete({ firstAnswers: first, finalAnswers, attempts, firstScore: first.filter((choice, position) => choice === questions[position].correct).length, finalScore: finalAnswers.filter((choice, position) => choice === questions[position].correct).length });
  }
  return <section className="learning-assessment card" aria-label={phase === "pre" ? "Pre-lesson check" : "Post-lesson challenge"}>
    <div className="assessment-kicker"><span className="eyebrow">{phase === "pre" ? "BEFORE YOU EXPLORE" : "APPLY WHAT YOU EXPLORED"}</span><span>Question {index + 1} of {questions.length}</span></div>
    <h3 ref={heading} tabIndex={-1}>{question.prompt}</h3>
    <div className="assessment-choices">{question.choices.map((choice, position) => <button key={choice} disabled={answer !== null} aria-pressed={answer === position} className={answer === position ? correct ? "answer-correct" : "answer-incorrect" : ""} onClick={() => respond(position)}><span>{String.fromCharCode(65 + position)}</span>{choice}</button>)}</div>
    {answer !== null && <div className={`assessment-feedback ${correct ? "is-correct" : "is-incorrect"}`} role="status"><strong>{correct ? "That's right." : phase === "pre" ? "A useful starting point." : "Let's follow the mechanism again."}</strong><p>{question.explanation}</p>{phase === "post" && !correct && <p>Your first attempt is recorded separately from practice. Try again when you are ready.</p>}</div>}
    <div className="assessment-actions">{phase === "post" && answer !== null && !correct ? <button className="primary" onClick={() => { setAnswer(null); heading.current?.focus({ preventScroll: true }); }}>Retry question</button> : <button className="primary" disabled={answer === null} onClick={next}>{index + 1 === questions.length ? phase === "pre" ? "Record starting point" : "See learning summary" : "Next question"}</button>}</div>
  </section>;
}
