"use client";

import { useResults } from "@/app/context/ResultsContext";
import styles from "./page.module.css";
import surveyQuestions from "@/app/components/StepSurvey/survey.json";

export default function ResultsPage() {
  const { answers, bpReading } = useResults();
  const questions = surveyQuestions.survey.questions;

  // Returns the label for a question's answer value
  function getLabel(questionId: string, value: string) {
    const q = questions.find((q) => q.id === questionId);
    if (!q) return value;
    if (!q.options) return value;
    const option = q.options.find((opt) => opt.value === value);
    return option ? option.label : value;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.title}>Your Results</div>
        <div className={styles.sectionTitle}>Survey Answers</div>
        <div className={styles.answersGrid}>
          {Object.entries(answers).length === 0 && (
            <span className={styles.placeholder}>No answers submitted.</span>
          )}
          {Object.entries(answers).map(([qid, value]) => (
            <div className={styles.answerItem} key={qid}>
              <span className={styles.label}>
                {questions.find((q) => q.id === qid)?.question || qid}
              </span>
              <span className={styles.value}>{getLabel(qid, value)}</span>
            </div>
          ))}
        </div>

        {bpReading && (
          <>
            <div className={styles.sectionTitle}>Blood Pressure Reading</div>
            <div className={styles.bpGrid}>
              <div className={styles.bpItem}>
                <span className={styles.label}>Systolic</span>
                <span className={styles.value}>{bpReading.systolic}</span>
              </div>
              <div className={styles.bpItem}>
                <span className={styles.label}>Diastolic</span>
                <span className={styles.value}>{bpReading.diastolic}</span>
              </div>
              <div className={styles.bpItem}>
                <span className={styles.label}>Pulse</span>
                <span className={styles.value}>{bpReading.pulse}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
