"use client"

import { AlertCircle } from "lucide-react"

interface ErrorScreenProps {
  error: string
}

export function ErrorScreen({ error }: ErrorScreenProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-center max-w-md px-4">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Something Went Wrong</h2>
        <p className="text-slate-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          Reload Exam
        </button>
      </div>
    </div>
  )
}
