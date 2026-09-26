import React, { useState } from 'react';
import { 
  UserProfile, 
  UserStats, 
  CurrentAffairsItem, 
  MockTest, 
  TestAttempt, 
  PracticeTopic 
} from '../types';
import { 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Target, 
  Play, 
  TrendingUp, 
  ArrowRight, 
  GraduationCap, 
  Calendar, 
  HelpCircle,
  Building2,
  FileText,
  User
} from 'lucide-react';
import { Avatar } from './Avatar';

interface HomeDashboardProps {
  user: UserProfile;
  stats: UserStats;
  currentAffairs: CurrentAffairsItem[];
  mockTests: MockTest[];
  attempts: TestAttempt[];
  onNavigateTab: (tab: 'home' | 'ca' | 'mock' | 'practice' | 'analytics' | 'bookmarks' | 'profile' | 'admin') => void;
  onSelectTest: (test: MockTest) => void;
  onOpenAuthModal: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  stats,
  currentAffairs,
  mockTests,
  attempts,
  onNavigateTab,
  onSelectTest,
  onOpenAuthModal
}) => {
  const latestCA = currentAffairs[0] || null;
  const recentAttempt = attempts[0] || null;

  return (
    <div id="home-dashboard-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Top Academic Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50/50 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 border border-amber-200/80 dark:border-amber-800/40 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 rounded-full text-xs font-extrabold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              {user.className} • Roll #{user.rollNo}
            </span>
            <span className="px-3 py-1 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 rounded-full text-xs font-bold flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" /> Target: {user.targetExam}
            </span>
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> {user.streakDays} Day Study Streak
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              Welcome back, <span className="text-amber-600 dark:text-amber-400">{user.name}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
              <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{user.institute}</span>
            </p>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed pt-1">
            Centralized portal for UPSC, SSC, Banking, and Railway competitive exam preparation. Track daily current affairs digests, practice timed mock test papers, and analyze detailed score breakdowns.
          </p>
        </div>

        {/* Profile Card / Quick Switcher */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 z-10 shrink-0">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center space-x-3">
            <Avatar
              src={user.avatar}
              name={user.name}
              role={user.role}
              size="lg"
            />
            <div className="text-left text-xs">
              <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
              <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mt-1 inline-block border border-amber-300 dark:border-amber-800">
                {user.role === 'admin' ? 'Faculty Admin' : 'Active Aspirant'}
              </span>
            </div>
          </div>

          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Switch Profile / Login</span>
          </button>
        </div>
      </div>

      {/* Metric Highlights Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Tests Attempted</span>
            <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.totalTestsTaken}</p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">{stats.testsPassed} Tests Qualified</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {stats.averageAccuracy > 0 ? `${stats.averageAccuracy}%` : '85%'}
          </p>
          <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-semibold">All India Percentile: ~94.2%</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Questions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.totalQuestionsAttempted || 48}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Across 8 Exam Topics</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Current Affairs Read</span>
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.currentAffairsReadCount}</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">August 2026 Archive</p>
        </div>
      </div>

      {/* Main Dual Grid: Today's Current Affairs Spotlight & Quick Test Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Today's Current Affairs Radar */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Today's Current Affairs Radar
            </h2>
            <button
              onClick={() => onNavigateTab('ca')}
              className="text-xs text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Digest ({currentAffairs.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {latestCA && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  {latestCA.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {latestCA.date}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-snug hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer" onClick={() => onNavigateTab('ca')}>
                {latestCA.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {latestCA.summary}
              </p>

              {/* Key Takeaways Preview */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <span className="text-[11px] font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                  Top High-Yield Point for Aspirants
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{latestCA.keyTakeaways[0] || 'Essential revision point for competitive examinations.'}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {latestCA.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium rounded border border-slate-200 dark:border-slate-700">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onNavigateTab('ca')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Analysis & Takeaways</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Quick 3-card news feed ticker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentAffairs.slice(1, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateTab('ca')}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm rounded-2xl cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-800 dark:text-amber-400">{item.category}</span>
                  <span className="text-slate-400 dark:text-slate-500">{item.date}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Right 5 Columns: Featured Mock Tests & Recent Scores */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Featured Tests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Featured Mock Tests
              </h2>
              <button
                onClick={() => onNavigateTab('mock')}
                className="text-xs text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({mockTests.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {mockTests.slice(0, 3).map((test) => (
                <div
                  key={test.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 text-[10px] font-bold border border-cyan-200 dark:border-cyan-800">
                        {test.examCategory}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {test.overallTimeLimitMinutes}m
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{test.title}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {test.totalQuestions} Qs • Marks: +{test.marksPerQuestion} / -{test.negativeMarksPerQuestion}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectTest(test)}
                    className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Test Scorecard Widget */}
          {recentAttempt ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Recent Test Performance
                </span>
                <button
                  onClick={() => onNavigateTab('analytics')}
                  className="text-[11px] text-amber-700 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  View Analysis
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{recentAttempt.testTitle}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{recentAttempt.dateFormatted}</p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black font-mono text-amber-700 dark:text-amber-400">
                    {recentAttempt.scoreMarks.toFixed(2)} / {recentAttempt.maxMarks}
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    recentAttempt.passedOverallCutoff
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                  }`}>
                    {recentAttempt.passedOverallCutoff ? 'PASSED' : 'DID NOT CLEAR'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 text-center">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto opacity-70" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">No Mock Tests Attempted Yet</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Attempt your first timed exam to generate automated scorecards and category cutoff analytics.
              </p>
              <button
                onClick={() => onNavigateTab('mock')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Explore Mock Tests
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Academic Guide & Project Credit Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              Nirmala Memorial Foundation College of Commerce and Science (Autonomous)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Department of Information Technology • B.Sc.I.T Degree Programme • Guided by Prof. Shraddha Parab
            </p>
          </div>
        </div>

        <div className="text-right text-[11px]">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Student Developers:</span> Shivraj Gond (Roll #29) & Chris Anthony (Roll #09)
        </div>
      </div>

    </div>
  );

};
