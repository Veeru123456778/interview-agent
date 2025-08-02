const { INTERVIEW_PHASES, ANSWER_QUALITY, NODES } = require('./types');

// Simple Interview Engine (without complex LangGraph)
class SimpleInterviewEngine {
  constructor() {
    this.currentPhase = INTERVIEW_PHASES.GREETING;
    this.questionCount = 0;
    this.maxQuestions = 15;
  }

  async processInterview(state, action = 'start') {
    switch (action) {
      case 'start':
        return this.startInterview(state);
      case 'answer':
        return this.processAnswer(state);
      default:
        return state;
    }
  }

  startInterview(state) {
    const greetings = [
      "Hello! Welcome to your interview today. I'm excited to get to know you better.",
      "Hi there! Thanks for joining me today. I'm looking forward to our conversation.",
      "Welcome! I hope you're doing well today. Let's begin with your interview.",
      "Good day! Thank you for your time today. I'm here to learn more about you and your experience."
    ];

    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const firstQuestion = "Let's start with introductions. Could you please tell me your name and a bit about yourself?";

    return {
      ...state,
      currentPhase: INTERVIEW_PHASES.INTRODUCTION,
      lastQuestion: firstQuestion,
      questionCount: 1,
      conversationHistory: [
        {
          role: 'assistant',
          message: greeting,
          timestamp: new Date().toISOString()
        },
        {
          role: 'assistant',
          message: firstQuestion,
          timestamp: new Date().toISOString()
        }
      ],
      askedQuestions: [firstQuestion]
    };
  }

  processAnswer(state) {
    // Simple answer analysis
    const answer = state.lastAnswer.toLowerCase();
    let needsFollowUp = false;
    let quality = ANSWER_QUALITY.GOOD;

    // Check for special requests
    if (answer.includes('repeat') || answer.includes('again')) {
      return this.repeatQuestion(state);
    }

    if (answer.includes('clarify') || answer.includes('understand') || answer.includes('confused')) {
      return this.clarifyQuestion(state);
    }

    // Simple quality assessment
    if (answer.length < 20) {
      quality = ANSWER_QUALITY.INSUFFICIENT;
      needsFollowUp = true;
    } else if (answer.length < 50) {
      quality = ANSWER_QUALITY.NEEDS_CLARIFICATION;
      needsFollowUp = true;
    }

    // Update conversation history
    const updatedHistory = [
      ...state.conversationHistory,
      {
        role: 'user',
        message: state.lastAnswer,
        timestamp: new Date().toISOString()
      }
    ];

    // Generate next response
    if (needsFollowUp) {
      return this.generateFollowUp({ ...state, conversationHistory: updatedHistory, lastAnswerQuality: quality });
    } else {
      return this.generateNextQuestion({ ...state, conversationHistory: updatedHistory, lastAnswerQuality: quality });
    }
  }

  repeatQuestion(state) {
    const responses = [
      `Let me repeat that question: ${state.lastQuestion}`,
      `Sure, I'll ask that again: ${state.lastQuestion}`,
      `Of course! Here's the question again: ${state.lastQuestion}`,
      `No problem, let me repeat: ${state.lastQuestion}`
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    return {
      ...state,
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'user',
          message: state.lastAnswer,
          timestamp: new Date().toISOString()
        },
        {
          role: 'assistant',
          message: response,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  clarifyQuestion(state) {
    const clarifications = {
      [INTERVIEW_PHASES.INTRODUCTION]: "Let me ask this more simply: Can you tell me about your work experience and what brings you here today?",
      [INTERVIEW_PHASES.TECHNICAL]: "Let me rephrase: Can you describe a project where you had to solve a difficult technical problem?",
      [INTERVIEW_PHASES.BEHAVIORAL]: "Let me clarify: I'd like to hear about a specific situation from your past work experience.",
      [INTERVIEW_PHASES.CLOSING]: "Let me be more specific: What would you like to know about this position or our company?"
    };

    const clarification = clarifications[state.currentPhase] || 
      `Let me rephrase that question: ${state.lastQuestion} - Could you share your thoughts on this?`;

    return {
      ...state,
      lastQuestion: clarification,
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'user',
          message: state.lastAnswer,
          timestamp: new Date().toISOString()
        },
        {
          role: 'assistant',
          message: clarification,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  generateFollowUp(state) {
    const followUpQuestions = {
      [INTERVIEW_PHASES.INTRODUCTION]: [
        "Could you elaborate on that a bit more?",
        "Can you give me a specific example?",
        "What aspects of that experience were most valuable to you?",
        "How did that shape your career goals?"
      ],
      [INTERVIEW_PHASES.TECHNICAL]: [
        "What technologies did you use in that project?",
        "What challenges did you face and how did you overcome them?",
        "What was your specific role in the project?",
        "How did you measure the success of that solution?"
      ],
      [INTERVIEW_PHASES.BEHAVIORAL]: [
        "How did you handle that situation?",
        "What was the outcome?",
        "What would you do differently next time?",
        "How did others respond to your approach?"
      ]
    };

    const phaseQuestions = followUpQuestions[state.currentPhase] || followUpQuestions[INTERVIEW_PHASES.INTRODUCTION];
    const followUp = phaseQuestions[Math.floor(Math.random() * phaseQuestions.length)];

    return {
      ...state,
      lastQuestion: followUp,
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'assistant',
          message: followUp,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  generateNextQuestion(state) {
    // Check if we should move to next phase or conclude
    if (state.questionCount >= state.maxQuestions) {
      return this.concludeInterview(state);
    }

    let nextPhase = state.currentPhase;
    let nextQuestion = '';

    // Phase transition logic
    if (state.currentPhase === INTERVIEW_PHASES.INTRODUCTION && state.questionCount >= 4) {
      nextPhase = INTERVIEW_PHASES.TECHNICAL;
      nextQuestion = "Now let's discuss your technical background. Can you tell me about a challenging project you worked on recently?";
    } else if (state.currentPhase === INTERVIEW_PHASES.TECHNICAL && state.questionCount >= 8) {
      nextPhase = INTERVIEW_PHASES.BEHAVIORAL;
      nextQuestion = "Let's talk about some behavioral scenarios. Tell me about a time when you had to work with a difficult team member.";
    } else if (state.currentPhase === INTERVIEW_PHASES.BEHAVIORAL && state.questionCount >= 12) {
      nextPhase = INTERVIEW_PHASES.CLOSING;
      nextQuestion = "We're nearing the end of our interview. Do you have any questions about the role or our company?";
    }

    // Generate phase-appropriate question if no transition
    if (!nextQuestion) {
      const questionSets = {
        [INTERVIEW_PHASES.INTRODUCTION]: [
          "What are your career goals for the next few years?",
          "What do you know about our company and why do you want to work here?",
          "What are your greatest professional achievements?",
          "How do you stay updated with industry trends?"
        ],
        [INTERVIEW_PHASES.TECHNICAL]: [
          "How do you approach debugging complex issues?",
          "Describe your experience with version control and collaboration tools.",
          "What's your process for learning new technologies?",
          "Tell me about a time you had to optimize performance in an application."
        ],
        [INTERVIEW_PHASES.BEHAVIORAL]: [
          "Describe a time when you had to meet a tight deadline.",
          "Tell me about a time you received constructive criticism.",
          "How do you handle conflicts in a team environment?",
          "Describe a situation where you had to adapt to significant changes."
        ],
        [INTERVIEW_PHASES.CLOSING]: [
          "What questions do you have about the team you'd be working with?",
          "What are your salary expectations for this role?",
          "When would you be available to start if offered the position?",
          "Is there anything else you'd like me to know about you?"
        ]
      };

      const availableQuestions = questionSets[state.currentPhase].filter(q => 
        !state.askedQuestions.includes(q)
      );

      if (availableQuestions.length > 0) {
        nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      } else {
        // Fallback to closing if no more questions
        nextPhase = INTERVIEW_PHASES.CLOSING;
        nextQuestion = "Thank you for your responses. Do you have any final questions for me?";
      }
    }

    return {
      ...state,
      currentPhase: nextPhase,
      lastQuestion: nextQuestion,
      questionCount: state.questionCount + 1,
      askedQuestions: [...state.askedQuestions, nextQuestion],
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'assistant',
          message: nextQuestion,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  concludeInterview(state) {
    const closingMessages = [
      "Thank you so much for your time today. It was great getting to know you and learning about your experience. We'll be in touch soon with next steps.",
      "I really enjoyed our conversation today. You've shared some great insights about your background and experience. We'll follow up with you shortly.",
      "Thank you for taking the time to speak with me today. I appreciate you sharing your experiences and answering all my questions. We'll be in contact soon.",
      "This has been a wonderful interview. Thank you for your thoughtful responses and for sharing your story with me. We'll reach out with updates soon."
    ];

    const closingMessage = closingMessages[Math.floor(Math.random() * closingMessages.length)];

    return {
      ...state,
      interviewComplete: true,
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'assistant',
          message: closingMessage,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }
}

// Interview Session Manager (Simplified)
class InterviewSession {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.engine = new SimpleInterviewEngine();
    
    // Initialize state with proper structure
    this.state = {
      sessionId: sessionId,
      currentPhase: 'greeting',
      questionCount: 0,
      maxQuestions: 15,
      lastQuestion: '',
      lastAnswer: '',
      lastAnswerQuality: 'good',
      conversationHistory: [],
      candidateProfile: {
        name: '',
        position: '',
        experience: '',
        skills: [],
        nervousness_level: 'normal'
      },
      askedQuestions: [],
      evaluationScores: {
        technical: 0,
        behavioral: 0,
        communication: 0,
        overall: 0
      },
      needsFollowUp: false,
      userRequestedRepeat: false,
      userRequestedClarification: false,
      interviewComplete: false
    };
  }

  async startInterview() {
    try {
      const result = await this.engine.processInterview(this.state, 'start');
      this.state = { ...this.state, ...result };
      
      return {
        success: true,
        message: this.getLastMessage(),
        phase: this.state.currentPhase,
        questionCount: this.state.questionCount,
        maxQuestions: this.state.maxQuestions,
        complete: this.state.interviewComplete
      };
    } catch (error) {
      console.error('Error starting interview:', error);
      return {
        success: false,
        error: 'Failed to start interview'
      };
    }
  }

  async processAnswer(answer) {
    try {
      // Update state with user's answer
      this.state.lastAnswer = answer;
      
      // Process through the engine
      const result = await this.engine.processInterview(this.state, 'answer');
      this.state = { ...this.state, ...result };
      
      return {
        success: true,
        message: this.getLastMessage(),
        phase: this.state.currentPhase,
        questionCount: this.state.questionCount,
        maxQuestions: this.state.maxQuestions,
        complete: this.state.interviewComplete,
        evaluation: this.state.lastEvaluation || null
      };
    } catch (error) {
      console.error('Error processing answer:', error);
      return {
        success: false,
        error: 'Failed to process answer'
      };
    }
  }

  getLastMessage() {
    const history = this.state.conversationHistory;
    if (history && history.length > 0) {
      const lastAssistantMessage = history
        .slice()
        .reverse()
        .find(msg => msg.role === 'assistant');
      return lastAssistantMessage?.message || this.state.lastQuestion;
    }
    return this.state.lastQuestion;
  }

  getConversationHistory() {
    return this.state.conversationHistory || [];
  }

  getCurrentState() {
    return {
      sessionId: this.state.sessionId,
      phase: this.state.currentPhase,
      questionCount: this.state.questionCount,
      maxQuestions: this.state.maxQuestions,
      complete: this.state.interviewComplete,
      lastQuestion: this.state.lastQuestion
    };
  }

  updateCandidateProfile(profile) {
    this.state.candidateProfile = { ...this.state.candidateProfile, ...profile };
  }
}

// Session storage (in production, use Redis or database)
const activeSessions = new Map();

function createSession(sessionId) {
  const session = new InterviewSession(sessionId);
  activeSessions.set(sessionId, session);
  return session;
}

function getSession(sessionId) {
  return activeSessions.get(sessionId);
}

function removeSession(sessionId) {
  activeSessions.delete(sessionId);
}

module.exports = {
  SimpleInterviewEngine,
  InterviewSession,
  createSession,
  getSession,
  removeSession,
  activeSessions
};