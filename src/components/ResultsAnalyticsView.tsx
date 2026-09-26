import React, { useState } from 'react';
import { TestAttempt, Question, UserProfile } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Target, 
  Printer, 
  RotateCcw, 
  BookOpen, 
  Bookmark, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  ArrowLeft,
  TrendingUp,
  FileText,
  Building2,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell
} from 'recharts';
import { toggleQuestionBookmark, getQuestionBookmarks } from '../data/storage';

interface ResultsAnalyticsViewProps {
  attempt: TestAttempt;
  testQuestions: Question[];
  user: UserProfile;
  onRetakeTest: () => void;
  onBackToPortal: () => void;
  onOpenScorecardPrint: () => void;
}

export const ResultsAnalyticsView: React.FC<ResultsAnalyticsViewProps> = ({
  attempt,
  testQuestions,
  user,
  onRetakeTest,
  onBackToPortal,
  onOpenScorecardPrint
}) => {
  const [questionFilter, setQuestionFilter] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(getQuestionBookmarks());

  const isPassed = attempt.passedOverallCutoff || attempt.passedCategoryCutoff;
  const appliedCutoff = attempt.categoryCutoffsUsed?.[attempt.selectedCategory] || attempt.overallCutoffMarks;

  const handleToggleQuestionBookmark = (qId: string) => {
    const updated = toggleQuestionBookmark(qId);
    setBookmarkedQuestionIds(updated);
  };

  const toggleSolution = (qId: string) => {
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Recharts Cutoff Data
  const cutoffData = [
    { category: 'UR', cutoff: attempt.categoryCutoffsUsed?.UR || 12, candidateScore: attempt.scoreMarks },
    { category: 'OBC', cutoff: attempt.categoryCutoffsUsed?.OBC || 11, candidateScore: attempt.scoreMarks },
    { category: 'EWS', cutoff: attempt.categoryCutoffsUsed?.EWS || 10.5, candidateScore: attempt.scoreMarks },
    { category: 'SC', cutoff: attempt.categoryCutoffsUsed?.SC || 9, candidateScore: attempt.scoreMarks },
    { category: 'ST', cutoff: attempt.categoryCutoffsUsed?.ST || 8, candidateScore: attempt.scoreMarks },
  ];

  // Filtered Questions
  const filteredQuestions = testQuestions.filter(q => {
    const userAns = attempt.userAnswers[q.id];
    if (questionFilter === 'correct') return userAns === q.correctOptionId;
    if (questionFilter === 'wrong') return userAns && userAns !== q.correctOptionId;
    if (questionFilter === 'unattempted') return !userAns;
    return true;
  });

  return (
    <div id="results-analytics-view" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToPortal}
          className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mock Test Portal</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRetakeTest}
            className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Retake This Test</span>
          </button>

          <button
            onClick={onOpenScorecardPrint}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Official Scorecard & PDF</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${
        isPassed
          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
          : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
      }`}>
        <div className="flex items-center space-x-5 z-10">
          <div className={`p-4 rounded-3xl shrink-0 ${isPassed ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'}`}>
            {isPassed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {attempt.examCategory}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{attempt.dateFormatted}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              {isPassed ? 'QUALIFIED — CONGRATULATIONS!' : 'NEEDS REVISION — DID NOT CLEAR CUTOFF'}
            </h1>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Evaluated for <strong className="text-amber-800 dark:text-amber-400">{attempt.selectedCategory} Category</strong> (Cutoff: {appliedCutoff} Marks) • Your Marks: <strong className="text-slate-900 dark:text-white">{attempt.scoreMarks.toFixed(2)} / {attempt.maxMarks}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-center z-10 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-8">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">Final Marks</span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-amber-800 dark:text-amber-400 mt-0.5">
              {attempt.scoreMarks.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Out of {attempt.maxMarks}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">Accuracy</span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-800 dark:text-cyan-400 mt-0.5">
              {attempt.accuracyPercentage}%
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Correct Ratio</span>
          </div>
        </div>
      </div>

      {/* 4 Diagnostic Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Questions Solved</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {attempt.attemptedQuestions} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ {attempt.totalQuestions}</span>
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {attempt.totalQuestions - attempt.attemptedQuestions} Unattempted
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Correct Responses</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            +{attempt.correctAnswers}
          </p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Positive Marks Earned</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">Wrong Penalized</span>
          <p className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
            -{attempt.wrongAnswers}
          </p>
          <span className="text-[10px] text-rose-700 dark:text-rose-400 font-semibold">Negative Penalties Deducted</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Time Utilized</span>
          <p className="text-2xl sm:text-3xl font-black text-cyan-700 dark:text-cyan-400 font-mono">
            {Math.floor(attempt.totalTimeSeconds / 60)}m {attempt.totalTimeSeconds % 60}s
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Session Duration</span>
        </div>
      </div>

      {/* Category Cutoff Comparison Chart & Section Diagnostic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 Cols: Cutoff Benchmark Visualizer */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Category Cutoff Threshold Analysis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your score compared against reservation category qualifying benchmarks</p>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cutoffData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f8fafc' }}
                />
                <ReferenceLine y={attempt.scoreMarks} stroke="#d97706" strokeDasharray="3 3" label={{ value: `Your Score: ${attempt.scoreMarks.toFixed(1)}`, fill: '#d97706', fontSize: 11 }} />
                <Bar dataKey="cutoff" name="Category Cutoff" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                  {cutoffData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.category === attempt.selectedCategory ? '#f59e0b' : '#64748b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span className="font-semibold">Selected Category: <strong className="text-amber-800 dark:text-amber-400">{attempt.selectedCategory}</strong></span>
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
              isPassed ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
            }`}>
              {isPassed ? 'Cleared Category Cutoff' : 'Below Target Cutoff'}
            </span>
          </div>
        </div>

        {/* Right 6 Cols: Section-wise Performance Table */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Sectional Diagnostic Report
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Section-wise marks and qualifying status</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">Section</th>
                  <th className="px-3 py-2.5 text-center">Attempted</th>
                  <th className="px-3 py-2.5 text-center">Correct</th>
                  <th className="px-3 py-2.5 text-center">Score</th>
                  <th className="px-3 py-2.5 text-center">Cutoff</th>
                  <th className="px-3 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {attempt.sectionResults?.map((sec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-3 py-3 font-bold text-slate-800 dark:text-slate-200">{sec.section}</td>
                    <td className="px-3 py-3 text-center font-mono text-slate-600 dark:text-slate-400">{sec.attempted} / {sec.totalQuestions}</td>
                    <td className="px-3 py-3 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold">+{sec.correct}</td>
                    <td className="px-3 py-3 text-center font-mono font-bold text-amber-800 dark:text-amber-400">{sec.scoreMarks.toFixed(2)}</td>
                    <td className="px-3 py-3 text-center font-mono text-slate-500 dark:text-slate-400">{sec.cutoffMarks}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sec.passedSectionCutoff
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      }`}>
                        {sec.passedSectionCutoff ? 'PASSED' : 'BELOW'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Detailed Question Review & Answer Key Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Complete Question Solution Key & Rationale
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review correct options, detailed explanations, and save weak questions to your Revision Deck</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setQuestionFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                questionFilter === 'all' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All ({testQuestions.length})
            </button>
            <button
              onClick={() => setQuestionFilter('correct')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                questionFilter === 'correct' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Correct ({attempt.correctAnswers})
            </button>
            <button
              onClick={() => setQuestionFilter('wrong')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                questionFilter === 'wrong' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Wrong ({attempt.wrongAnswers})
            </button>
            <button
              onClick={() => setQuestionFilter('unattempted')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                questionFilter === 'unattempted' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Skipped ({testQuestions.length - attempt.attemptedQuestions})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((q, index) => {
            const userAns = attempt.userAnswers[q.id];
            const isCorrect = userAns === q.correctOptionId;
            const isUnattempted = !userAns;
            const isSaved = bookmarkedQuestionIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isUnattempted
                    ? 'bg-slate-50/70 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800'
                    : isCorrect
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                }`}
              >
                {/* Question Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                      Q.{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
                      {q.section}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{q.topic}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isUnattempted && (
                      <span className="px-2.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold">
                        Unattempted
                      </span>
                    )}
                    {!isUnattempted && isCorrect && (
                      <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Correct (+{attempt.maxMarks / testQuestions.length})
                      </span>
                    )}
                    {!isUnattempted && !isCorrect && (
                      <span className="px-2.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-[11px] font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Incorrect (-{attempt.maxMarks / testQuestions.length > 1 ? '0.66' : '0.25'})
                      </span>
                    )}

                    <button
                      onClick={() => handleToggleQuestionBookmark(q.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title="Save to Revision Deck"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Passage */}
                {q.passage && (
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    <span className="text-amber-800 dark:text-amber-400 font-bold block text-[10px]">Passage Context:</span>
                    <p>{q.passage}</p>
                  </div>
                )}

                {/* Question Text */}
                <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed mb-4">
                  {q.text}
                </p>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                  {q.options.map(opt => {
                    const isUserPick = userAns === opt.id;
                    const isCorrectAnswer = q.correctOptionId === opt.id;

                    let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300';
                    if (isCorrectAnswer) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isUserPick && !isCorrect) {
                      style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 font-semibold';
                    }

                    return (
                      <div key={opt.id} className={`p-3 rounded-xl border flex items-center justify-between ${style}`}>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono uppercase font-bold text-slate-500 dark:text-slate-400">({opt.id})</span>
                          <span>{opt.text}</span>
                        </div>
                        {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        {isUserPick && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Rationale Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                    Step-by-Step Solution & Rationale:
                  </span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
