import React from 'react';

const WelcomeScreen = ({ onStart, language, t }) => {
  return (
    <div className="container">
      <div className="card welcome-screen">
        <h1>{t('title')}</h1>
        <p className="tagline">{t('tagline')}</p>
        
        <p>
          {t('welcomeDescription')}
        </p>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
            {t('whatYouExplore')}
          </h3>
          <ul style={{ 
            display: 'inline-block', 
            textAlign: 'left',
            paddingLeft: '0',
            listStyle: 'none',
            lineHeight: '1.8'
          }}>
            {t('explorerList').map((item, index) => (
              <li key={index} style={{ marginBottom: '8px', position: 'relative', paddingLeft: '20px' }}>
                <span style={{ position: 'absolute', left: '0', color: '#355c7d' }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p>
          {t('assessmentInfo')}
        </p>

        <p style={{ fontSize: '14px', color: '#6b7280', margin: '24px auto', textAlign: 'center', maxWidth: '400px' }}>
          {t('timeEstimate')}
        </p>

        <button className="btn btn-primary" onClick={onStart}>
          {t('beginButton')}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen; 