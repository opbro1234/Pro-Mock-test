import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserStats, 
  CurrentAffairsItem, 
  MockTest, 
  TestAttempt, 
  Question,
  CategoryCutoffs 
} from './types';
import { 
  getUserProfile, 
  getUserStats, 
  getAllCurrentAffairs, 
  getMockTests, 
  getTestAttempts, 
  getAllQuestions,
  getCABookmarks,
  getQuestionBookmarks,
  saveTestAttempt
} from './data/storage';

import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { HomeDashboard } from './components/HomeDashboard';
import { CurrentAffairsModule } from './components/CurrentAffairsModule';
import { MockTestPortal } from './components/MockTestPortal';
import { ActiveTestInterface } from './components/ActiveTestInterface';
import { ResultsAnalyticsView } from './components/ResultsAnalyticsView';
import { TopicPracticeView } from './components/TopicPracticeView';
import { BookmarksView } from './components/BookmarksView';
import { UserProfileView } from './components/UserProfileView';
import { AdminPortal } from './components/AdminPortal';
import { AuthModal } from './components/AuthModal';
import { ScorecardPrintModal } from './components/ScorecardPrintModal';

export const App: React.FC = () => {
  // Page Flow State: Dedicated Landing Page -> Login Page -> Main Examination Portal
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'portal'>('landing');

  // Navigation & View State (within portal)
  const [activeTab, setActiveTab] = useState<'home' | 'ca' | 'mock' | 'practice' | 'analytics' | 'bookmarks' | 'profile' | 'admin'>('home');
  
  // Data Entities
  const [user, setUser] = useState<UserProfile>(getUserProfile());
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairsItem[]>(getAllCurrentAffairs());
  const [mockTests, setMockTests] = useState<MockTest[]>(getMockTests());
  const [questions, setQuestions] = useState<Question[]>(getAllQuestions());
  const [attempts, setAttempts] = useState<TestAttempt[]>(getTestAttempts());
  const [caBookmarkIds, setCaBookmarkIds] = useState<string[]>(getCABookmarks());
  const [qBookmarkIds, setQBookmarkIds] = useState<string[]>(getQuestionBookmarks());

  // Active Test State
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [activeCandidateCategory, setActiveCandidateCategory] = useState<keyof CategoryCutoffs>('UR');

  // Completed Test Attempt (for immediate Results view)
  const [activeAttemptResult, setActiveAttemptResult] = useState<TestAttempt | null>(attempts[0] || null);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [printableScorecardAttempt, setPrintableScorecardAttempt] = useState<TestAttempt | null>(null);

  // Reload all storage state
  const reloadData = () => {
    setUser(getUserProfile());
    setStats(getUserStats());
    setCurrentAffairs(getAllCurrentAffairs());
    setMockTests(getMockTests());
    setQuestions(getAllQuestions());
    setAttempts(getTestAttempts());
    setCaBookmarkIds(getCABookmarks());
    setQBookmarkIds(getQuestionBookmarks());
  };

  // Launch Test
  const handleStartTest = (test: MockTest, category: keyof CategoryCutoffs) => {
    setActiveTest(test);
    setActiveCandidateCategory(category);
  };

  // Finish Test
  const handleFinishTest = (attempt: TestAttempt) => {
    saveTestAttempt(attempt);
    setActiveAttemptResult(attempt);
    setActiveTest(null);
    reloadData();
    setActiveTab('analytics');
  };

  // Exit Test
  const handleExitTest = () => {
    setActiveTest(null);
    setActiveTab('mock');
  };

  // Retake current test from analytics
  const handleRetakeCurrentTest = () => {
    if (!activeAttemptResult) return;
    const matchedTest = mockTests.find(t => t.id === activeAttemptResult.testId) || mockTests[0];
    if (matchedTest) {
      handleStartTest(matchedTest, activeAttemptResult.selectedCategory || 'UR');
    }
  };

  // 1. If in active testing session, render isolated full-screen test hall
  if (activeTest) {
    return (
      <ActiveTestInterface
        test={activeTest}
        user={user}
        selectedCategory={activeCandidateCategory}
        onFinishTest={handleFinishTest}
        onExitTest={handleExitTest}
      />
    );
  }

  // 2. Dedicated Landing Page
  if (currentPage === 'landing') {
    return (
      <LandingPage
        mockTests={mockTests}
        onNavigateToLogin={() => setCurrentPage('login')}
        onQuickExplore={() => setCurrentPage('portal')}
      />
    );
  }

  // 3. Dedicated Login Page
  if (currentPage === 'login') {
    return (
      <LoginPage
        currentUser={user}
        onLoginSuccess={(updated) => {
          setUser(updated);
          reloadData();
          setCurrentPage('portal');
        }}
        onBackToLanding={() => setCurrentPage('landing')}
        onGuestAccess={() => setCurrentPage('portal')}
      />
    );
  }

  // 4. Main Examination & Assessment Portal
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-amber-200 selection:text-amber-950 dark:selection:bg-amber-500/30 dark:selection:text-amber-200 transition-colors duration-200">
      
      {/* Sticky Main Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        caBookmarksCount={caBookmarkIds.length + qBookmarkIds.length}
        onNavigateToLanding={() => setCurrentPage('landing')}
        onLogout={() => setCurrentPage('login')}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16">
        
        {activeTab === 'home' && (
          <HomeDashboard
            user={user}
            stats={stats}
            currentAffairs={currentAffairs}
            mockTests={mockTests}
            attempts={attempts}
            onNavigateTab={setActiveTab}
            onSelectTest={(test) => handleStartTest(test, 'UR')}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'ca' && (
          <CurrentAffairsModule
            currentAffairs={currentAffairs}
            bookmarks={caBookmarkIds}
            onBookmarkChange={reloadData}
          />
        )}

        {activeTab === 'mock' && (
          <MockTestPortal
            mockTests={mockTests}
            onStartTest={handleStartTest}
          />
        )}

        {activeTab === 'practice' && (
          <TopicPracticeView
            questions={questions}
          />
        )}

        {activeTab === 'analytics' && (
          activeAttemptResult ? (
            <ResultsAnalyticsView
              attempt={activeAttemptResult}
              testQuestions={
                mockTests.find(t => t.id === activeAttemptResult.testId)?.questions ||
                questions.slice(0, activeAttemptResult.totalQuestions)
              }
              user={user}
              onRetakeTest={handleRetakeCurrentTest}
              onBackToPortal={() => setActiveTab('mock')}
              onOpenScorecardPrint={() => setPrintableScorecardAttempt(activeAttemptResult)}
            />
          ) : (
            <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">No Mock Tests Completed Yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Complete your first timed mock test to generate comprehensive performance diagnostics and category cutoff analytics.
                </p>
                <button
                  onClick={() => setActiveTab('mock')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Go to Mock Test Portal
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksView
            currentAffairs={currentAffairs}
            questions={questions}
            caBookmarkIds={caBookmarkIds}
            questionBookmarkIds={qBookmarkIds}
            onBookmarksUpdated={reloadData}
            onOpenArticle={(item) => {
              setActiveTab('ca');
            }}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileView
            user={user}
            stats={stats}
            attempts={attempts}
            onProfileUpdated={(updated) => {
              setUser(updated);
              reloadData();
            }}
            onViewAttemptScorecard={(att) => {
              setActiveAttemptResult(att);
              setActiveTab('analytics');
            }}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            questions={questions}
            currentAffairs={currentAffairs}
            mockTests={mockTests}
            onDataChanged={reloadData}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2 transition-colors duration-200">
        <p className="font-bold text-slate-700 dark:text-slate-300">
          Competitive Exam and Current Affairs Mock Test Portal • Academic Year 2026-27
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          Nirmala Memorial Foundation College of Commerce and Science (Autonomous) • Department of Information Technology
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-500">
          Developed by Shivraj Gond (Roll #29) & Chris Anthony (Roll #09) • Guided by Prof. Shraddha Parab
        </p>
      </footer>


      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <AuthModal
          currentUser={user}
          onClose={() => setIsAuthModalOpen(false)}
          onProfileUpdated={(updated) => {
            setUser(updated);
            reloadData();
          }}
        />
      )}

      {/* Printable Scorecard Modal */}
      {printableScorecardAttempt && (
        <ScorecardPrintModal
          attempt={printableScorecardAttempt}
          user={user}
          onClose={() => setPrintableScorecardAttempt(null)}
        />
      )}

    </div>
  );
};
export default App;
