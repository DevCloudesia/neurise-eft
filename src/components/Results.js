import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TRANSLATIONS } from '../data/translations';

const Results = ({ answers, shuffledQuestions, onRetake, language, t }) => {
  const reportRef = useRef();

  // Categories matching the questions
  const categories = [
    'Cognitive Flexibility',
    'Metacognition', 
    'Working Memory',
    'Organization',
    'Emotional Regulation',
    'Inhibitory & Impulse Control',  
    'Task Initiation & Motivation',
    'Sustained Attention',
    'Time Management'
  ];

  // Calculate scores for each category using shuffled questions
  const calculateScores = () => {
    const scores = {};
    
    // Initialize scores for each category
    categories.forEach(category => {
      scores[category] = {
        answers: [],
        raw: 0,
        percentage: 50,
        questionsAnswered: 0
      };
    });

    // Debug logging
    console.log('=== SCORING DEBUG ===');
    console.log('Shuffled Questions Order:', shuffledQuestions.map(q => ({ id: q.id, category: q.category, text: q.text.substring(0, 50) + '...' })));
    console.log('Answers Array:', answers);

    // Group answers by category based on shuffled questions
    shuffledQuestions.forEach((question, index) => {
      if (answers[index] !== undefined) {
        const categoryName = question.category;
        const answerValue = answers[index];
        
        console.log(`Question ${index + 1}: "${question.text.substring(0, 30)}..." → Category: ${categoryName} → Answer: ${answerValue}`);
        
        if (scores[categoryName]) {
          scores[categoryName].answers.push(answerValue);
        }
      }
    });

    // Calculate final scores for each category
    Object.keys(scores).forEach(category => {
      const categoryAnswers = scores[category].answers;
      const rawScore = categoryAnswers.reduce((sum, answer) => sum + answer, 0);
      const percentage = Math.round(((rawScore + (categoryAnswers.length * 3)) / (categoryAnswers.length * 6)) * 100);
      
      console.log(`${category}: Answers [${categoryAnswers.join(', ')}] → Raw: ${rawScore} → Percentage: ${percentage}%`);
      
      scores[category] = {
        raw: rawScore,
        percentage: percentage,
        questionsAnswered: categoryAnswers.length
      };
    });
    
    console.log('Final Scores:', scores);
    console.log('=== END DEBUG ===');
    
    return scores;
  };

  const scores = calculateScores();

  // Get color category based on percentage
  const getColorCategory = (percentage) => {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'need-improvement';
    return 'need-attention';
  };

  // Enhanced radar chart using SVG with scale labels
  const RadarChart = ({ scores }) => {
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 60;
    const categories = Object.keys(scores);
    const values = Object.values(scores).map(s => s.percentage);
    
    const angleStep = (2 * Math.PI) / categories.length;
    
    // Generate points for the data polygon
    const dataPoints = values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const r = (value / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    
    // Generate points for the outer polygon (scale lines)
    const outerPoints = categories.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, angle, category: categories[index] };
    });

    // Scale levels and their labels - evenly spaced from -18 to +18
    const scaleRings = [
      { scale: 0.2, label: '-18' },
      { scale: 0.4, label: '-9' },
      { scale: 0.6, label: '0' },
      { scale: 0.8, label: '+9' },
      { scale: 1.0, label: '+18' }
    ];

    return (
      <div className="radar-chart-container">
        <svg width={size} height={size} style={{ overflow: 'visible' }}>
          {/* Background grid circles */}
          {scaleRings.map(({ scale }) => (
            <circle
              key={scale}
              cx={center}
              cy={center}
              r={radius * scale}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines from center to each point */}
          {outerPoints.map((point, index) => (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Data polygon */}
          <polygon
            points={dataPoints}
            fill="rgba(53, 92, 125, 0.2)"
            stroke="#355c7d"
            strokeWidth="3"
          />
          
          {/* Data points */}
          {values.map((value, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const r = (value / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="5"
                fill="#355c7d"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Category labels */}
          {outerPoints.map((point, index) => {
            // Position labels outside the chart
            const labelDistance = radius + 35;
            const labelX = center + labelDistance * Math.cos(point.angle);
            const labelY = center + labelDistance * Math.sin(point.angle);
            
            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fill="#4b5563"
                style={{ fontWeight: '500' }}
                transform={`rotate(0 ${labelX} ${labelY})`}
              >
                <tspan x={labelX} dy="0">{point.category.split(' ')[0]}</tspan>
                {point.category.split(' ').length > 1 && (
                  <tspan x={labelX} dy="15">{point.category.split(' ').slice(1).join(' ')}</tspan>
                )}
              </text>
            );
          })}
          
          {/* Scale labels - positioned on top */}
          {scaleRings.map(({ scale, label }) => (
            <text
              key={`label-${scale}`}
              x={center}
              y={center - radius * scale - 5}
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
              fontWeight="500"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  // Generate and download PDF report
  const downloadReport = async () => {
    const element = reportRef.current;
    
    // Store original styles
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;
    const originalPosition = element.style.position;
    const originalLeft = element.style.left;
    const originalTop = element.style.top;
    const originalZIndex = element.style.zIndex;
    
    // Temporarily set fixed dimensions for consistent PDF generation
    element.style.width = '210mm';
    element.style.maxWidth = '210mm';
    element.style.position = 'fixed';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.style.zIndex = '-1';
    
    // Force a reflow to apply the new styles
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
    
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // 210mm in pixels at 96 DPI
      height: element.scrollHeight
    });

    // Restore original styles
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;
    element.style.position = originalPosition;
    element.style.left = originalLeft;
    element.style.top = originalTop;
    element.style.zIndex = originalZIndex;

    const imgData = canvas.toDataURL('image/png', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const today = new Date().toISOString().split('T')[0];
    pdf.save(`Neurise-EF-Report-${today}.pdf`);
  };

  return (
    <div className="container">
      <div className="card results-container">
        <h2>{t('resultsTitle')}</h2>
        <p style={{ fontSize: '24px', color: '#6b7280', marginBottom: '40px' }}>
          {t('tagline')}
        </p>
        
        <p style={{ marginBottom: '40px', color: '#4b5563', fontSize: '18px' }}>
          {t('resultsDescription')}
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          marginBottom: '40px', 
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          textAlign: 'center'
        }}>
          <button 
            className="btn btn-primary" 
            onClick={downloadReport}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            📄 {t('downloadButton')}
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={onRetake}
            style={{
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            🔄 {t('retakeButton')}
          </button>
        </div>

                {/* Downloadable Report Content */}
        <div ref={reportRef} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', maxWidth: '210mm', margin: '0 auto' }}>
          {/* Report Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '300', color: '#1f2937', marginBottom: '8px' }}>
              {t('title')}
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '16px' }}>
              {t('reportTitle')}
            </p>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>
              {t('generatedOn')} {new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            
            {/* Left Column - Radar Chart & About */}
            <div>
              {/* Radar Chart */}
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '15px' }}>
                  {t('resultsTitle')}
                </h3>
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
                  <RadarChart scores={scores} />
                </div>
              </div>

              {/* About Section */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '12px' }}>
                  {t('aboutSection')}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#4b5563' }}>
                  {t('aboutText')}
                </p>
              </div>

              {/* Score Legend */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '12px' }}>
                  {t('scoreInterpretation')}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    <span><strong>{t('excellent')} (80%+)</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                    <span><strong>{t('good')} (60-80%)</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '2px' }}></div>
                    <span><strong>{t('needAttention')} (40-60%)</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                    <span><strong>{t('needImprovement')} (&lt;40%)</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Scores */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '15px' }}>
                {t('detailedResults')}
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {Object.entries(scores).map(([category, data]) => (
                  <div 
                    key={category} 
                    className={`category-card ${getColorCategory(data.percentage)}`}
                    style={{ 
                      padding: '16px', 
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      minHeight: '50px'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0', color: '#1f2937' }}>
                        {TRANSLATIONS[language].categories[category] || category}
                      </h4>
                      <div style={{ fontSize: '11px', color: '#6b7280' }}>
                        {t('rawScore')}: {data.raw > 0 ? '+' : ''}{data.raw}/{data.questionsAnswered * 3}
                        {data.questionsAnswered < 6 && (
                          <span style={{ color: '#ef4444', marginLeft: '4px' }}>
                            ({data.questionsAnswered}/6 {t('answered')})
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '600', 
                      color: '#374151',
                      minWidth: '60px',
                      textAlign: 'right'
                    }}>
                      {data.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Force Page Break with Moderate Margin */}
          <div style={{ marginTop: '80px', paddingTop: '30px' }}>
            {/* Page 2 Header */}
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '15px' }}>
              {t('domainExplanations')}
            </h3>
            
            {/* Domain Explanations - Compact Grid */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
                {[
                  'Working Memory',
                  'Cognitive Flexibility', 
                  'Inhibitory & Impulse Control',
                  'Organization',
                  'Task Initiation & Motivation',
                  'Sustained Attention',
                  'Emotional Regulation',
                  'Metacognition',
                  'Time Management'
                ].map((domain, index) => (
                  <div key={index} style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', borderLeft: '3px solid #355c7d' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '500', color: '#1f2937', marginBottom: '6px' }}>
                      {TRANSLATIONS[language].categories[domain] || domain}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4', margin: 0 }}>
                      {TRANSLATIONS[language].domainDescriptions[domain] || ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '12px' }}>
                {t('understandingResults')}
              </h4>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', marginBottom: '12px' }}>
                {t('understandingText')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>
                <div>
                  <p style={{ margin: '0 0 8px 0' }}>
                    <strong>{t('excellent')} (80%+):</strong> {t('excellentDesc')}
                  </p>
                  <p style={{ margin: '0' }}>
                    <strong>{t('good')} (60-80%):</strong> {t('goodDesc')}
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0 0 8px 0' }}>
                    <strong>{t('needAttention')} (40-60%):</strong> {t('needAttentionDesc')}
                  </p>
                  <p style={{ margin: '0' }}>
                    <strong>{t('needImprovement')} (&lt;40%):</strong> {t('needImprovementDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '15px', color: '#6b7280' }}>
              <p style={{ fontSize: '11px', marginBottom: '10px' }}>
                {t('disclaimer')}
              </p>
              <p style={{ fontSize: '10px', color: '#9ca3af' }}>
                Generated by {t('title')} • {t('tagline')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 