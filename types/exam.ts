export interface ExamQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface ExamMetadata {
  id?: string
  title: string
  description: string
  examType?: "MCQ" | "Comprehensive" | "Practice" | "Mock" | "Final"
  totalQuestions: number
  duration: number
  passingPercentage?: number
  instructions?: string[]
  createdAt?: string
}

export interface ExamData {
  exam: ExamMetadata
  questions: ExamQuestion[]
}

export interface ExamState {
  currentQuestionIndex: number
  selectedAnswers: Record<number, number | null>
  isExamActive: boolean
  isCompleted: boolean
  score: number
}

export interface ExamResult {
  totalQuestions: number
  correctAnswers: number
  score: number
  percentage: number
  answers: Array<{
    questionId: number
    question: string
    selectedAnswer: string
    correctAnswer: string
    isCorrect: boolean
    explanation: string
  }>
}
