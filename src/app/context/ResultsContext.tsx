"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Answers = Record<string, string>;

export type BPReading = {
  systolic: number;
  diastolic: number;
  pulse: number;
} | null;

interface ResultsContextProps {
  answers: Answers;
  setAnswer: (questionId: string, value: string) => void;
  setAnswers: (answers: Answers) => void;

  bpReading: BPReading;
  setBpReading: (reading: BPReading) => void;
}

const ResultsContext = createContext<ResultsContextProps | undefined>(
  undefined,
);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswersState] = useState<Answers>({});
  const [bpReading, setBpReading] = useState<BPReading>(null);

  const setAnswer = (questionId: string, value: string) => {
    setAnswersState((prev) => ({ ...prev, [questionId]: value }));
  };

  const setAnswers = (newAnswers: Answers) => {
    setAnswersState(newAnswers);
  };

  return (
    <ResultsContext.Provider
      value={{
        answers,
        setAnswer,
        setAnswers,
        bpReading,
        setBpReading,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults() {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
}
