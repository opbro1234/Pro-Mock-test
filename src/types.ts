export type ExamCategory = 
  | 'UPSC Civil Services'
  | 'SSC (CGL/CHSL/MTS)'
  | 'Banking (IBPS/SBI/RBI)'
  | 'Railways (RRB NTPC/Group D)'
  | 'Class 12 Aptitude & Entrance'
  | 'Class 10 Foundation Aptitude'
  | 'General Studies & Science';

export type CurrentAffairsCategory =
  | 'National'
  | 'International'
  | 'Economy & Banking'
  | 'Science & Technology'
  | 'Environment & Ecology'
  | 'Sports'
  | 'Awards & Honours'
  | 'Government Schemes'
  | 'Appointments & Summits';

export type SectionName = 
  | 'General Studies'
  | 'Quantitative Aptitude'
  | 'Reasoning Ability'
  | 'Reasoning & Logical Intelligence'
  | 'Logical Reasoning'
  | 'General Intelligence & Reasoning'
  | 'Verbal Ability'
  | 'English Language'
  | 'English Comprehension'
  | 'General Knowledge'
  | 'General Awareness'
  | 'General / Banking Awareness'
  | 'General Science'
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Accountancy'
  | 'Economics'
  | 'History'
  | 'Science & Technology';

export type PracticeTopic =
  | 'Polity & Constitution'
  | 'Economy & Banking'
  | 'Science & Technology'
  | 'Environment & Ecology'
  | 'Geography & Environment'
  | 'History & National Movement'
  | 'Number System & Arithmetic'
  | 'Logical Reasoning & Puzzles'
  | 'Current Affairs & GK'
  | 'Physics & Measurement'
  | 'Chemistry & Chemical Reactions'
  | 'Mathematics & Calculus'
  | 'Commerce & Accountancy'
  | 'Macro & Micro Economics'
  | 'Modern Indian History';

export type CategoryName = 'UR' | 'OBC' | 'EWS' | 'SC' | 'ST';

export interface CategoryCutoffs {
  UR: number;
  OBC: number;
  EWS: number;
  SC: number;
  ST: number;
}

export type QuestionStatus = 
  | 'not_visited'
  | 'unanswered'
  | 'answered'
  | 'marked_for_review'
  | 'answered_and_marked_for_review';

export interface Option {
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
}

export interface Question {
  id: string;
  section: SectionName;
  topic: PracticeTopic | string;
  examCategory: ExamCategory;
  passage?: string; // Optional passage, data table or context
  text: string;
  options: Option[];
  correctOptionId: string; // 'a', 'b', 'c', or 'd'
  explanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  examTag?: string; // e.g. 'UPSC Prelims 2026', 'SSC CGL Tier-1', 'IBPS PO', 'RRB NTPC'
  dateAdded?: string;
}

export interface CurrentAffairsItem {
  id: string;
  title: string;
  summary: string;
  fullArticle: string;
  keyTakeaways: string[];
  category: CurrentAffairsCategory;
  date: string; // YYYY-MM-DD
  timelineDate?: string; // e.g. YYYY-MM-DD for timeline indexing
  readTimeMinutes: number;
  source: string;
  tags: string[]; // e.g. ['UPSC GS-3', 'Banking GA', 'SSC CGL']
  examTags?: string[]; // e.g. ['UPSC', 'Banking', 'Railways', 'SSC']
  practiceQuestion?: {
    questionText: string;
    options: Option[];
    correctOptionId: string;
    explanation: string;
  };
  isBookmarked?: boolean;
}

export interface MockTestSectionConfig {
  id: string;
  section: SectionName;
  questionIds: string[];
  timeLimitMinutes: number;
  cutoffMarks: number;
}

export interface MockTest {
  id: string;
  title: string;
  subtitle: string;
  examCategory: ExamCategory;
  totalQuestions: number;
  overallTimeLimitMinutes: number;
  marksPerQuestion: number;
  negativeMarksPerQuestion: number; // e.g. 0.33, 0.50, 0.66, 0.25
  overallCutoffMarks: number;
  categoryCutoffs: CategoryCutoffs;
  sections: MockTestSectionConfig[];
  questions: Question[];
  scheduledDate?: string;
  isPopular?: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId?: string;
  status: QuestionStatus;
  timeSpentSeconds: number;
}

export interface SectionResult {
  section: SectionName | string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted?: number;
  scoreMarks: number;
  maxMarks?: number;
  cutoffMarks: number;
  passedSectionCutoff: boolean;
  accuracyPercentage: number;
  timeSpentSeconds?: number;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  examCategory: ExamCategory | string;
  testType?: 'MockTest' | 'TopicPractice' | 'DailyQuiz';
  timestamp: string | number;
  dateFormatted: string;
  totalTimeSeconds: number;
  timeLimitSeconds?: number;
  timerModeUsed?: 'overall' | 'sectional';
  
  studentName?: string;
  rollNo?: string;
  selectedCategory: CategoryName | keyof CategoryCutoffs;
  categoryCutoffsUsed?: CategoryCutoffs;
  passedCategoryCutoff: boolean;

  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattemptedQuestions?: number;
  
  scoreMarks: number;
  maxMarks: number;
  overallCutoffMarks: number;
  passedOverallCutoff: boolean;
  passedAllSectionalCutoffs?: boolean;
  accuracyPercentage: number;
  
  sectionResults?: SectionResult[];
  userAnswers: Record<string, string>;
  questionReviewStatus?: Record<string, string>;
}

export interface UserProfile {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  academicYear: string;
  email: string;
  institute: string;
  targetExam: ExamCategory;
  avatar: string;
  role: 'student' | 'admin';
  streakDays: number;
  lastActiveDate: string;
}

export interface UserStats {
  totalTestsTaken: number;
  totalQuestionsAttempted: number;
  averageAccuracy: number;
  highestScore: number;
  testsPassed: number;
  totalPracticeTimeMinutes: number;
  currentAffairsReadCount: number;
}

export interface AdminAnalytics {
  totalStudents: number;
  totalTestsAttempted: number;
  averageScorePercentage: number;
  topPerformingExam: string;
  totalQuestionsInBank: number;
  totalCurrentAffairsPosts: number;
}
