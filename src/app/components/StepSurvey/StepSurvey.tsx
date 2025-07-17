"use client";

import { useState } from "react";
import styles from "./StepSurvey.module.css";
import surveyQuestions from "./survey.json";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useResults } from "@/app/context/ResultsContext";

type Option = { value: string; label: string };
type PreCondition = { questionId: string; value: string };
type Question = {
  id: string;
  type: string;
  question: string;
  options?: Option[];
  preCondition?: PreCondition;
};

export default function StepSurvey() {
  const questions: Question[] = surveyQuestions.survey.questions as Question[];
  const { answers, setAnswers } = useResults();
  const [idx, setIdx] = useState(0);
  const router = useRouter();

  // Checks if a question is eligible to be shown, given current answers
  function isEligible(q: Question, ans: Record<string, string> = answers) {
    if (!q.preCondition) return true;
    return ans[q.preCondition.questionId] === q.preCondition.value;
  }

  // Returns IDs of all questions that should be shown based on the answers provided
  function getEligibleIds(ans: Record<string, string>) {
    const eligibleIds: string[] = [];
    for (const q of questions) {
      if (
        !q.preCondition ||
        ans[q.preCondition.questionId] === q.preCondition.value
      ) {
        eligibleIds.push(q.id);
      }
    }
    return eligibleIds;
  }

  function handleAnswerChange(questionId: string, value: string) {
    const updatedAnswers = { ...answers, [questionId]: value };
    const eligibleIds = getEligibleIds(updatedAnswers);

    // Had to add this logic as introduced a bug when refactoring that kept previous answers for questions that were no longer eligible
    // Prune answers for questions that are no longer eligible
    const prunedAnswers: Record<string, string> = {};
    for (const id of eligibleIds) {
      if (updatedAnswers[id] !== undefined) {
        prunedAnswers[id] = updatedAnswers[id];
      }
    }
    setAnswers(prunedAnswers);
  }

  // Navigates to the next eligible question. If none left, shows survey complete alert.
  function goNext() {
    let next = idx + 1;
    while (next < questions.length && !isEligible(questions[next])) next++;
    if (next < questions.length) setIdx(next);
    else {
      router.push("/bloodPressure");
    }
  }

  // Navigates to the previous eligible question, if possible.
  function goBack() {
    let prev = idx - 1;
    while (prev >= 0 && !isEligible(questions[prev])) prev--;
    if (prev >= 0) setIdx(prev);
  }

  // Get the current question by index
  const q = questions[idx];

  // If the current question is not eligible (due to changed answers), skip to the next eligible one
  if (!isEligible(q)) {
    goNext();
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>{q.question}</div>
      <div className={styles.options}>
        {q.options?.map((opt) => (
          <label key={opt.value} className={styles.optionLabel}>
            <input
              className={styles.input}
              type="radio"
              name={q.id}
              value={opt.value}
              checked={answers[q.id] === opt.value}
              onChange={() => handleAnswerChange(q.id, opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={goBack}
          className={styles.button}
          disabled={idx === 0}
          type="button"
        >
          <IoArrowBackCircleOutline size={32} /> Back
        </button>
        <button
          onClick={goNext}
          className={styles.button}
          disabled={!answers[q.id]}
          type="button"
        >
          Next <IoArrowForwardCircleOutline size={32} />
        </button>
      </div>
    </div>
  );
}
