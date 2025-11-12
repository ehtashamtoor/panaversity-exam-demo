"use client";

import { useEffect, useState } from "react";
import { useAntiCheat } from "@/hooks/use-anti-cheat";
import { useExamState } from "@/hooks/use-exam-state";
import { loadExamQuestions } from "@/utils/exam-loader";
import { useTimer } from "@/hooks/use-timer";
import type { ExamData } from "@/types/exam";
import { QuestionDisplay } from "./question-display";
import { ResultsPage } from "./results-page";
import { ExamHeader } from "./exam-header";
import { LoadingScreen } from "./loading-screen";
import { ErrorScreen } from "./error-screen";
import { LandingPage } from "./landing-page";

export function ExamContainer() {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [examState, setExamState] = useState<
    "loading" | "landing" | "exam" | "results"
  >("loading");
  const [timerDuration, setTimerDuration] = useState<number>(0);
  const [isAntiCheatEnabled, setIsAntiCheatEnabled] = useState(true);

  // Load exam questions on mount
  useEffect(() => {
    const loadExam = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadExamQuestions();
        setExamData(data);
        setExamState("landing");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load exam";
        setError(message);
        console.error("[EXAM CONTAINER]", message);
        setExamState("loading");
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, []);

  // Anti-cheat measures
  useAntiCheat(isAntiCheatEnabled);

  // Handle loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // Handle error state
  if (error) {
    return <ErrorScreen error={error} />;
  }

  // Handle missing data
  if (!examData || examData.questions.length === 0) {
    return (
      <ErrorScreen error="No exam questions available. Please check the exam data file." />
    );
  }

  if (examState === "landing") {
    return (
      <LandingPage
        examMetadata={examData.exam}
        onStartExam={async (customDuration) => {
          const duration = customDuration || examData.exam.duration;
          setTimerDuration(duration);
          setIsAntiCheatEnabled(true);

          // Request fullscreen mode
          try {
            await document.documentElement.requestFullscreen();
            setExamState("exam");
          } catch (error) {
            console.error("[FULLSCREEN] Failed to enter fullscreen:", error);
            // Show warning but still start exam
            alert(
              "Please allow fullscreen mode for the exam. Press F11 or allow fullscreen when prompted."
            );
            setExamState("exam");
          }
        }}
        isLoading={false}
      />
    );
  }

  if (examState === "exam" || examState === "results") {
    return (
      <ExamContent
        examData={examData}
        examState={examState}
        setExamState={setExamState}
        timerDuration={timerDuration}
      />
    );
  }
}

function ExamContent({
  examData,
  examState,
  setExamState,
  timerDuration,
}: {
  examData: ExamData;
  examState: "exam" | "results";
  setExamState: (state: "exam" | "results" | "landing") => void;
  timerDuration: number;
}) {
  const {
    state,
    result,
    selectAnswer,
    nextQuestion,
    getCurrentAnswer,
    submitExam,
    resetExam,
  } = useExamState(examData.questions);

  const {
    timeLeft,
    start: startTimer,
    isTimeUp,
  } = useTimer({
    totalSeconds: timerDuration * 60,
    autoStart: false,
  });

  // Start timer when exam begins
  useEffect(() => {
    if (examState === "exam" && timerDuration > 0) {
      const timer = setTimeout(() => {
        startTimer();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [examState, timerDuration, startTimer]);

  // Handle time up - submit exam when timer expires
  useEffect(() => {
    if (isTimeUp && examState === "exam") {
      submitExam();
      setExamState("results");
    }
  }, [isTimeUp, examState, setExamState, submitExam]);

  // Enforce fullscreen - submit exam if exited
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && examState === "exam") {
        submitExam();
        console.warn("[ANTI-CHEAT] Fullscreen exited - submitting exam");
        setExamState("results");
        alert(
          "Fullscreen mode was exited. Your exam has been submitted automatically."
        );
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [examState, setExamState, submitExam]);

  if (examState === "results" && result) {
    return (
      <ResultsPage
        result={result}
        examTitle={examData.exam.title}
        onRetake={() => {
          resetExam();
          setExamState("landing");
        }}
        passPercentage={examData.exam.passingPercentage as number}
      />
    );
  }

  const currentQuestion = examData.questions[state.currentQuestionIndex];
  const currentAnswer = getCurrentAnswer();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Header with exam info and timer */}
      <ExamHeader
        examTitle={examData.exam.title}
        currentQuestion={state.currentQuestionIndex + 1}
        totalQuestions={examData.questions.length}
        timeLeft={timeLeft}
        isTimeRunningOut={timeLeft <= 300 && timeLeft > 0}
      />

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 md:p-4">
        <div className="w-full max-w-5xl mt-28">
          {currentQuestion ? (
            <QuestionDisplay
              question={currentQuestion}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={examData.questions.length}
              selectedAnswer={currentAnswer}
              onSelectAnswer={selectAnswer}
              onNext={nextQuestion}
              isLastQuestion={
                state.currentQuestionIndex === examData.questions.length - 1
              }
            />
          ) : (
            <ErrorScreen error="Question not found." />
          )}
        </div>
      </div>

      {/* Progress indicator at bottom */}
      <div className="bg-slate-950 border-t border-slate-700 px-4 md:px-8 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300 ease-out"
              style={{
                width: `${
                  ((state.currentQuestionIndex + 1) /
                    examData.questions.length) *
                  100
                }%`,
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            {state.currentQuestionIndex + 1} of {examData.questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
