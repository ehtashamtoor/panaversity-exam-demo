"use client";

interface AnswerOptionProps {
  index: number;
  option: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  letter: string;
}

export function AnswerOption({
  option,
  isSelected,
  isDisabled,
  onClick,
  letter,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-4 group ${
        isSelected
          ? "bg-blue-500 bg-opacity-20 border-blue-400 border-opacity-100"
          : isDisabled
          ? "bg-slate-700 bg-opacity-40 border-slate-600 border-opacity-50 cursor-not-allowed opacity-60"
          : "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 cursor-pointer"
      }`}
    >
      {/* Option Letter Circle */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
          isSelected
            ? "bg-blue-500 text-white"
            : "bg-slate-600 text-slate-300 group-hover:bg-slate-500"
        }`}
      >
        {letter}
      </div>

      {/* Option Text */}
      <div className="flex-1 text-slate-200 text-sm md:text-base">
        <p className="leading-relaxed">{option}</p>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="shrink-0 mt-1">
          <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}
