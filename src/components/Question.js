import React from 'react';

const Question = ({ question, onAnswer, selectedAnswer, isCurrentQuestion, language, t }) => {
  const scaleValues = [3, 2, 1, 0, -1, -2, -3];

  return (
    <div className={`question-container ${isCurrentQuestion ? 'current-question-highlight' : ''}`}>
      <div className="question-text">
        {question}
      </div>
      
      <div className="scale-wrapper">
        <div className="scale-labels-and-circles">
          <div className="scale-labels">
            <span className="agree">{t ? t('agree') : 'Agree'}</span>
          </div>
          
          <div className="scale-container">
            {scaleValues.map((value) => (
              <div
                key={value}
                className={`scale-option ${selectedAnswer === value ? 'selected' : ''}`}
                onClick={() => onAnswer(value)}
              >
                <input
                  type="radio"
                  name="scale"
                  value={value}
                  checked={selectedAnswer === value}
                  onChange={() => onAnswer(value)}
                />
              </div>
            ))}
          </div>
          
          <div className="scale-labels">
            <span className="disagree">{t ? t('disagree') : 'Disagree'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question; 