import React, { useEffect, useRef } from 'react';
import Question from './Question';

const TestPage = ({ page, answers, onAnswer, shuffledQuestions, debugMode, currentQuestionIndex, language, t }) => {
  // Get 9 questions for current page from shuffled questions
  const startIndex = (page - 1) * 9;
  const endIndex = startIndex + 9;
  const pageQuestions = shuffledQuestions.slice(startIndex, endIndex);
  
  // Refs for auto-scrolling to current question
  const questionRefs = useRef([]);

  // Auto-center current question when it changes
  useEffect(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex >= startIndex && currentQuestionIndex < endIndex) {
      const localIndex = currentQuestionIndex - startIndex;
      const questionElement = questionRefs.current[localIndex];
      if (questionElement) {
        setTimeout(() => {
          questionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }, 10);
      }
    }
  }, [currentQuestionIndex, startIndex, endIndex]);

  return (
    <div>
      {pageQuestions.map((question, index) => {
        const questionIndex = startIndex + index;
        const isCurrentQuestion = currentQuestionIndex === questionIndex;
        const isAnswered = answers[questionIndex] !== undefined;
        const shouldBlur = currentQuestionIndex >= 0 && !isCurrentQuestion;
        
        return (
          <div 
            key={question.id} 
            ref={el => questionRefs.current[index] = el}
            style={{ 
              position: 'relative',
              transition: 'opacity 0.15s ease, filter 0.15s ease',
              opacity: shouldBlur ? 0.3 : 1,
              filter: shouldBlur ? 'blur(1px)' : 'none',
              pointerEvents: isCurrentQuestion || isAnswered ? 'auto' : (shouldBlur ? 'none' : 'auto')
            }}
            className={isCurrentQuestion ? 'current-question' : ''}
          >
            {debugMode && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '0',
                background: '#ef4444',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'monospace',
                zIndex: 10
              }}>
                {question.category}
              </div>
            )}
            {debugMode && isAnswered && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '0',
                background: '#8b5cf6',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'monospace',
                zIndex: 10
              }}>
                Score: {answers[questionIndex] > 0 ? '+' : ''}{answers[questionIndex]}
              </div>
            )}
            {debugMode && isCurrentQuestion && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '80px',
                background: '#10b981',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 'bold',
                zIndex: 10
              }}>
                CURRENT
              </div>
            )}
            <Question
              question={`${questionIndex + 1}. ${question.text}`}
              selectedAnswer={answers[questionIndex]}
              onAnswer={(value) => onAnswer(questionIndex, value)}
              isCurrentQuestion={isCurrentQuestion}
              language={language}
              t={t}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TestPage; 