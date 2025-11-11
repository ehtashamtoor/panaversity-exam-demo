# Panaversity Exam Platform Exam Preparation

## Fundamentals of Agentic AI

### Exam Code L1:P4-FAI

A modern, secure exam-taking application built with React, TypeScript, and Tailwind CSS.

## Features

- **Full-Screen Exam Interface** - Immersive exam experience
- **Anti-Cheating Measures**:
  - Disabled right-click context menu
  - Developer tools disabled (F12, Ctrl+Shift+I, etc.)
  - Copy/paste disabled
  - Text selection disabled
  - Tab-switch warnings (3 strikes system)
  - Print prevention
  - Zoom prevention
- **Answer Management**:
  - One question per view
  - Answer locks after selection
  - No back button (linear progression)
  - Visual confirmation of answer submission
- **Results & Review**:
  - Score calculation and percentage
  - Pass/fail status based on performance
  - Detailed answer review with explanations
  - Expandable answer details
- **Responsive Design** - Works on desktop and tablet
- **Error Handling** - Comprehensive error states and recovery

## Project Structure

\`\`\`
src/
├── components/exam/
│ ├── exam-container.tsx # Main exam wrapper
│ ├── exam-header.tsx # Header with progress info
│ ├── question-display.tsx # Question and options display
│ ├── answer-option.tsx # Individual option component
│ ├── navigation-buttons.tsx # Next/Submit buttons
│ ├── results-page.tsx # Results and review page
│ ├── answer-review.tsx # Expandable answer details
│ ├── loading-screen.tsx # Loading state
│ └── error-screen.tsx # Error state
├── hooks/
│ ├── use-exam-state.ts # Exam state management
│ └── use-anti-cheat.ts # Anti-cheating hooks
├── utils/
│ ├── exam-loader.ts # Load and validate questions
│ └── score-calculator.ts # Score calculation logic
├── types/
│ └── exam.ts # TypeScript interfaces
└── app/
└── page.tsx # Main page
└── layout.tsx # Root layout
└── globals.css # Global styles
\`\`\`

## Usage

1. **Add Questions**: Update `public/exam-questions.json` with your questions
2. **Run the App**: `npm run dev`
3. **Take Exam**: Open the application in full-screen mode

## Question Format

Questions should follow this structure:

\`\`\`json
{
"id": 1,
"question": "Question text here?",
"options": [
"Option A",
"Option B",
"Option C",
"Option D"
],
"correctAnswer": 0,
"explanation": "Explanation for the correct answer"
}
\`\`\`

- `id`: Unique question identifier
- `question`: The question text
- `options`: Array of exactly 4 options
- `correctAnswer`: Index (0-3) of the correct option
- `explanation`: Explanation shown in review

## Error Handling

The application includes comprehensive error handling:

- **Data Validation**: Questions are validated on load
- **Missing Data**: Graceful handling of missing questions
- **Load Failures**: Error screen with reload option
- **State Management**: Safe state updates with error recovery

## Anti-Cheating Features

1. **Context Menu Disabled** - Right-click disabled
2. **Dev Tools Blocked** - F12 and shortcuts disabled
3. **Copy/Paste Disabled** - Cannot copy question text
4. **Text Selection Disabled** - Cannot select text
5. **Tab Switch Warnings** - 3 warnings before flagging
6. **Print Disabled** - Cannot print exam
7. **Zoom Disabled** - Cannot zoom in/out

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Development

\`\`\`bash

# Install dependencies

npm install

# Run development server

npm run dev

# Build for production

npm run build
\`\`\`
