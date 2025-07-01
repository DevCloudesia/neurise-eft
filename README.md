# Executive Functioning Assessment

A modern web-based assessment tool for evaluating executive functioning across nine key cognitive domains, inspired by the design and user experience of 16personalities.com.

## Features

- **Comprehensive Assessment**: 54 questions across 6 pages measuring 9 executive functioning domains
- **Modern UI**: Clean, responsive design with smooth animations and professional styling
- **Progress Tracking**: Visual progress bar and page indicators
- **Interactive Radar Chart**: Nonagon (9-sided) visualization of results using Recharts
- **Detailed Results**: Percentile scores, interpretations, and color-coded performance indicators
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Customizing Questions

To replace the template questions with your own from the PDF:

1. Open `src/data/questions.js`
2. Replace the questions in the `QUESTIONS` array with your content
3. Ensure each question has the correct category and page number

## Technology Stack

- React 18
- Recharts for radar chart visualization
- Modern CSS with responsive design 