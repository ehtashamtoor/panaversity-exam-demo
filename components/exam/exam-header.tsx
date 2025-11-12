"use client";

import { Clock, LogOut } from "lucide-react";

interface ExamHeaderProps {
  examTitle: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft?: number;
  isTimeRunningOut?: boolean;
  onSubmitEarly?: () => void;
}

export function ExamHeader({
  examTitle,
  currentQuestion,
  totalQuestions,
  timeLeft,
  isTimeRunningOut = false,
  onSubmitEarly,
}: ExamHeaderProps) {
  // Format time display
  const minutes = timeLeft ? Math.floor(timeLeft / 60) : 0;
  const seconds = timeLeft ? timeLeft % 60 : 0;
  const timeDisplay =
    timeLeft !== undefined
      ? `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : "Time Remaining";

  return (
    <div className="bg-slate-950 border-b border-slate-700 px-4 md:px-8 py-4 md:py-6 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            {examTitle}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
              isTimeRunningOut && timeLeft !== undefined && timeLeft > 0
                ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse"
                : "bg-slate-900 border-slate-700 text-slate-300"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">{timeDisplay}</span>
          </div>

          {onSubmitEarly && (
            <button
              type="button"
              onClick={onSubmitEarly}
              className="flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg border border-amber-500 transition-colors duration-200"
              title="Submit exam early"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Submit Early</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
