"use client"

import { ChevronRight } from "lucide-react"

interface NavigationButtonsProps {
  onNext: () => void
  isNextDisabled: boolean
  isLastQuestion: boolean
  buttonLabel: string
}

export function NavigationButtons({ onNext, isNextDisabled, isLastQuestion, buttonLabel }: NavigationButtonsProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
          isNextDisabled
            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
            : isLastQuestion
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/50 cursor-pointer"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/50"
        }`}
      >
        <span className="text-sm md:text-base">{buttonLabel}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
