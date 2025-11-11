"use client";

import { useState } from "react";
import type { ExamResult } from "@/types/exam";
import { AnswerReview } from "./answer-review";
import { CheckCircle2, XCircle } from "lucide-react";

interface ResultsPageProps {
  result: ExamResult;
  examTitle: string;
  passPercentage: number;
  onRetake: () => void;
}

export function ResultsPage({
  result,
  examTitle,
  passPercentage,
}: ResultsPageProps) {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-y-auto">
      {/* Header */}
      <div className="bg-slate-950 border-b border-slate-700 px-4 md:px-8 py-6 sticky top-0 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Exam Completed
        </h1>
        <p className="text-slate-400 text-sm mt-1">{examTitle}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          {!showReview ? (
            <>
              {/* Score Summary Card */}
              <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-700 shadow-2xl overflow-hidden mb-6 animate-fadeIn">
                {/* Score Display */}
                <div className="p-8 md:p-12">
                  <div className="text-center">
                    {/* Score Circle */}
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white">
                          {result.score}
                        </div>
                        <div className="text-xs text-blue-100 mt-1">
                          / {result.totalQuestions}
                        </div>
                      </div>
                    </div>

                    {/* Percentage and Status */}
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-white mb-2">
                        {result.percentage}%
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          result.percentage >= passPercentage
                            ? "text-green-400"
                            : "text-amber-400"
                        }`}
                      >
                        {result.percentage >= passPercentage
                          ? "PASSED"
                          : "REVIEW RECOMMENDED"}
                      </div>
                    </div>

                    {/* Result Message */}
                    <p className="text-slate-300 text-base leading-relaxed mb-6">
                      {result.percentage >= 80
                        ? "Excellent performance! You have demonstrated strong understanding."
                        : result.percentage >= 60
                        ? "Good job! You have passed the exam."
                        : "Keep practicing! Review the incorrect answers to improve."}
                    </p>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <ResultCard
                        label="Correct"
                        value={result.correctAnswers}
                        icon="correct"
                      />
                      <ResultCard
                        label="Incorrect"
                        value={result.totalQuestions - result.correctAnswers}
                        icon="incorrect"
                      />
                      <ResultCard
                        label="Total"
                        value={result.totalQuestions}
                        icon="total"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowReview(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-600/50"
                >
                  Review Answers
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all"
                >
                  Retake Exam
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Answer Review Mode */}
              <div className="mb-6">
                <button
                  onClick={() => setShowReview(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-all mb-4"
                >
                  Back to Summary
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Answer Review
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Review your answers and correct responses
                </p>
              </div>

              {/* Answer Review List */}
              <div className="space-y-3">
                {result.answers.map((answer, index) => (
                  <AnswerReview
                    key={index}
                    questionNumber={index + 1}
                    answer={answer}
                  />
                ))}
              </div>

              {/* Footer Action */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-green-600/50"
                >
                  Retake Exam
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: number;
  icon: "correct" | "incorrect" | "total";
}

function ResultCard({ label, value, icon }: ResultCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "correct":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "incorrect":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "total":
        return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600">
      <div className="flex items-center justify-center gap-2 mb-2">
        {getIcon()}
        <p className="text-xs text-slate-400">{label}</p>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
