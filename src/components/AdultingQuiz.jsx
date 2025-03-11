// src/components/AdultingQuiz.jsx
import { useState, useEffect } from 'react';

// Quiz data structure with all 15 questions
const quizData = [
  {
    category: "Financial Fluency",
    id: "financial-fluency",
    questions: [
      {
        id: "q1",
        text: "Your paycheck just hit your account. Your first move is to:",
        options: [
          { id: "q1a", text: "Immediately buy those shoes you've been eyeing for weeks", value: 1 },
          { id: "q1b", text: "Pay some bills and spend the rest without much thought", value: 2 },
          { id: "q1c", text: "Transfer a set amount to savings, then handle bills and other expenses", value: 3 },
          { id: "q1d", text: "Follow your established budget with allocated percentages for savings, bills, fun money, and investments", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "Your approach to taxes could best be described as:",
        options: [
          { id: "q2a", text: "\"Wait, I need to file taxes? Since when?\"", value: 1 },
          { id: "q2b", text: "Panic-Googling \"how to do taxes\" in April and hoping for the best", value: 2 },
          { id: "q2c", text: "Using a tax software and managing to file on time", value: 3 },
          { id: "q2d", text: "Keeping organized records throughout the year and understanding deductions that apply to you", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "When it comes to emergency funds, you:",
        options: [
          { id: "q3a", text: "Live paycheck to paycheck with no emergency savings", value: 1 },
          { id: "q3b", text: "Have a credit card you'd use for emergencies", value: 2 },
          { id: "q3c", text: "Have saved about 1-3 months of expenses", value: 3 },
          { id: "q3d", text: "Have a dedicated emergency fund covering 3-6+ months of expenses", value: 4 }
        ]
      }
    ]
  },
  {
    category: "Home Management",
    id: "home-management",
    questions: [
      {
        id: "q4",
        text: "Your fridge currently contains:",
        options: [
          { id: "q4a", text: "Takeout leftovers, energy drinks, and an alarming number of expired condiments", value: 1 },
          { id: "q4b", text: "Some basic groceries, though you eat out or order in frequently", value: 2 },
          { id: "q4c", text: "A decent selection of fresh and frozen foods, as you cook several times a week", value: 3 },
          { id: "q4d", text: "Well-organized staples and fresh ingredients, with meals planned for the week", value: 4 }
        ]
      },
      {
        id: "q5",
        text: "When something breaks in your home, you:",
        options: [
          { id: "q5a", text: "Ignore it until it becomes a real problem", value: 1 },
          { id: "q5b", text: "Call someone right away (parent, landlord, maintenance person)", value: 2 },
          { id: "q5c", text: "Try to fix it yourself, but have a professional's number ready just in case", value: 3 },
          { id: "q5d", text: "Have the tools and knowledge to handle most small repairs, knowing when to DIY and when to call a pro", value: 4 }
        ]
      },
      {
        id: "q6",
        text: "Your laundry situation is best described as:",
        options: [
          { id: "q6a", text: "The floor-drobe system (clothes live primarily on the floor)", value: 1 },
          { id: "q6b", text: "Laundry gets done when you run out of clean underwear", value: 2 },
          { id: "q6c", text: "You do laundry regularly, though it might sit in the dryer for a day or two", value: 3 },
          { id: "q6d", text: "You have a laundry routine, including folding and putting clothes away promptly", value: 4 }
        ]
      }
    ]
  },
  {
    category: "Health & Wellbeing",
    id: "health-wellbeing",
    questions: [
      {
        id: "q7",
        text: "When it comes to doctor visits, you:",
        options: [
          { id: "q7a", text: "Only go when something is seriously wrong", value: 1 },
          { id: "q7b", text: "Go to urgent care when needed, but don't have regular check-ups", value: 2 },
          { id: "q7c", text: "Try to get annual check-ups, but sometimes miss them", value: 3 },
          { id: "q7d", text: "Have a primary care physician and regularly schedule preventative care appointments", value: 4 }
        ]
      },
      {
        id: "q8",
        text: "Your approach to exercise might be described as:",
        options: [
          { id: "q8a", text: "\"Does walking to the refrigerator count?\"", value: 1 },
          { id: "q8b", text: "Occasional bursts of motivation followed by long periods of inactivity", value: 2 },
          { id: "q8c", text: "Regular light activity (walking, yoga) 2-3 times per week", value: 3 },
          { id: "q8d", text: "Consistent exercise routine that includes both cardio and strength training", value: 4 }
        ]
      },
      {
        id: "q9",
        text: "When it comes to mental health, you:",
        options: [
          { id: "q9a", text: "Rarely think about it or actively avoid the topic", value: 1 },
          { id: "q9b", text: "Recognize its importance but don't take specific actions to maintain it", value: 2 },
          { id: "q9c", text: "Practice some self-care and have developed a few healthy coping mechanisms", value: 3 },
          { id: "q9d", text: "Prioritize mental wellbeing with regular practices (therapy, meditation, journaling) and boundary-setting", value: 4 }
        ]
      }
    ]
  },
  {
    category: "Professional Development",
    id: "professional-development",
    questions: [
      {
        id: "q10",
        text: "Your approach to career planning is:",
        options: [
          { id: "q10a", text: "\"I'm just trying to pay rent this month\"", value: 1 },
          { id: "q10b", text: "You have some general ideas about what you'd like to do", value: 2 },
          { id: "q10c", text: "You have specific goals and are taking steps toward them", value: 3 },
          { id: "q10d", text: "You have short and long-term career plans with actionable steps and regular reassessment", value: 4 }
        ]
      },
      {
        id: "q11",
        text: "In a workplace conflict, you typically:",
        options: [
          { id: "q11a", text: "Either blow up or completely avoid the situation", value: 1 },
          { id: "q11b", text: "Feel uncomfortable but try to address it, often with mixed results", value: 2 },
          { id: "q11c", text: "Address the issue professionally, though it may be stressful", value: 3 },
          { id: "q11d", text: "Navigate difficult conversations with emotional intelligence and work toward solutions", value: 4 }
        ]
      },
      {
        id: "q12",
        text: "When receiving feedback on your work, you:",
        options: [
          { id: "q12a", text: "Take it personally and feel defensive", value: 1 },
          { id: "q12b", text: "Listen politely but don't always implement changes", value: 2 },
          { id: "q12c", text: "Consider the feedback and apply it where appropriate", value: 3 },
          { id: "q12d", text: "Actively seek constructive criticism and use it to improve", value: 4 }
        ]
      }
    ]
  },
  {
    category: "Relationships & Communication",
    id: "relationships-communication",
    questions: [
      {
        id: "q13",
        text: "When making significant decisions, you:",
        options: [
          { id: "q13a", text: "Act impulsively based on your feelings in the moment", value: 1 },
          { id: "q13b", text: "Ask for lots of advice from friends/family and rely heavily on their input", value: 2 },
          { id: "q13c", text: "Consider pros and cons but sometimes second-guess yourself", value: 3 },
          { id: "q13d", text: "Reflect on your values, gather needed information, and trust your judgment", value: 4 }
        ]
      },
      {
        id: "q14",
        text: "In difficult interpersonal situations, you:",
        options: [
          { id: "q14a", text: "Ghost people or use passive-aggressive communication", value: 1 },
          { id: "q14b", text: "Struggle to express your needs but make some attempt", value: 2 },
          { id: "q14c", text: "Generally communicate directly, though emotional conversations are challenging", value: 3 },
          { id: "q14d", text: "Express your feelings and boundaries clearly while respecting others' perspectives", value: 4 }
        ]
      },
      {
        id: "q15",
        text: "Your approach to commitments and promises is:",
        options: [
          { id: "q15a", text: "Often make promises in the moment that you later realize you can't keep", value: 1 },
          { id: "q15b", text: "Try to keep your word but frequently overcommit yourself", value: 2 },
          { id: "q15c", text: "Generally reliable, though occasionally drop the ball on smaller commitments", value: 3 },
          { id: "q15d", text: "Carefully consider before committing and consistently follow through", value: 4 }
        ]
      }
    ]
  }
];

// Create an array with all questions for sequential access
const allQuestions = quizData.flatMap(category => category.questions);

// Define archetypes based on score ranges
const archetypes = [
  {
    range: [0, 15],
    title: "The Adulting Newcomer",
    description: "You're just getting started on your adulting journey, and that's perfectly okay! Everyone begins somewhere. Focus on building one skill at a time and remember that even small progress counts."
  },
  {
    range: [16, 30],
    title: "The Work-in-Progress Adult",
    description: "You've figured out some basics, but still have plenty of \"learning opportunities\" (aka mistakes waiting to happen). Keep up the momentum and don't be afraid to ask for help when you need it."
  },
  {
    range: [31, 45],
    title: "The Mostly-Got-This Grown-Up",
    description: "You're handling most adult responsibilities well, with occasional moments of \"Wait, how do I do this again?\" You've built a solid foundation and can now focus on fine-tuning your adulting skills."
  },
  {
    range: [46, 60],
    title: "The Seasoned Adult",
    description: "Impressive! You've mastered many aspects of adulting. Your friends probably come to you for advice. Consider sharing your wisdom with others who are still finding their footing."
  }
];

// Superpower descriptions based on highest category
const superpowerTexts = {
  'financial-fluency': 'You excel at managing your finances wisely, which puts you ahead of many of your peers. Your ability to plan for your financial future creates stability that supports all other areas of your life.',
  'home-management': 'Your home management skills are impressive! You've created systems that keep your living space functioning smoothly, which reduces daily stress and creates a foundation for success in other areas.',
  'health-wellbeing': 'You prioritize your physical and mental wellbeing, which is the foundation for everything else in life. Your self-care practices give you the energy and resilience to tackle other adulting challenges.',
  'professional-development': 'Your professional skills and career planning set you apart. You approach work with intention and strategy, which positions you for long-term success and growth.',
  'relationships-communication': 'Your communication skills and ability to build healthy relationships are your greatest strength. These interpersonal abilities will serve you well in every aspect of life and career.'
};

// Growth opportunity descriptions based on lowest category
const growthTexts = {
  'financial-fluency': 'Consider developing a stronger foundation in financial literacy. Learning about budgeting, saving, and long-term planning will reduce stress and create more freedom in your life.',
  'home-management': 'Creating more structured systems for household management could free up mental energy for other priorities. Start with one small habit, like a 10-minute daily tidy-up routine.',
  'health-wellbeing': 'Investing more in your physical and mental wellbeing will boost your energy and resilience. Consider adding one small self-care practice to your daily routine.',
  'professional-development': 'Taking a more intentional approach to your career development could open new opportunities. Consider setting aside time to reflect on your professional goals and growth areas.',
  'relationships-communication': 'Developing stronger communication skills and relationship boundaries would benefit multiple areas of your life. Consider practicing more direct communication in low-stakes situations.'
};

export default function AdultingQuiz() {
  // Quiz state
  const [currentView, setCurrentView] = useState('intro'); // 'intro', 'quiz', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({
    totalScore: 0,
    archetypeTitle: '',
    archetypeDescription: '',
    categoryScores: {
      'financial-fluency': 0,
      'home-management': 0,
      'health-wellbeing': 0,
      'professional-development': 0,
      'relationships-communication': 0
    },
    superpower: '',
    growthArea: ''
  });

  const totalQuestions = allQuestions.length;

  // Handle option selection
  const handleOptionSelect = (questionId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    return userAnswers[allQuestions[currentQuestionIndex].id] !== undefined;
  };

  // Navigation functions
  const startQuiz = () => setCurrentView('quiz');
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const finishQuiz = () => {
    calculateResults();
    setCurrentView('results');
  };

  // Calculate quiz results
  const calculateResults = () => {
    // Calculate scores for each category
    const categoryScores = {
      'financial-fluency': 0,
      'home-management': 0,
      'health-wellbeing': 0,
      'professional-development': 0,
      'relationships-communication': 0
    };
    
    // Calculate total score and category scores
    let totalScore = 0;
    
    Object.entries(userAnswers).forEach(([questionId, value]) => {
      totalScore += value;
      
      // Determine category from question ID
      const questionNumber = parseInt(questionId.substring(1));
      
      if (questionNumber <= 3) {
        categoryScores['financial-fluency'] += value;
      } else if (questionNumber <= 6) {
        categoryScores['home-management'] += value;
      } else if (questionNumber <= 9) {
        categoryScores['health-wellbeing'] += value;
      } else if (questionNumber <= 12) {
        categoryScores['professional-development'] += value;
      } else {
        categoryScores['relationships-communication'] += value;
      }
    });

    // Determine archetype based on total score
    let archetypeTitle, archetypeDescription;
    
    if (totalScore <= 15) {
      archetypeTitle = archetypes[0].title;
      archetypeDescription = archetypes[0].description;
    } else if (totalScore <= 30) {
      archetypeTitle = archetypes[1].title;
      archetypeDescription = archetypes[1].description;
    } else if (totalScore <= 45) {
      archetypeTitle = archetypes[2].title;
      archetypeDescription = archetypes[2].description;
    } else {
      archetypeTitle = archetypes[3].title;
      archetypeDescription = archetypes[3].description;
    }

    // Find highest and lowest scoring categories
    let highestCategory = 'financial-fluency';
    let highestScore = categoryScores['financial-fluency'];
    let lowestCategory = 'financial-fluency';
    let lowestScore = categoryScores['financial-fluency'];
    
    Object.entries(categoryScores).forEach(([category, score]) => {
      if (score > highestScore) {
        highestScore = score;
        highestCategory = category;
      }
      if (score < lowestScore) {
        lowestScore = score;
        lowestCategory = category;
      }
    });
    
    setResults({
      totalScore,
      archetypeTitle,
      archetypeDescription,
      categoryScores,
      superpower: superpowerTexts[highestCategory],
      growthArea: growthTexts[lowestCategory]
    });
  };

  // Get current category
  const getCurrentCategory = () => {
    const categoryIndex = Math.floor(currentQuestionIndex / 3);
    return quizData[categoryIndex].category;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  };

  // Handle sharing results
  const handleShare = () => {
    alert('Share functionality would be implemented here. This would allow users to share their results on social media.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Introduction Section */}
      {currentView === 'intro' && (
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What's Your Adulting Score?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everyone's talking about "adulting" these days, but how are you really doing with the whole grown-up thing? Take our quiz to discover your adulting style, strengths, and opportunities to level up. No judgment here - we're all figuring it out together!
          </p>
          <button 
            onClick={startQuiz}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Start The Quiz
          </button>
        </section>
      )}

      {/* Quiz Content */}
      {currentView === 'quiz' && (
        <section className="bg-white rounded-xl shadow-md p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{getCurrentCategory()}</span>
              <span className="text-sm font-medium text-gray-600">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Current Question */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-6">
              {currentQuestionIndex + 1}. {allQuestions[currentQuestionIndex].text}
            </h2>
            <div className="space-y-3">
              {allQuestions[currentQuestionIndex].options.map(option => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    userAnswers[allQuestions[currentQuestionIndex].id] === option.value
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                  }`}
                  onClick={() => handleOptionSelect(allQuestions[currentQuestionIndex].id, option.value)}
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button 
              onClick={goToPreviousQuestion}
              className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button 
                onClick={finishQuiz}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isCurrentQuestionAnswered()}
              >
                See My Results
              </button>
            ) : (
              <button 
                onClick={goToNextQuestion}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isCurrentQuestionAnswered()}
              >
                Next
              </button>
            )}
          </div>
        </section>
      )}

      {/* Results View */}
      {currentView === 'results' && (
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Adulting Results</h2>
          
          {/* Overall Score */}
          <div className="bg-gray-100 rounded-xl p-6 mb-10">
            <h3 className="text-xl font-semibold text-center mb-4">
              Your Adulting Score: {results.totalScore}/60
            </h3>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                style={{ width: `${(results.totalScore / 60) * 100}%` }}
              ></div>
            </div>
            
            {/* Archetype Section */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                You are: {results.archetypeTitle}
              </h3>
              <p className="text-gray-600">{results.archetypeDescription}</p>
            </div>
          </div>
          
          {/* Results Graphic Placeholder */}
          <div className="bg-gray-100 rounded-xl p-6 mb-10 flex items-center justify-center">
            <div className="text-center p-16">
              <h3 className="text-xl font-semibold mb-3">Your Adulting Profile</h3>
              <p className="text-gray-500 mb-4">[Graphic will appear here]</p>
              <div className="w-64 h-64 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400">Adulting Profile Chart</span>
              </div>
            </div>
          </div>
          
          {/* Category Breakdown */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6">Your Adulting Breakdown</h3>
            <div className="space-y-4">
              {quizData.map(category => (
                <div key={category.id} className="category-score">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{category.category}</span>
                    <span>{results.categoryScores[category.id]}/12</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                      style={{ width: `${(results.categoryScores[category.id] / 12) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Strengths and Opportunities */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3">Your Adulting Superpower</h3>
              <p className="text-gray-600">{results.superpower}</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3">Your Growth Opportunity</h3>
              <p className="text-gray-600">{results.growthArea}</p>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-gray-100 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-3">Ready to level up your adulting skills?</h3>
            <p className="text-gray-600 mb-6">
              Join our community of adulting works-in-progress to get personalized content, connect with others on the same journey, and build your confidence in adult life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/#community" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
                Join The Tribe
              </a>
              <button 
                onClick={handleShare}
                className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition"
              >
                Share My Results
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}