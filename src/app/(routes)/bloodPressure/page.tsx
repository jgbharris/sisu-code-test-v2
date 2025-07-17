"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import HeartRateLoader from "@/app/components/HeartRateLoader/HeartRateLoader";
import Progressbar from "@/app/components/ProgressBar/ProgressBar";
import { useRouter } from "next/navigation";
import { useResults } from "@/app/context/ResultsContext";

type BPReading = {
  systolic: number;
  diastolic: number;
  pulse: number;
};

type StreamEvent = {
  status: string;
  message: string;
  reading: BPReading;
  progress: number;
  timestamp: string;
  sessionId: string;
};

export default function BloodPressure() {
  const startURL = "http://localhost:8080/api/blood-pressure/start";

  const router = useRouter();

  const { bpReading, setBpReading } = useResults();

  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [streamStatus, setStreamStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [streaming, setStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  async function handleStart() {
    setBpReading(null);
    setStreamStatus(null);
    setProgress(0);
    try {
      const res = await fetch(startURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: "optional_session_id" }),
      });
      if (!res.ok) throw new Error("Failed to start BP test");
      const data = await res.json();
      if (data.streamUrl) {
        setStreamUrl("http://localhost:8080" + data.streamUrl);
        setStreaming(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!streaming || !streamUrl) return;

    const es = new EventSource(streamUrl);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data: StreamEvent = JSON.parse(event.data);
        setStreamStatus(data.status);
        setBpReading(data.reading);
        setProgress(data.progress);
        if (data.status === "complete") {
          setStreaming(false);
          es.close();
        }
      } catch (err) {
        console.error("Stream event parse error:", err);
      }
    };

    es.onerror = (e) => {
      console.error("EventSource error:", e);
      setStreaming(false);
      es.close();
    };

    return () => es.close();
  }, [streamUrl, streaming, setBpReading]);

  useEffect(() => {
    return () => eventSourceRef.current?.close();
  }, []);

  const handleNext = () => {
    router.push("/results");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.title}>Blood Pressure</div>
        <div className={styles.readingGrid}>
          <div className={styles.readingItem}>
            <span className={styles.label}>Status</span>
            <span className={styles.value}>{streamStatus ?? "--"}</span>
          </div>
          <div className={styles.readingItem}>
            <span className={styles.label}>Systolic</span>
            <span className={styles.value}>{bpReading?.systolic ?? "--"}</span>
          </div>
          <div className={styles.readingItem}>
            <span className={styles.label}>Diastolic</span>
            <span className={styles.value}>{bpReading?.diastolic ?? "--"}</span>
          </div>
          <div className={styles.readingItem}>
            <span className={styles.label}>Pulse</span>
            <span className={styles.value}>{bpReading?.pulse ?? "--"}</span>
          </div>
        </div>
        {streaming && <Progressbar percentage={progress} />}
        {progress === 100 && streamStatus !== "complete" && <HeartRateLoader />}
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={handleStart}
            disabled={streaming}
          >
            Start Blood Pressure Test
          </button>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={streamStatus !== "complete"}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
