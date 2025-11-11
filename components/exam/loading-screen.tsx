"use client"

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading Exam</h2>
        <p className="text-slate-400">Preparing your examination...</p>
      </div>
    </div>
  )
}
