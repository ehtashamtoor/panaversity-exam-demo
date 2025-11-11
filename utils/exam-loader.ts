import type { ExamData } from "@/types/exam"

export async function loadExamQuestions(): Promise<ExamData> {
  try {
    const response = await fetch("/exam-questions.json")

    if (!response.ok) {
      throw new Error(`Failed to load exam questions: ${response.statusText}`)
    }

    const data: ExamData = await response.json()

    // Validation
    if (!data.exam || !Array.isArray(data.questions)) {
      throw new Error("Invalid exam data structure")
    }

    if (data.questions.length === 0) {
      throw new Error("No questions found in exam data")
    }

    // Validate each question
    data.questions.forEach((q, index) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question ${index + 1} has invalid structure. Must have question text and 4 options.`)
      }

      if (q.correctAnswer < 0 || q.correctAnswer > 3) {
        throw new Error(`Question ${index + 1} has invalid correct answer index`)
      }
    })

    // Update total questions in exam metadata
    data.exam.totalQuestions = data.questions.length

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error loading exam"
    console.error("[EXAM LOADER ERROR]", message)
    throw new Error(`Exam Loading Error: ${message}`)
  }
}
