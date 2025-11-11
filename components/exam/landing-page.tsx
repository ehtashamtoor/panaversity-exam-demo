"use client";

import { useState } from "react";
import type { ExamMetadata } from "@/types/exam";

interface LandingPageProps {
  examMetadata: ExamMetadata;
  onStartExam: (customDuration?: number) => void;
  isLoading?: boolean;
}

export function LandingPage({
  examMetadata,
  onStartExam,
  isLoading = false,
}: LandingPageProps) {
  const [customDuration, setCustomDuration] = useState<number | undefined>(
    undefined
  );
  const [showDurationInput, setShowDurationInput] = useState(false);

  const handleStartExam = () => {
    if (showDurationInput && customDuration && customDuration > 0) {
      onStartExam(customDuration);
    } else if (!showDurationInput) {
      onStartExam();
    }
  };

  const isFormValid =
    !showDurationInput || (customDuration && customDuration > 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 md:p-12 mb-8 shadow-2xl">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-lg border border-blue-500/30 backdrop-blur-sm">
              {examMetadata.examType || "MCQ Exam"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {examMetadata.title}
          </h1>

          <p className="text-slate-300 text-lg mb-8">
            {examMetadata.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Questions</p>
              <p className="text-2xl font-bold text-white">
                {examMetadata.totalQuestions}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Duration</p>
              <p className="text-2xl font-bold text-white">
                {examMetadata.duration} mins
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Pass Mark</p>
              <p className="text-2xl font-bold text-white">
                {examMetadata.passingPercentage || 60}%
              </p>
            </div>
          </div>

          {examMetadata.instructions &&
            examMetadata.instructions.length > 0 && (
              <div className="bg-slate-900/30 rounded-lg p-6 border border-slate-700 mb-8">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-white text-sm">
                    ℹ
                  </span>
                  Important Instructions
                </h3>
                <ul className="space-y-3">
                  {examMetadata.instructions.map((instruction, idx) => (
                    <li
                      key={idx}
                      className="text-slate-300 text-sm flex items-start"
                    >
                      <span className="text-blue-400 mr-3 mt-1 font-bold">
                        •
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <div className="mb-8">
            <button
              onClick={() => setShowDurationInput(!showDurationInput)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              {showDurationInput
                ? "✕ Hide custom duration"
                : "+ Set custom duration"}
            </button>

            {showDurationInput && (
              <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Exam Duration (minutes)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="1"
                    max="480"
                    value={customDuration || examMetadata.duration}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value, 10);
                      if (!isNaN(val) && val > 0) {
                        setCustomDuration(val);
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium">
                    min
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleStartExam}
            disabled={isLoading || !isFormValid}
            className="w-full py-4 px-6 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 disabled:shadow-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Starting Exam...
              </span>
            ) : (
              "Start Exam"
            )}
          </button>
        </div>

        <div className="text-center text-slate-400 text-sm">
          <p>No back button • Each answer is final • Anti-cheating enabled</p>
        </div>
      </div>
    </div>
  );
}
