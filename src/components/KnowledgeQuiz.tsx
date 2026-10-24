import { useState } from "react";
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
    </section>
  );
}
