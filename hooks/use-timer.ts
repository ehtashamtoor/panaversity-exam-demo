"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseTimerProps {
  totalSeconds: number
  onTimeUp?: () => void
  autoStart?: boolean
}

interface UseTimerReturn {
  timeLeft: number
  minutes: number
  seconds: number
  isActive: boolean
  start: () => void
  pause: () => void
  reset: () => void
  isTimeUp: boolean
  percentage: number
}

export function useTimer({ totalSeconds, onTimeUp, autoStart = false }: UseTimerProps): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds)
  const [isActive, setIsActive] = useState<boolean>(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isActive) return

    if (timeLeft <= 0) {
      setIsActive(false)
      onTimeUp?.()
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          setIsActive(false)
          onTimeUp?.()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, onTimeUp])

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsActive(true)
    }
  }, [timeLeft])

  const pause = useCallback(() => {
    setIsActive(false)
  }, [])

  const reset = useCallback(() => {
    setIsActive(false)
    setTimeLeft(totalSeconds)
  }, [totalSeconds])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isTimeUp = timeLeft === 0
  const percentage = (timeLeft / totalSeconds) * 100

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    timeLeft,
    minutes,
    seconds,
    isActive,
    start,
    pause,
    reset,
    isTimeUp,
    percentage,
  }
}
