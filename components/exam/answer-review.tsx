"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AnswerReviewProps {
  questionNumber: number;
  answer: {
    questionId: number;
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  };
}

export function AnswerReview({ questionNumber, answer }: AnswerReviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg border transition-all ${
        answer.isCorrect
          ? "bg-green-800 bg-opacity-10 border-green-800 border-opacity-30"
          : "bg-red-800 bg-opacity-10 border-red-500 border-opacity-30"
      }`}
    >
      {/* Question Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start justify-between gap-4 hover:bg-opacity-20 transition-all"
      >
        <div className="flex items-start gap-4 flex-1 text-left">
          {/* Question Number Badge */}
          <div
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 ${
              answer.isCorrect
                ? "bg-green-800 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {questionNumber}
          </div>

          {/* Question Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm md:text-base leading-relaxed">
              {answer.question}
            </p>
            <div className="mt-3 space-y-2">
              {/* Selected Answer */}
              <div>
                <p className="text-xs text-slate-200 uppercase tracking-wider mb-1">
                  Your Answer
                </p>
                <p
                  className={`text-sm ${
                    answer.isCorrect ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {answer.selectedAnswer}
                </p>
              </div>

              {/* Correct Answer (if wrong) */}
              {!answer.isCorrect && (
                <div>
                  <p className="text-xs text-slate-200 uppercase tracking-wider mb-1">
                    Correct Answer
                  </p>
                  <p className="text-sm text-green-300">
                    {answer.correctAnswer}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expand Icon */}
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-current border-opacity-20">
          <div className="bg-gray-800 bg-opacity-30 rounded p-3 mt-3">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
              Explanation
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {answer.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
