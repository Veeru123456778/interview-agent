// Interview State Schema
class InterviewState {
  constructor() {
    this.sessionId = '';
    this.currentPhase = 'greeting'; // greeting, introduction, technical, behavioral, closing
    this.questionCount = 0;
    this.maxQuestions = 15;
    this.lastQuestion = '';
    this.lastAnswer = '';
    this.lastAnswerQuality = 'good'; // good, needs_clarification, insufficient
    this.conversationHistory = [];
    this.candidateProfile = {
      name: '',
      position: '',
      experience: '',
      skills: [],
      nervousness_level: 'normal' // calm, normal, nervous
    };
    this.askedQuestions = [];
    this.evaluationScores = {
      technical: 0,
      behavioral: 0,
      communication: 0,
      overall: 0
    };
    this.needsFollowUp = false;
    this.userRequestedRepeat = false;
    this.userRequestedClarification = false;
    this.interviewComplete = false;
  }
}

// Interview Phases
const INTERVIEW_PHASES = {
  GREETING: 'greeting',
  INTRODUCTION: 'introduction', 
  TECHNICAL: 'technical',
  BEHAVIORAL: 'behavioral',
  CLOSING: 'closing'
};

// Answer Quality Levels
const ANSWER_QUALITY = {
  GOOD: 'good',
  NEEDS_CLARIFICATION: 'needs_clarification',
  INSUFFICIENT: 'insufficient'
};

// Node Names
const NODES = {
  START_INTERVIEW: 'startInterview',
  ASK_INTRODUCTION: 'askIntroduction',
  ANALYZE_ANSWER: 'analyzeAnswer',
  GENERATE_FOLLOW_UP: 'generateFollowUp',
  GENERATE_NEXT_QUESTION: 'generateNextQuestion',
  REPEAT_QUESTION: 'repeatQuestion',
  CLARIFY_QUESTION: 'clarifyQuestion',
  EVALUATE_ANSWER: 'evaluateAnswer',
  CONCLUDE_INTERVIEW: 'concludeInterview',
  HANDLE_CLOSING: 'handleClosing'
};

// Tool Names
const TOOLS = {
  REPEAT_QUESTION: 'repeatQuestion',
  CLARIFY_QUESTION: 'clarifyQuestion',
  EVALUATE_ANSWER: 'evaluateAnswer',
  GENERATE_FOLLOW_UP: 'generateFollowUp',
  GENERATE_NEXT_QUESTION: 'generateNextQuestion'
};

module.exports = {
  InterviewState,
  INTERVIEW_PHASES,
  ANSWER_QUALITY,
  NODES,
  TOOLS
};