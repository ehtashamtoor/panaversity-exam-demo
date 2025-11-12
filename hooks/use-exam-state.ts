"use client"

import { useState, useCallback } from "react"
import type { ExamState, ExamQuestion, ExamResult } from "@/types/exam"

export function useExamState(questions: ExamQuestion[]) {
  const [state, setState] = useState<ExamState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    isExamActive: true,
    isCompleted: false,
    score: 0,
  })

  const [result, setResult] = useState<ExamResult | null>(null)

  // Select answer for current question
  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (!state.isExamActive) return

      setState((prev) => ({
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [prev.currentQuestionIndex]: answerIndex,
        },
      }))
    },
    [state.isExamActive],
  )

  // Move to next question
  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex < questions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }
      } else {
        // Exam completed
        const calculatedResult = calculateResult(prev.selectedAnswers, questions)
        setResult(calculatedResult)
        return {
          ...prev,
          isExamActive: false,
          isCompleted: true,
          score: calculatedResult.correctAnswers,
        }
      }
    })
  }, [questions])

  // Calculate final result
  const calculateResult = useCallback((selectedAnswers: Record<number, number | null>, qs: ExamQuestion[]) => {
    let correctCount = 0
    const answers = qs.map((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index]
      const isCorrect = selectedAnswerIndex === question.correctAnswer

      if (isCorrect) correctCount++

      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer:
          selectedAnswerIndex !== null && selectedAnswerIndex !== undefined
            ? question.options[selectedAnswerIndex]
            : "Not answered",
        correctAnswer: question.options[question.correctAnswer],
        isCorrect,
        explanation: question.explanation,
      }
    })

    return {
      totalQuestions: qs.length,
      correctAnswers: correctCount,
      score: correctCount,
      percentage: Math.round((correctCount / qs.length) * 100),
      answers,
    }
  }, [])

  // Get current selected answer
  const getCurrentAnswer = useCallback(() => {
    return state.selectedAnswers[state.currentQuestionIndex] ?? null
  }, [state.selectedAnswers, state.currentQuestionIndex])

  // Force submit exam (used for time up or fullscreen exit)
  const submitExam = useCallback(() => {
    setState((prev) => {
      const calculatedResult = calculateResult(prev.selectedAnswers, questions)
      setResult(calculatedResult)
      return {
        ...prev,
        isExamActive: false,
        isCompleted: true,
        score: calculatedResult.correctAnswers,
      }
    })
  }, [questions, calculateResult])

  // Reset exam function
  const resetExam = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isExamActive: true,
      isCompleted: false,
      score: 0,
    })
    setResult(null)
  }, [])

  return {
    state,
    result,
    selectAnswer,
    nextQuestion,
    getCurrentAnswer,
    submitExam,
    resetExam,
  }
}
