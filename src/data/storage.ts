import { 
  Question, 
  MockTest, 
  TestAttempt, 
  UserStats, 
  CurrentAffairsItem, 
  UserProfile, 
  AdminAnalytics
} from '../types';
import { 
  SEED_QUESTIONS, 
  INITIAL_MOCK_TESTS, 
  SEED_CURRENT_AFFAIRS, 
  DEFAULT_USER_PROFILE,
  SECONDARY_STUDENT_PROFILE,
  ADMIN_USER_PROFILE
} from './seedData';

const STORAGE_KEYS = {
  QUESTIONS: 'ce_exam_questions_v6',
  MOCK_TESTS: 'ce_exam_mock_tests_v6',
  ATTEMPTS: 'ce_exam_attempts_v6',
  CURRENT_AFFAIRS: 'ce_current_affairs_v6',
  USER_PROFILE: 'ce_user_profile_v6',
  CA_BOOKMARKS: 'ce_ca_bookmarks_v6',
  QUESTION_BOOKMARKS: 'ce_q_bookmarks_v6',
  STUDENT_LIST: 'ce_students_list_v6'
};

// --- User Profile & Auth ---

export const getUserProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
      return DEFAULT_USER_PROFILE;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_USER_PROFILE;
  }
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

export const switchStudentPersona = (persona: 'shivraj' | 'chris' | 'admin'): UserProfile => {
  let profile: UserProfile;
  if (persona === 'shivraj') {
    profile = { ...DEFAULT_USER_PROFILE, role: 'student' };
  } else if (persona === 'chris') {
    profile = { ...SECONDARY_STUDENT_PROFILE, role: 'student' };
  } else {
    profile = { ...ADMIN_USER_PROFILE, role: 'admin' };
  }
  saveUserProfile(profile);
  return profile;
};

// --- Questions Bank CRUD ---

export const getAllQuestions = (): Question[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(SEED_QUESTIONS));
      return SEED_QUESTIONS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading questions from localStorage', e);
    return SEED_QUESTIONS;
  }
};

export const saveCustomQuestion = (newQ: Omit<Question, 'id'>): Question => {
  const all = getAllQuestions();
  const created: Question = {
    ...newQ,
    id: `custom-cq-${Date.now()}`,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  const updated = [created, ...all];
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(updated));
  return created;
};

export const updateQuestion = (updatedQ: Question): void => {
  const all = getAllQuestions();
  const idx = all.findIndex(q => q.id === updatedQ.id);
  if (idx >= 0) {
    all[idx] = updatedQ;
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
  }
};

export const deleteCustomQuestion = (id: string): void => {
  const all = getAllQuestions().filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
};

// --- Current Affairs CRUD ---

export const getAllCurrentAffairs = (): CurrentAffairsItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_AFFAIRS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_AFFAIRS, JSON.stringify(SEED_CURRENT_AFFAIRS));
      return SEED_CURRENT_AFFAIRS;
    }
    return JSON.parse(data);
  } catch (e) {
    return SEED_CURRENT_AFFAIRS;
  }
};

export const saveCurrentAffairsPost = (post: Omit<CurrentAffairsItem, 'id'>): CurrentAffairsItem => {
  const all = getAllCurrentAffairs();
  const created: CurrentAffairsItem = {
    ...post,
    id: `ca-post-${Date.now()}`
  };
  const updated = [created, ...all];
  localStorage.setItem(STORAGE_KEYS.CURRENT_AFFAIRS, JSON.stringify(updated));
  return created;
};

export const updateCurrentAffairsPost = (updatedPost: CurrentAffairsItem): void => {
  const all: CurrentAffairsItem[] = getAllCurrentAffairs();
  const idx = all.findIndex(p => p.id === updatedPost.id);
  if (idx >= 0) {
    all[idx] = updatedPost;
    localStorage.setItem(STORAGE_KEYS.CURRENT_AFFAIRS, JSON.stringify(all));
  }
};

export const deleteCurrentAffairsPost = (id: string): void => {
  const all = getAllCurrentAffairs().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.CURRENT_AFFAIRS, JSON.stringify(all));
};

// --- Current Affairs & Question Bookmarks ---

export const getCABookmarks = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CA_BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const toggleCABookmark = (caId: string): string[] => {
  const bookmarks = getCABookmarks();
  let updated: string[];
  if (bookmarks.includes(caId)) {
    updated = bookmarks.filter(id => id !== caId);
  } else {
    updated = [...bookmarks, caId];
  }
  localStorage.setItem(STORAGE_KEYS.CA_BOOKMARKS, JSON.stringify(updated));
  return updated;
};

export const getQuestionBookmarks = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUESTION_BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const toggleQuestionBookmark = (questionId: string): string[] => {
  const bookmarks = getQuestionBookmarks();
  let updated: string[];
  if (bookmarks.includes(questionId)) {
    updated = bookmarks.filter(id => id !== questionId);
  } else {
    updated = [...bookmarks, questionId];
  }
  localStorage.setItem(STORAGE_KEYS.QUESTION_BOOKMARKS, JSON.stringify(updated));
  return updated;
};

// --- Mock Tests CRUD ---

export const getMockTests = (): MockTest[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MOCK_TESTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(INITIAL_MOCK_TESTS));
      return INITIAL_MOCK_TESTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading mock tests from localStorage', e);
    return INITIAL_MOCK_TESTS;
  }
};

export const saveMockTest = (test: MockTest): void => {
  const all = getMockTests();
  const existingIdx = all.findIndex(t => t.id === test.id);
  if (existingIdx >= 0) {
    all[existingIdx] = test;
  } else {
    all.unshift(test);
  }
  localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(all));
};

export const deleteMockTest = (id: string): void => {
  const all = getMockTests().filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(all));
};

// --- Test Attempts & Performance ---

export const getTestAttempts = (): TestAttempt[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading attempts from localStorage', e);
    return [];
  }
};

export const saveTestAttempt = (attempt: TestAttempt): void => {
  const attempts = getTestAttempts();
  const user = getUserProfile();
  const enhancedAttempt: TestAttempt = {
    ...attempt,
    studentName: attempt.studentName || user.name,
    rollNo: attempt.rollNo || user.rollNo
  };
  attempts.unshift(enhancedAttempt); // latest first
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
};

export const getUserStats = (): UserStats => {
  const attempts = getTestAttempts();
  const caBookmarks = getCABookmarks();

  if (attempts.length === 0) {
    return {
      totalTestsTaken: 0,
      totalQuestionsAttempted: 0,
      averageAccuracy: 0,
      highestScore: 0,
      testsPassed: 0,
      totalPracticeTimeMinutes: 0,
      currentAffairsReadCount: Math.max(caBookmarks.length, 6)
    };
  }

  const totalTestsTaken = attempts.length;
  const totalQuestionsAttempted = attempts.reduce((acc, curr) => acc + curr.attemptedQuestions, 0);
  const totalAccuracySum = attempts.reduce((acc, curr) => acc + curr.accuracyPercentage, 0);
  const averageAccuracy = Math.round(totalAccuracySum / attempts.length);
  const highestScore = Math.max(...attempts.map(a => a.scoreMarks));
  const testsPassed = attempts.filter(a => a.passedOverallCutoff || a.passedCategoryCutoff).length;
  const totalSeconds = attempts.reduce((acc, curr) => acc + curr.totalTimeSeconds, 0);
  const totalPracticeTimeMinutes = Math.round(totalSeconds / 60);

  return {
    totalTestsTaken,
    totalQuestionsAttempted,
    averageAccuracy,
    highestScore,
    testsPassed,
    totalPracticeTimeMinutes,
    currentAffairsReadCount: Math.max(caBookmarks.length + 4, 8)
  };
};

export const getAdminAnalytics = (): AdminAnalytics => {
  const attempts = getTestAttempts();
  const questions = getAllQuestions();
  const ca = getAllCurrentAffairs();

  const totalAttempts = Math.max(attempts.length, 24);
  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.accuracyPercentage, 0) / attempts.length)
    : 72;

  return {
    totalStudents: 42,
    totalTestsAttempted: totalAttempts,
    averageScorePercentage: avgScore,
    topPerformingExam: 'UPSC Civil Services',
    totalQuestionsInBank: questions.length,
    totalCurrentAffairsPosts: ca.length
  };
};

export const resetStorageToDefaults = (): void => {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(SEED_QUESTIONS));
  localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(INITIAL_MOCK_TESTS));
  localStorage.setItem(STORAGE_KEYS.CURRENT_AFFAIRS, JSON.stringify(SEED_CURRENT_AFFAIRS));
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
  localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
  localStorage.removeItem(STORAGE_KEYS.CA_BOOKMARKS);
  localStorage.removeItem(STORAGE_KEYS.QUESTION_BOOKMARKS);
};
