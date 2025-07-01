import React, { useState, useEffect, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import TestPage from './components/TestPage';
import Results from './components/Results';
import { QUESTIONS } from './data/questions';
import { QUESTIONS_ZH } from './data/questionsZH';
import { TRANSLATIONS } from './data/translations';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = welcome, 1-6 = test pages, 7 = results
  const [answers, setAnswers] = useState([]); // Array to store answers by question index
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'zh'

  // Helper functions for translations
  const getCurrentQuestions = () => language === 'zh' ? QUESTIONS_ZH : QUESTIONS;
  const t = (key, params = {}) => {
    let text = TRANSLATIONS[language][key] || key;
    // Replace parameters like {page}, {score}, etc.
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const toggleLanguage = () => {
    // Don't allow language switching during test (pages 1-6)
    if (currentPage >= 1 && currentPage <= 6) {
      return;
    }
    
    const newLanguage = language === 'en' ? 'zh' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('neurishLanguage', newLanguage);
    
    // Clear existing assessment and reshuffle with new language
    localStorage.removeItem('neurishAssessment');
    setAnswers([]);
    setCurrentPage(0);
    setShuffledQuestions(shuffleArray(newLanguage === 'zh' ? QUESTIONS_ZH : QUESTIONS));
  };

  // Load saved language preference and assessment data or shuffle questions on app load
  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('neurishLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage);
    }

    const savedAssessment = localStorage.getItem('neurishAssessment');
    if (savedAssessment) {
      try {
        const { answers: savedAnswers, shuffledQuestions: savedQuestions, language: savedLang } = JSON.parse(savedAssessment);
        // Verify we have complete answers (all 54 questions answered) and matching language
        if (savedAnswers.length === 54 && savedAnswers.every(answer => answer !== undefined)) {
          setAnswers(savedAnswers);
          setShuffledQuestions(savedQuestions);
          if (savedLang) setLanguage(savedLang);
          setCurrentPage(7); // Go directly to results page
          return;
        }
      } catch (error) {
        console.log('Error loading saved assessment:', error);
        localStorage.removeItem('neurishAssessment');
      }
    }
    // If no valid saved assessment, start fresh
    const currentLanguage = savedLanguage || 'en';
    setShuffledQuestions(shuffleArray(currentLanguage === 'zh' ? QUESTIONS_ZH : QUESTIONS));
  }, []);

  // Keyboard shortcut for debug mode (Ctrl+Shift+D)
  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
      event.preventDefault();
      setDebugMode(prev => !prev);
      console.log(`Debug mode ${!debugMode ? 'enabled' : 'disabled'}`);
    }
  }, [debugMode]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Scroll to top helper function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (questionIndex, value) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  };

  const handleStartTest = () => {
    setCurrentPage(1);
    setTimeout(scrollToTop, 100);
  };

  const handleNextPage = () => {
    if (currentPage < 6) {
      setCurrentPage(currentPage + 1);
    } else {
      // Save assessment data before going to results
      const assessmentData = {
        answers: answers,
        shuffledQuestions: shuffledQuestions,
        language: language,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('neurishAssessment', JSON.stringify(assessmentData));
      setCurrentPage(7); // Go to results
    }
    setTimeout(scrollToTop, 100);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 1) {
      setCurrentPage(0); // Go back to welcome screen
    }
    setTimeout(scrollToTop, 100);
  };

  const handleRetakeAssessment = () => {
    // Clear saved assessment data
    localStorage.removeItem('neurishAssessment');
    setCurrentPage(0);
    setAnswers([]);
    setShuffledQuestions(shuffleArray(getCurrentQuestions()));
    setTimeout(scrollToTop, 100);
  };

  // Debug function to randomly fill all answers
  const handleFillRandomAnswers = () => {
    const randomAnswers = [];
    const scaleValues = [3, 2, 1, 0, -1, -2, -3]; // Agree to Disagree scale
    
    // Generate 54 random answers
    for (let i = 0; i < 54; i++) {
      const randomIndex = Math.floor(Math.random() * scaleValues.length);
      randomAnswers[i] = scaleValues[randomIndex];
    }
    
    setAnswers(randomAnswers);
    
    // Save assessment data for debug mode too
    const assessmentData = {
      answers: randomAnswers,
      shuffledQuestions: shuffledQuestions,
      language: language,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('neurishAssessment', JSON.stringify(assessmentData));
    
    // Navigate to results page after a short delay
    setTimeout(() => {
      setCurrentPage(7);
      scrollToTop();
    }, 500);
  };

  const getProgress = () => {
    if (currentPage === 0) return 0;
    if (currentPage === 7) return 100;
    return (currentPage / 6) * 100;
  };

  const isPageComplete = () => {
    if (currentPage === 0 || currentPage === 7) return true;
    
    // Check if all questions on current page are answered
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    
    for (let i = startIndex; i < endIndex; i++) {
      if (answers[i] === undefined) {
        return false;
      }
    }
    return true;
  };

  // Find current question (first unanswered question on current page)
  const getCurrentQuestionIndex = () => {
    if (currentPage === 0 || currentPage === 7) return -1;
    
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    
    for (let i = startIndex; i < endIndex; i++) {
      if (answers[i] === undefined) {
        return i;
      }
    }
    return -1; // All questions answered
  };

  if (currentPage === 0) {
    return (
      <div>
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#355C7D',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: '500',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => e.target.style.background = '#2a4a63'}
          onMouseOut={(e) => e.target.style.background = '#355C7D'}
        >
          🌐 {language === 'en' ? 'Language: EN | 中文' : '语言: 中文 | EN'}
        </button>
        <WelcomeScreen onStart={handleStartTest} language={language} t={t} />
      </div>
    );
  }

  if (currentPage === 7) {
    return (
      <div>
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#355C7D',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: '500',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => e.target.style.background = '#2a4a63'}
          onMouseOut={(e) => e.target.style.background = '#355C7D'}
        >
          🌐 {language === 'en' ? 'Language: EN | 中文' : '语言: 中文 | EN'}
        </button>
        <Results 
          answers={answers} 
          shuffledQuestions={shuffledQuestions} 
          onRetake={handleRetakeAssessment}
          language={language}
          t={t}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        {/* Language Toggle Button - Disabled during test */}
        <button
          onClick={toggleLanguage}
          disabled={currentPage >= 1 && currentPage <= 6}
          style={{
            position: 'fixed',
            top: '20px',
            right: debugMode ? '280px' : '20px',
            background: (currentPage >= 1 && currentPage <= 6) ? '#9ca3af' : '#355C7D',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: (currentPage >= 1 && currentPage <= 6) ? 'not-allowed' : 'pointer',
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: '500',
            zIndex: 1000,
            boxShadow: (currentPage >= 1 && currentPage <= 6) ? '0 2px 4px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: (currentPage >= 1 && currentPage <= 6) ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            if (!(currentPage >= 1 && currentPage <= 6)) {
              e.target.style.background = '#2a4a63';
            }
          }}
          onMouseOut={(e) => {
            if (!(currentPage >= 1 && currentPage <= 6)) {
              e.target.style.background = '#355C7D';
            }
          }}
        >
          🌐 {(currentPage >= 1 && currentPage <= 6) 
            ? (language === 'en' ? 'Language locked during test' : '测试期间语言锁定')
            : (language === 'en' ? 'Language: EN | 中文' : '语言: 中文 | EN')
          }
        </button>

        {debugMode && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#1f2937',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            fontSize: '12px',
            zIndex: 1000,
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center'
          }}>
            <div>DEBUG MODE ON (Ctrl+Shift+D to toggle)</div>
            <button
              onClick={handleFillRandomAnswers}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: 'bold'
              }}
            >
              🎲 Fill Random Answers & Go to Results
            </button>
          </div>
        )}
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${getProgress()}%` }}></div>
        </div>
        
        <div className="page-info">
          {t('pageInfo', { 
            page: currentPage, 
            start: ((currentPage - 1) * 9) + 1, 
            end: currentPage * 9 
          })}
        </div>

        <TestPage
          page={currentPage}
          answers={answers}
          onAnswer={handleAnswer}
          shuffledQuestions={shuffledQuestions}
          debugMode={debugMode}
          currentQuestionIndex={getCurrentQuestionIndex()}
          language={language}
          t={t}
        />

        <div className="navigation">
          <button
            className="btn btn-secondary"
            onClick={handlePrevPage}
          >
            {currentPage === 1 ? t('backButton') : t('previousButton')}
          </button>
          
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={!isPageComplete()}
          >
            {currentPage === 6 ? t('completeButton') : t('nextButton')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App; 