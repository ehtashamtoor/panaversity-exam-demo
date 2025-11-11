"use client";

import type { ExamQuestion } from "@/types/exam";
import { AnswerOption } from "./answer-option";
import { NavigationButtons } from "./navigation-buttons";

interface QuestionDisplayProps {
  question: ExamQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isLastQuestion,
}: QuestionDisplayProps) {
  const handleAnswerClick = (index: number) => {
    // Answer is not locked until Next button is clicked
    onSelectAnswer(index);
  };

  const isAnswerSelected = selectedAnswer !== null;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Question Section */}
      <div className="p-6 md:p-8 border-b border-slate-700 bg-linear-to-r from-slate-800 to-slate-700">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
              {question.question}
            </h2>
          </div>
          <div className="shrink-0 px-3 py-1 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-50 rounded-full">
            <span className="text-xs md:text-sm font-medium text-blue-300">
              Q{questionNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Answer Options Section */}
      <div className="p-6 md:p-8 space-y-3">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-5">
          Select your answer
        </p>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              index={index}
              option={option}
              isSelected={selectedAnswer === index}
              isDisabled={false}
              onClick={() => handleAnswerClick(index)}
              letter={String.fromCharCode(65 + index)} // A, B, C, D
            />
          ))}
        </div>

        {/* Selection required message */}
        {selectedAnswer === null ? (
          <div className="mt-6 p-3 bg-amber-800 bg-opacity-10 border  rounded-lg">
            <p className="text-xs md:text-sm text-amber-300">
              Please select an answer to continue.
            </p>
          </div>
        ) : (
          <div className="invisible mt-6 p-3 bg-amber-800 bg-opacity-10 border  rounded-lg">
            <p className="text-xs md:text-sm text-amber-300"></p>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="px-6 md:px-8 py-4 bg-slate-900 border-t border-slate-700">
        <NavigationButtons
          onNext={onNext}
          isNextDisabled={!isAnswerSelected}
          isLastQuestion={isLastQuestion}
          buttonLabel={isLastQuestion ? "Submit Exam" : "Next Question"}
        />
      </div>
    </div>
  );
}
