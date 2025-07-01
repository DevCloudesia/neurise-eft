// Executive Functioning Categories
export const CATEGORIES = {
  COGNITIVE_FLEXIBILITY: 'Cognitive Flexibility',
  METACOGNITION: 'Metacognition',
  WORKING_MEMORY: 'Working Memory',
  ORGANIZATION: 'Organization',
  EMOTIONAL_REGULATION: 'Emotional Regulation',
  INHIBITORY_CONTROL: 'Inhibitory & Impulse Control',
  TASK_INITIATION: 'Task Initiation & Motivation',
  SUSTAINED_ATTENTION: 'Sustained Attention',
  TIME_MANAGEMENT: 'Time Management'
};

// Scale options (from +3 to -3)
export const SCALE_OPTIONS = [
  { value: 3, label: 'Strongly Agree' },
  { value: 2, label: 'Agree' },
  { value: 1, label: 'Slightly Agree' },
  { value: 0, label: 'Neutral' },
  { value: -1, label: 'Slightly Disagree' },
  { value: -2, label: 'Disagree' },
  { value: -3, label: 'Strongly Disagree' }
];

// Actual questions from the EF Assessment Scale
export const QUESTIONS = [
  // Page 1 - Questions 1-9 (First question from each category)
  {
    id: 1,
    text: "When plans change, I quickly adapt and come up with alternative solutions.",
    category: CATEGORIES.COGNITIVE_FLEXIBILITY,
    page: 1
  },
  {
    id: 2,
    text: "I have a clear understanding of my strengths and areas that need improvement.",
    category: CATEGORIES.METACOGNITION,
    page: 1
  },
  {
    id: 3,
    text: "I can remember multi-step instructions and complete them in order.",
    category: CATEGORIES.WORKING_MEMORY,
    page: 1
  },
  {
    id: 4,
    text: "I keep my belongings neat and organized so I can find them easily.",
    category: CATEGORIES.ORGANIZATION,
    page: 1
  },
  {
    id: 5,
    text: "When I'm upset, I know how to calm myself down effectively.",
    category: CATEGORIES.EMOTIONAL_REGULATION,
    page: 1
  },
  {
    id: 6,
    text: "I think about potential consequences before making decisions.",
    category: CATEGORIES.INHIBITORY_CONTROL,
    page: 1
  },
  {
    id: 7,
    text: "I start tasks on my own without needing reminders from others.",
    category: CATEGORIES.TASK_INITIATION,
    page: 1
  },
  {
    id: 8,
    text: "I can focus on a single task for extended periods of time.",
    category: CATEGORIES.SUSTAINED_ATTENTION,
    page: 1
  },
  {
    id: 9,
    text: "I complete tasks on time because I value and manage my time well.",
    category: CATEGORIES.TIME_MANAGEMENT,
    page: 1
  },

  // Page 2 - Questions 10-18 (Second question from each category)
  {
    id: 10,
    text: "I can easily switch from leisure activities to focused learning tasks.",
    category: CATEGORIES.COGNITIVE_FLEXIBILITY,
    page: 2
  },
  {
    id: 11,
    text: "Before starting a task, I think about the most efficient way to complete it.",
    category: CATEGORIES.METACOGNITION,
    page: 2
  },
  {
    id: 12,
    text: "When listening to stories, I retain the important details and plot points.",
    category: CATEGORIES.WORKING_MEMORY,
    page: 2
  },
  {
    id: 13,
    text: "I gather all necessary materials before starting a task.",
    category: CATEGORIES.ORGANIZATION,
    page: 2
  },
  {
    id: 14,
    text: "When facing criticism or failure, I can gradually regain my composure.",
    category: CATEGORIES.EMOTIONAL_REGULATION,
    page: 2
  },
  {
    id: 15,
    text: "When studying, I can resist distractions and stay focused.",
    category: CATEGORIES.INHIBITORY_CONTROL,
    page: 2
  },
  {
    id: 16,
    text: "I believe that effort and hard work help me achieve my goals.",
    category: CATEGORIES.TASK_INITIATION,
    page: 2
  },
  {
    id: 17,
    text: "Even in distracting environments, I can maintain my concentration.",
    category: CATEGORIES.SUSTAINED_ATTENTION,
    page: 2
  },
  {
    id: 18,
    text: "I balance my daily schedule between work/study and rest effectively.",
    category: CATEGORIES.TIME_MANAGEMENT,
    page: 2
  },

  // Page 3 - Questions 19-27 (Third question from each category)
  {
    id: 19,
    text: "When facing difficult problems, I try different approaches or perspectives.",
    category: CATEGORIES.COGNITIVE_FLEXIBILITY,
    page: 3
  },
  {
    id: 20,
    text: "During tasks, I adjust my strategies if they're not working well.",
    category: CATEGORIES.METACOGNITION,
    page: 3
  },
  {
    id: 21,
    text: "I can quickly apply newly learned information or skills.",
    category: CATEGORIES.WORKING_MEMORY,
    page: 3
  },
  {
    id: 22,
    text: "When planning tasks, I consider which should be done first and which can wait.",
    category: CATEGORIES.ORGANIZATION,
    page: 3
  },
  {
    id: 23,
    text: "I express my emotions appropriately rather than keeping them bottled up.",
    category: CATEGORIES.EMOTIONAL_REGULATION,
    page: 3
  },
  {
    id: 24,
    text: "I complete tasks before allowing myself to take breaks or relax.",
    category: CATEGORIES.INHIBITORY_CONTROL,
    page: 3
  },
  {
    id: 25,
    text: "When facing challenges, I don't give up easily.",
    category: CATEGORIES.TASK_INITIATION,
    page: 3
  },
  {
    id: 26,
    text: "I finish one task completely before moving on to the next.",
    category: CATEGORIES.SUSTAINED_ATTENTION,
    page: 3
  },
  {
    id: 27,
    text: "I prioritize important tasks and handle them first.",
    category: CATEGORIES.TIME_MANAGEMENT,
    page: 3
  },

  // Page 4 - Questions 28-36 (Fourth question from each category)
  {
    id: 28,
    text: "I'm open to hearing opinions that differ from my own.",
    category: CATEGORIES.COGNITIVE_FLEXIBILITY,
    page: 4
  },
  {
    id: 29,
    text: "After completing tasks, I reflect on how I could do better next time.",
    category: CATEGORIES.METACOGNITION,
    page: 4
  },
  {
    id: 30,
    text: "I rarely get stuck because I've forgotten important details while working.",
    category: CATEGORIES.WORKING_MEMORY,
    page: 4
  },
  {
    id: 31,
    text: "I approach tasks systematically without feeling overwhelmed or chaotic.",
    category: CATEGORIES.ORGANIZATION,
    page: 4
  },
  {
    id: 32,
    text: "I understand that my emotions can impact how well I perform tasks.",
    category: CATEGORIES.EMOTIONAL_REGULATION,
    page: 4
  },
  {
    id: 33,
    text: "I don't impulsively interrupt others when they're speaking or working.",
    category: CATEGORIES.INHIBITORY_CONTROL,
    page: 4
  },
  {
    id: 34,
    text: "Even when I don't enjoy a task, I can motivate myself to begin.",
    category: CATEGORIES.TASK_INITIATION,
    page: 4
  },
  {
    id: 35,
    text: "I rarely lose focus and can maintain concentration throughout tasks.",
    category: CATEGORIES.SUSTAINED_ATTENTION,
    page: 4
  },
  {
    id: 36,
    text: "I can accurately estimate how long tasks will take to complete.",
    category: CATEGORIES.TIME_MANAGEMENT,
    page: 4
  },

  // Page 5 - Questions 37-45 (Fifth question from each category)
  {
    id: 37,
    text: "I look at problems flexibly and don't get stuck on one way of thinking.",
    category: CATEGORIES.COGNITIVE_FLEXIBILITY,
    page: 5
  },
  {
    id: 38,
    text: "I'm aware of how my emotions affect my performance.",
    category: CATEGORIES.METACOGNITION,
    page: 5
  },
  {
    id: 39,
    text: "I can manage information from several tasks simultaneously.",
    category: CATEGORIES.WORKING_MEMORY,
    page: 5
  },
  {
    id: 40,
    text: "My backpack, desk, and room are usually tidy and well-organized.",
    category: CATEGORIES.ORGANIZATION,
    page: 5
  },
  {
    id: 41,
    text: "In stressful situations, I can manage my emotions and stay in control.",
    category: CATEGORIES.EMOTIONAL_REGULATION,
    page: 5
  },
  {
    id: 42,
    text: "I can resist doing things I want to do but know are inappropriate.",
    category: CATEGORIES.INHIBITORY_CONTROL,
    page: 5
  },
  {
    id: 43,
    text: "I set goals for myself and work steadily toward achieving them.",
    category: CATEGORIES.TASK_INITIATION,
    page: 5
  },
  {
    id: 44,
    text: "When my attention does wander, I can quickly refocus on what I'm doing.",
    category: CATEGORIES.SUSTAINED_ATTENTION,
    page: 5
  },
  {
    id: 45,
    text: "I don't procrastinate or leave things until the last minute.",
    category: CATEGORIES.TIME_MANAGEMENT,
    page: 5
  },

  // Page 6 - Questions 46-54 (Sixth question from each category)
  {
    id: 46,
    text: "When encountering new situations, I can quickly adjust my approach.",
    category: CATEGORIES.COGNITIVE_FLEXIBILITY,
    page: 6
  },
  {
    id: 47,
    text: "I know which habits help me accomplish tasks more effectively.",
    category: CATEGORIES.METACOGNITION,
    page: 6
  },
  {
    id: 48,
    text: "When reading articles, I remember the key points rather than forgetting as I go.",
    category: CATEGORIES.WORKING_MEMORY,
    page: 6
  },
  {
    id: 49,
    text: "I follow clear, logical steps when completing tasks.",
    category: CATEGORIES.ORGANIZATION,
    page: 6
  },
  {
    id: 50,
    text: "When facing setbacks, I can encourage myself to keep trying.",
    category: CATEGORIES.EMOTIONAL_REGULATION,
    page: 6
  },
  {
    id: 51,
    text: "When faced with temptations, I can prioritize important tasks first.",
    category: CATEGORIES.INHIBITORY_CONTROL,
    page: 6
  },
  {
    id: 52,
    text: "I maintain momentum when working and rarely abandon tasks halfway through.",
    category: CATEGORIES.TASK_INITIATION,
    page: 6
  },
  {
    id: 53,
    text: "I stay on task without getting sidetracked by other activities.",
    category: CATEGORIES.SUSTAINED_ATTENTION,
    page: 6
  },
  {
    id: 54,
    text: "I can flexibly adjust my schedule based on time constraints and priorities.",
    category: CATEGORIES.TIME_MANAGEMENT,
    page: 6
  }
];

// Helper function to get questions by page
export const getQuestionsByPage = (page) => {
  return QUESTIONS.filter(q => q.page === page);
};

// Helper function to get all categories
export const getAllCategories = () => {
  return Object.values(CATEGORIES);
}; 