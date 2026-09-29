import React, { useState } from 'react';
import { TestAttempt, Question, UserProfile, MockTest, CategoryCutoffs, CategoryName } from '../types';
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
  ChevronDown, 
  ChevronUp, 
  Filter, 
  ArrowLeft,
  TrendingUp,
  FileText,
  Plus,
  Sparkles,
  Zap,
  X,
  Gauge,
  HelpCircle,
  BarChart3
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
import confetti from 'canvas-confetti';
import { toggleQuestionBookmark, getQuestionBookmarks } from '../data/storage';

interface ResultsAnalyticsViewProps {
  attempt: TestAttempt;
  testQuestions: Question[];
  user: UserProfile;
  allAttempts?: TestAttempt[];
  allMockTests?: MockTest[];
  allQuestions?: Question[];
  onSelectAttempt?: (attempt: TestAttempt) => void;
  onAddResult?: (newAttempt: TestAttempt) => void;
  onRetakeTest: () => void;
  onBackToPortal: () => void;
  onOpenScorecardPrint: () => void;
}

export const ResultsAnalyticsView: React.FC<ResultsAnalyticsViewProps> = ({
  attempt,
  testQuestions,
  user,
  allAttempts = [],
  allMockTests = [],
  allQuestions = [],
  onSelectAttempt,
  onAddResult,
  onRetakeTest,
  onBackToPortal,
  onOpenScorecardPrint
}) => {
  const [questionFilter, setQuestionFilter] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(getQuestionBookmarks());
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form state for adding custom test result
  const [selectedMockTestId, setSelectedMockTestId] = useState<string>(
    allMockTests[0]?.id || 'mock-upsc-prelims-2026'
  );
  const [customTestTitle, setCustomTestTitle] = useState<string>('');
  const [inputScore, setInputScore] = useState<number>(16.0);
  const [inputMaxMarks, setInputMaxMarks] = useState<number>(20.0);
  const [inputTotalQuestions, setInputTotalQuestions] = useState<number>(10);
  const [inputCorrect, setInputCorrect] = useState<number>(8);
  const [inputWrong, setInputWrong] = useState<number>(1);
  const [inputCategory, setInputCategory] = useState<CategoryName>('UR');
  const [inputDurationMinutes, setInputDurationMinutes] = useState<number>(15);

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

  // Calculate speed diagnostics
  const avgSecondsPerQ = attempt.attemptedQuestions > 0 
    ? Math.round(attempt.totalTimeSeconds / attempt.attemptedQuestions) 
    : 60;
  
  // Estimated percentile based on score ratio
  const scoreRatio = attempt.maxMarks > 0 ? (attempt.scoreMarks / attempt.maxMarks) : 0.7;
  const estimatedPercentile = Math.min(99.9, Math.max(50.0, Number((70 + (scoreRatio * 29)).toFixed(1))));

  // Handle Quick Simulation Preset
  const handleApplyPreset = (preset: {
    testTitle: string;
    category: string;
    score: number;
    max: number;
    totalQ: number;
    correct: number;
    wrong: number;
    timeMins: number;
    targetCat: CategoryName;
  }) => {
    const matchingTest = allMockTests.find(t => t.title === preset.testTitle) || allMockTests[0];
    if (matchingTest) {
      setSelectedMockTestId(matchingTest.id);
    }
    setCustomTestTitle(preset.testTitle);
    setInputScore(preset.score);
    setInputMaxMarks(preset.max);
    setInputTotalQuestions(preset.totalQ);
    setInputCorrect(preset.correct);
    setInputWrong(preset.wrong);
    setInputDurationMinutes(preset.timeMins);
    setInputCategory(preset.targetCat);
  };

  // Submit new test attempt to data analysis
  const handleSubmitNewResult = (e: React.FormEvent) => {
    e.preventDefault();

    const matchedTest = allMockTests.find(t => t.id === selectedMockTestId);
    const chosenTitle = customTestTitle.trim() || matchedTest?.title || 'Competitive Mock Test Assessment';
    const chosenCategory = matchedTest?.examCategory || 'UPSC Civil Services';

    const defaultCutoffs: CategoryCutoffs = matchedTest?.categoryCutoffs || {
      UR: Math.round(inputMaxMarks * 0.6),
      OBC: Math.round(inputMaxMarks * 0.55),
      EWS: Math.round(inputMaxMarks * 0.52),
      SC: Math.round(inputMaxMarks * 0.45),
      ST: Math.round(inputMaxMarks * 0.40)
    };

    const targetCutoff = defaultCutoffs[inputCategory] || (inputMaxMarks * 0.5);
    const passedOverall = inputScore >= (matchedTest?.overallCutoffMarks || (inputMaxMarks * 0.55));
    const passedCat = inputScore >= targetCutoff;

    const attemptedQCount = Math.min(inputTotalQuestions, inputCorrect + inputWrong);
    const accuracy = attemptedQCount > 0 ? Math.round((inputCorrect / attemptedQCount) * 100) : 0;

    // Build mock answers
    const testQs = matchedTest?.questions || allQuestions.slice(0, inputTotalQuestions);
    const answersMap: Record<string, string> = {};
    const reviewStatusMap: Record<string, string> = {};

    testQs.forEach((q, idx) => {
      if (idx < inputCorrect) {
        answersMap[q.id] = q.correctOptionId;
        reviewStatusMap[q.id] = 'answered';
      } else if (idx < inputCorrect + inputWrong) {
        // pick wrong answer
        const wrongOpt = q.options.find(o => o.id !== q.correctOptionId)?.id || 'a';
        answersMap[q.id] = wrongOpt;
        reviewStatusMap[q.id] = 'answered';
      } else {
        reviewStatusMap[q.id] = 'unanswered';
      }
    });

    const newAttempt: TestAttempt = {
      id: `attempt-manual-${Date.now()}`,
      testId: matchedTest?.id || `test-${Date.now()}`,
      testTitle: chosenTitle,
      examCategory: chosenCategory,
      testType: 'MockTest',
      studentName: user.name,
      rollNo: user.rollNo,
      timestamp: Date.now(),
      dateFormatted: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      scoreMarks: inputScore,
      maxMarks: inputMaxMarks,
      totalQuestions: inputTotalQuestions,
      attemptedQuestions: attemptedQCount,
      correctAnswers: inputCorrect,
      wrongAnswers: inputWrong,
      accuracyPercentage: accuracy,
      totalTimeSeconds: inputDurationMinutes * 60,
      selectedCategory: inputCategory,
      overallCutoffMarks: matchedTest?.overallCutoffMarks || defaultCutoffs.UR,
      categoryCutoffsUsed: defaultCutoffs,
      passedOverallCutoff: passedOverall,
      passedCategoryCutoff: passedCat,
      sectionResults: matchedTest?.sections?.map(s => ({
        section: s.section,
        totalQuestions: s.questionIds.length || 3,
        attempted: Math.min(s.questionIds.length, Math.ceil(attemptedQCount / (matchedTest.sections.length || 1))),
        correct: Math.min(s.questionIds.length, Math.ceil(inputCorrect / (matchedTest.sections.length || 1))),
        wrong: Math.max(0, Math.floor(inputWrong / (matchedTest.sections.length || 1))),
        scoreMarks: Number((inputScore / (matchedTest.sections.length || 1)).toFixed(2)),
        cutoffMarks: s.cutoffMarks || 3.0,
        passedSectionCutoff: true,
        accuracyPercentage: accuracy
      })) || [
        {
          section: 'General Studies',
          totalQuestions: inputTotalQuestions,
          attempted: attemptedQCount,
          correct: inputCorrect,
          wrong: inputWrong,
          scoreMarks: inputScore,
          cutoffMarks: defaultCutoffs.UR,
          passedSectionCutoff: passedCat,
          accuracyPercentage: accuracy
        }
      ],
      userAnswers: answersMap,
      questionReviewStatus: reviewStatusMap
    };

    if (onAddResult) {
      onAddResult(newAttempt);
    }

    if (passedCat || passedOverall) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }

    setIsAddModalOpen(false);
  };

  return (
    <div id="results-analytics-view" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Top Action Bar with Attempt History & Add Result Button */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToPortal}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Mock Portal</span>
            </button>
            <div className="hidden sm:block h-5 w-px bg-slate-200 dark:border-slate-700" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Data Analysis & Performance Diagnostics</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Primary '+ Add Result' Action Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="Add a new test result to data analysis"
            >
              <Plus className="w-4 h-4" />
              <span>Add Test Result</span>
            </button>

            <button
              onClick={onRetakeTest}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden sm:inline">Retake</span>
            </button>

            <button
              onClick={onOpenScorecardPrint}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="hidden sm:inline">Scorecard PDF</span>
            </button>
          </div>
        </div>

        {/* Results History Selector Strip (Allows switching between different completed/added attempts) */}
        {allAttempts.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Select Exam Result to Analyze ({allAttempts.length} Recorded):
              </span>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                Active: {attempt.testTitle.split('(')[0].trim()}
              </span>
            </div>

            <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-thin">
              {allAttempts.map((att) => {
                const isSelected = att.id === attempt.id;
                const passed = att.passedOverallCutoff || att.passedCategoryCutoff;

                return (
                  <button
                    key={att.id}
                    onClick={() => onSelectAttempt && onSelectAttempt(att)}
                    className={`px-3 py-2 rounded-2xl border text-left shrink-0 transition-all cursor-pointer flex items-center space-x-2.5 ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/50 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[170px] truncate">
                          {att.testTitle}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                          {att.scoreMarks.toFixed(1)}/{att.maxMarks}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {att.dateFormatted.split(',')[0]} • {att.accuracyPercentage}% Acc
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
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

      {/* Advanced Performance & Pacing Diagnostic Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Speed & Pacing */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Average Speed Per Question
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
              {avgSecondsPerQ < 60 ? 'Optimal Pace' : 'Moderate'}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">{avgSecondsPerQ}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">seconds / question</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Exam target is under 75 seconds per question for maximum sectional completion.
          </p>
        </div>

        {/* All India Estimated Percentile */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Projected Percentile Rank
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-[10px] font-bold">
              All India
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-cyan-700 dark:text-cyan-400">
              {estimatedPercentile}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">percentile</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Rank projection based on standard competitive cutoff bell-curve distributions.
          </p>
        </div>

        {/* Category Cutoff Cushion */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Cutoff Margin Cushion
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              attempt.scoreMarks >= appliedCutoff 
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
            }`}>
              {attempt.scoreMarks >= appliedCutoff ? 'Safe Margin' : 'Deficit'}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {(attempt.scoreMarks - appliedCutoff) > 0 ? `+${(attempt.scoreMarks - appliedCutoff).toFixed(2)}` : (attempt.scoreMarks - appliedCutoff).toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">marks relative to {attempt.selectedCategory}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Qualifying threshold was set at {appliedCutoff} marks for {attempt.selectedCategory} candidates.
          </p>
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
                <ReferenceLine y={attempt.scoreMarks} stroke="#d97706" strokeDasharray="3 3" label={{ value: `Score: ${attempt.scoreMarks.toFixed(1)}`, fill: '#d97706', fontSize: 11 }} />
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
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Question-by-Question Solution Key & Explanations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Examine official correct options, your chosen response, and in-depth academic explanations
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setQuestionFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                questionFilter === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All ({testQuestions.length})
            </button>
            <button
              onClick={() => setQuestionFilter('correct')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                questionFilter === 'correct' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-900'
              }`}
            >
              Correct ({attempt.correctAnswers})
            </button>
            <button
              onClick={() => setQuestionFilter('wrong')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                questionFilter === 'wrong' ? 'bg-rose-500 text-white shadow-xs' : 'text-rose-700 dark:text-rose-400 hover:text-rose-900'
              }`}
            >
              Wrong ({attempt.wrongAnswers})
            </button>
            <button
              onClick={() => setQuestionFilter('unattempted')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                questionFilter === 'unattempted' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Left ({testQuestions.length - attempt.attemptedQuestions})
            </button>
          </div>
        </div>

        {/* Questions Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userChoice = attempt.userAnswers[q.id];
            const isCorrect = userChoice === q.correctOptionId;
            const isUnattempted = !userChoice;
            const isBookmarked = bookmarkedQuestionIds.includes(q.id);

            return (
              <div 
                key={q.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4 transition-colors"
              >
                {/* Question Item Top Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-mono font-bold text-xs">
                      Q.{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {q.section} • {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Status Badge */}
                    {isCorrect ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Correct (+{attempt.maxMarks / attempt.totalQuestions})
                      </span>
                    ) : isUnattempted ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        Unattempted (0.00)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Incorrect (-0.66)
                      </span>
                    )}

                    {/* Bookmark Question */}
                    <button
                      onClick={() => handleToggleQuestionBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked 
                          ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300' 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Save to Revision Deck'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                  {q.text}
                </p>

                {/* 4 Options Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map(opt => {
                    const isOptionCorrect = opt.id === q.correctOptionId;
                    const isOptionUserChoice = opt.id === userChoice;

                    let optStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                    if (isOptionCorrect) {
                      optStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isOptionUserChoice && !isOptionCorrect) {
                      optStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 line-through';
                    }

                    return (
                      <div key={opt.id} className={`p-3 rounded-xl border flex items-center justify-between ${optStyle}`}>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono uppercase font-bold text-[11px] opacity-70">({opt.id})</span>
                          <span>{opt.text}</span>
                        </div>
                        {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />}
                        {isOptionUserChoice && !isOptionCorrect && <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />}
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

      {/* Modal: Add Result in Data Analysis Section */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col transition-colors duration-200">
            
            {/* Modal Top */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  <Plus className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                    Add Result in Data Analysis Section
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Record a new mock test result to generate automated cutoffs and sectional analytics
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* 1-Click Simulation Presets */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Quick Simulation Presets (1-Click Fill):</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset({
                      testTitle: 'UPSC Civil Services Prelims Mock Exam 2026 (GS Paper-1)',
                      category: 'UPSC Civil Services',
                      score: 16.68,
                      max: 20.0,
                      totalQ: 10,
                      correct: 9,
                      wrong: 1,
                      timeMins: 16,
                      targetCat: 'UR'
                    })}
                    className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100/60 dark:hover:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-left transition-all cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">UPSC Prelims Paper #1</span>
                    <span className="text-[11px] text-amber-800 dark:text-amber-400">Score: 16.68 / 20.0 • 90% Acc (Qualified)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset({
                      testTitle: 'SSC CGL Tier-1 All India Grand Mock Test 2026',
                      category: 'SSC (CGL/CHSL/MTS)',
                      score: 17.5,
                      max: 20.0,
                      totalQ: 10,
                      correct: 9,
                      wrong: 1,
                      timeMins: 12,
                      targetCat: 'UR'
                    })}
                    className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 hover:bg-cyan-100/60 dark:hover:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 text-left transition-all cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">SSC CGL Tier-1 Grand Mock</span>
                    <span className="text-[11px] text-cyan-800 dark:text-cyan-400">Score: 17.5 / 20.0 • 95% Acc (Top 2%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset({
                      testTitle: 'IBPS PO Prelims Speed Drill Mock 2026',
                      category: 'Banking (IBPS/SBI/RBI)',
                      score: 13.5,
                      max: 15.0,
                      totalQ: 15,
                      correct: 14,
                      wrong: 1,
                      timeMins: 14,
                      targetCat: 'OBC'
                    })}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-left transition-all cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Banking PO Speed Drill</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">Score: 13.5 / 15.0 • 93% Acc (OBC)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset({
                      testTitle: 'Railway RRB NTPC General Science & GK Drill 2026',
                      category: 'Railways (RRB NTPC/Group D)',
                      score: 8.5,
                      max: 10.0,
                      totalQ: 10,
                      correct: 9,
                      wrong: 1,
                      timeMins: 8,
                      targetCat: 'SC'
                    })}
                    className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-left transition-all cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">Railway RRB NTPC Drill</span>
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-400">Score: 8.5 / 10.0 • 90% Acc (Passed)</span>
                  </button>
                </div>
              </div>

              {/* Custom Result Form */}
              <form onSubmit={handleSubmitNewResult} className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Examination Paper *
                  </label>
                  <select
                    value={selectedMockTestId}
                    onChange={(e) => {
                      setSelectedMockTestId(e.target.value);
                      const t = allMockTests.find(m => m.id === e.target.value);
                      if (t) {
                        setCustomTestTitle(t.title);
                        setInputMaxMarks(t.totalQuestions * t.marksPerQuestion);
                        setInputTotalQuestions(t.totalQuestions);
                        setInputScore(Number((t.totalQuestions * t.marksPerQuestion * 0.8).toFixed(2)));
                        setInputCorrect(Math.floor(t.totalQuestions * 0.85));
                        setInputWrong(Math.max(1, Math.floor(t.totalQuestions * 0.1)));
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {allMockTests.map(t => (
                      <option key={t.id} value={t.id}>{t.title} ({t.examCategory})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Score Obtained (Marks) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputScore}
                      onChange={e => setInputScore(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-amber-800 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Maximum Marks *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputMaxMarks}
                      onChange={e => setInputMaxMarks(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Duration (Minutes) *
                    </label>
                    <input
                      type="number"
                      value={inputDurationMinutes}
                      onChange={e => setInputDurationMinutes(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Correct Answers
                    </label>
                    <input
                      type="number"
                      value={inputCorrect}
                      onChange={e => setInputCorrect(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Wrong Answers
                    </label>
                    <input
                      type="number"
                      value={inputWrong}
                      onChange={e => setInputWrong(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-rose-700 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Reservation Category
                    </label>
                    <select
                      value={inputCategory}
                      onChange={e => setInputCategory(e.target.value as CategoryName)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="UR">UR (General)</option>
                      <option value="OBC">OBC</option>
                      <option value="EWS">EWS</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Result & Update Data Analysis</span>
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
