import type { ExamQuestion } from "@/types/exam"

export function calculateScore(
  selectedAnswers: Record<number, number | null>,
  questions: ExamQuestion[],
): {
  correctCount: number
  totalQuestions: number
  percentage: number
} {
  try {
    let correctCount = 0

    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index]

      if (selectedAnswer !== null && selectedAnswer !== undefined && selectedAnswer === question.correctAnswer) {
        correctCount++
      }
    })

    const totalQuestions = questions.length
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

    return {
      correctCount,
      totalQuestions,
      percentage,
    }
  } catch (error) {
    console.error("[SCORE CALCULATOR ERROR]", error)
    return {
      correctCount: 0,
      totalQuestions: questions.length,
      percentage: 0,
    }
  }
}
