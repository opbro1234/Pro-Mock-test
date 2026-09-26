import React, { useState, useEffect, useRef } from 'react';
import { 
  MockTest, 
  Question, 
  TestAttempt, 
  UserProfile, 
  CategoryCutoffs, 
  SectionResult 
} from '../types';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  HelpCircle, 
  Flag, 
  RotateCcw, 
  Layers, 
  GraduationCap, 
  ShieldAlert,
  User,
  X,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Hourglass,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeToggle } from '../context/ThemeContext';

interface ActiveTestInterfaceProps {
  test: MockTest;
  user: UserProfile;
  selectedCategory: keyof CategoryCutoffs;
  onFinishTest: (attempt: TestAttempt) => void;
  onExitTest: () => void;
}

// Sound helper using Web Audio API for timer notifications
const playBeep = (freq: number = 660, durationMs: number = 180, count: number = 1) => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    let delay = 0;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + durationMs / 1000);
        } catch (e) {}
      }, delay);
      delay += durationMs + 120;
    }
  } catch (e) {}
};

export const ActiveTestInterface: React.FC<ActiveTestInterfaceProps> = ({
  test,
  user,
  selectedCategory,
  onFinishTest,
  onExitTest
}) => {
  // State for user answers: { questionId: selectedOptionId }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // State for marked for review: { questionId: boolean }
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  // Visited questions: { questionId: boolean }
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({
    [test.questions[0]?.id || '']: true
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [activeSectionName, setActiveSectionName] = useState<string>(
    test.sections?.[0]?.section || 'General Studies'
  );

  // Timer in seconds
  const totalSeconds = Math.max(60, (test.overallTimeLimitMinutes || 60) * 60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [hasPlayed5MinWarning, setHasPlayed5MinWarning] = useState<boolean>(false);
  const [hasPlayed1MinWarning, setHasPlayed1MinWarning] = useState<boolean>(false);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState<boolean>(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // Time spent per question in seconds: { questionId: number }
  const [questionTimeMap, setQuestionTimeMap] = useState<Record<string, number>>({});
  const [currentQuestionSeconds, setCurrentQuestionSeconds] = useState<number>(0);

  // Section timing
  const currentSectionConfig = test.sections?.find(s => s.section === test.questions[currentQuestionIndex]?.section) || test.sections?.[0];
  const sectionTimeLimitSecs = (currentSectionConfig?.timeLimitMinutes || Math.round(test.overallTimeLimitMinutes / (test.sections?.length || 1))) * 60;

  const timerRef = useRef<any>(null);
  const answersRef = useRef(selectedAnswers);
  const markedRef = useRef(markedForReview);
  const visitedRef = useRef(visitedQuestions);
  const timeMapRef = useRef(questionTimeMap);

  // Keep refs in sync
  useEffect(() => { answersRef.current = selectedAnswers; }, [selectedAnswers]);
  useEffect(() => { markedRef.current = markedForReview; }, [markedForReview]);
  useEffect(() => { visitedRef.current = visitedQuestions; }, [visitedQuestions]);
  useEffect(() => { timeMapRef.current = questionTimeMap; }, [questionTimeMap]);

  const currentQ: Question = test.questions[currentQuestionIndex] || test.questions[0];

  // Track per-question time
  useEffect(() => {
    setCurrentQuestionSeconds(0);
  }, [currentQuestionIndex]);

  // Main countdown timer interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (isTimerPaused) return;

      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (isSoundEnabled) playBeep(880, 300, 3);
          setIsTimeUpModalOpen(true);
          setTimeout(() => {
            handleAutoSubmit();
          }, 1800);
          return 0;
        }

        // 5 minute warning
        if (prev === 300 && isSoundEnabled) {
          playBeep(520, 200, 2);
        }

        // 1 minute warning
        if (prev === 60 && isSoundEnabled) {
          playBeep(750, 250, 3);
        }

        return prev - 1;
      });

      // Update question-specific time
      setCurrentQuestionSeconds(qPrev => qPrev + 1);
      if (currentQ?.id) {
        setQuestionTimeMap(prev => ({
          ...prev,
          [currentQ.id]: (prev[currentQ.id] || 0) + 1
        }));
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerPaused, isSoundEnabled, currentQ?.id]);

  // Update visited status on question index change
  useEffect(() => {
    if (currentQ?.id) {
      setVisitedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
      if (currentQ.section) {
        setActiveSectionName(currentQ.section);
      }
    }
  }, [currentQuestionIndex, currentQ]);

  // Format timer MM:SS or HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Option selection
  const handleSelectOption = (optId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optId
    }));
  };

  // Clear current response
  const handleClearResponse = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Mark / Unmark for review
  const handleToggleReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Navigation handlers
  const handleSaveAndNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Stats calculation for confirmation modal & final scorecard
  const calculateTestResults = (): TestAttempt => {
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let score = 0;

    const timeSpent = Math.max(1, totalSeconds - secondsRemaining);
    const answers = answersRef.current;
    const reviewStatus = markedRef.current;
    const visited = visitedRef.current;

    // Per question responses
    const responses: Record<string, string> = {};
    const questionReviewStatus: Record<string, 'answered' | 'unanswered' | 'marked_review' | 'not_visited'> = {};

    test.questions.forEach(q => {
      const ans = answers[q.id];
      if (ans) {
        responses[q.id] = ans;
        if (ans === q.correctOptionId) {
          correctCount++;
          score += test.marksPerQuestion;
        } else {
          wrongCount++;
          score -= test.negativeMarksPerQuestion;
        }
      } else {
        unattemptedCount++;
      }

      if (reviewStatus[q.id]) {
        questionReviewStatus[q.id] = 'marked_review';
      } else if (ans) {
        questionReviewStatus[q.id] = 'answered';
      } else if (visited[q.id]) {
        questionReviewStatus[q.id] = 'unanswered';
      } else {
        questionReviewStatus[q.id] = 'not_visited';
      }
    });

    const attemptedTotal = correctCount + wrongCount;
    const accuracy = attemptedTotal > 0 ? Math.round((correctCount / attemptedTotal) * 100) : 0;
    const maxMarks = test.questions.length * test.marksPerQuestion;

    // Cutoff check
    const appliedCategoryCutoff = test.categoryCutoffs?.[selectedCategory] || test.overallCutoffMarks;
    const passedCategoryCutoff = score >= appliedCategoryCutoff;
    const passedOverallCutoff = score >= test.overallCutoffMarks;

    // Section results
    const sectionResults: SectionResult[] = (test.sections || []).map(sec => {
      const secQs = test.questions.filter(q => sec.questionIds.includes(q.id));
      let secCorrect = 0;
      let secWrong = 0;
      let secScore = 0;

      secQs.forEach(q => {
        const userAns = answers[q.id];
        if (userAns) {
          if (userAns === q.correctOptionId) {
            secCorrect++;
            secScore += test.marksPerQuestion;
          } else {
            secWrong++;
            secScore -= test.negativeMarksPerQuestion;
          }
        }
      });

      const secAttempted = secCorrect + secWrong;
      const secAccuracy = secAttempted > 0 ? Math.round((secCorrect / secAttempted) * 100) : 0;

      return {
        section: sec.section,
        totalQuestions: secQs.length,
        attempted: secAttempted,
        correct: secCorrect,
        wrong: secWrong,
        scoreMarks: Math.max(0, Number(secScore.toFixed(2))),
        accuracyPercentage: secAccuracy,
        cutoffMarks: sec.cutoffMarks || 5,
        passedSectionCutoff: secScore >= (sec.cutoffMarks || 5)
      };
    });

    // If no explicit sections defined in seed, make a default single section
    if (sectionResults.length === 0) {
      sectionResults.push({
        section: 'General Studies',
        totalQuestions: test.questions.length,
        attempted: attemptedTotal,
        correct: correctCount,
        wrong: wrongCount,
        scoreMarks: Math.max(0, Number(score.toFixed(2))),
        accuracyPercentage: accuracy,
        cutoffMarks: appliedCategoryCutoff,
        passedSectionCutoff: passedCategoryCutoff
      });
    }

    const finalScore = Number(score.toFixed(2));

    return {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      examCategory: test.examCategory,
      studentName: user.name,
      rollNo: user.rollNo,
      dateFormatted: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timestamp: Date.now(),
      scoreMarks: finalScore,
      maxMarks,
      totalQuestions: test.questions.length,
      attemptedQuestions: attemptedTotal,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      accuracyPercentage: accuracy,
      totalTimeSeconds: timeSpent,
      selectedCategory,
      overallCutoffMarks: test.overallCutoffMarks,
      categoryCutoffsUsed: test.categoryCutoffs || { [selectedCategory]: appliedCategoryCutoff } as any,
      passedOverallCutoff,
      passedCategoryCutoff,
      sectionResults,
      userAnswers: responses,
      questionReviewStatus
    };
  };

  const handleFinalSubmit = () => {
    clearInterval(timerRef.current);
    const result = calculateTestResults();
    if (result.passedCategoryCutoff || result.passedOverallCutoff) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
    onFinishTest(result);
  };

  const handleAutoSubmit = () => {
    clearInterval(timerRef.current);
    const result = calculateTestResults();
    onFinishTest(result);
  };

  // Percentage of total timer remaining
  const timerPercentage = Math.min(100, Math.max(0, (secondsRemaining / totalSeconds) * 100));

  // Counts
  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = test.questions.length - answeredCount;

  return (
    <div id="active-test-interface" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-slate-950 transition-colors duration-200">
      
      {/* Top Examination Control Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 sticky top-0 z-30 shadow-xs flex flex-wrap items-center justify-between gap-3 transition-colors duration-200">
        
        {/* Left: Test Info & Student Identifier */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 shrink-0">
            <GraduationCap className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white max-w-xs sm:max-w-md truncate font-serif">
                {test.title}
              </span>
              <span className="px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 rounded text-[10px] font-bold">
                {test.examCategory}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Candidate: <strong className="text-slate-800 dark:text-slate-200">{user.name}</strong> (Roll #{user.rollNo})</span>
              <span>•</span>
              <span className="text-amber-800 dark:text-amber-400 font-bold">Category: {selectedCategory}</span>
            </p>
          </div>
        </div>

        {/* Center/Right: Timer, Theme & Submit Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Theme Toggle */}
          <ThemeToggle size="sm" />
          
          {/* Audio Chime Toggle */}
          <button
            onClick={() => setIsSoundEnabled(prev => !prev)}
            title={isSoundEnabled ? 'Timer Sound Enabled (Click to Mute)' : 'Timer Sound Muted (Click to Unmute)'}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              isSoundEnabled 
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 hover:text-amber-900' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsTimerPaused(prev => !prev)}
            title={isTimerPaused ? 'Resume Examination' : 'Pause Examination Timer'}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isTimerPaused
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-xs'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {isTimerPaused ? <Play className="w-3.5 h-3.5 fill-slate-950" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isTimerPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Live Countdown Timer HUD */}
          <div 
            className={`px-3.5 py-1.5 rounded-2xl border flex items-center space-x-2 font-mono font-bold text-sm sm:text-base shadow-xs transition-all ${
              secondsRemaining < 60
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 ring-2 ring-rose-400 animate-pulse'
                : secondsRemaining < 300
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 animate-pulse'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-amber-900 dark:text-amber-400'
            }`}
          >
            <Clock className={`w-4 h-4 ${secondsRemaining < 300 ? 'text-rose-600 animate-spin' : 'text-amber-600 dark:text-amber-400'}`} />
            <span>{formatTime(secondsRemaining)}</span>
            
            {/* Visual Mini Progress Bar */}
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
              <div 
                className={`h-full transition-all duration-1000 ${
                  secondsRemaining < 60 ? 'bg-rose-500' : secondsRemaining < 300 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${timerPercentage}%` }}
              />
            </div>
          </div>

          {/* Submit Test Button */}
          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* Timer Warning Banner when under 5 mins */}
      {secondsRemaining < 300 && (
        <div className={`px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-2 border-b ${
          secondsRemaining < 60 
            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-900 animate-pulse' 
            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-900'
        }`}>
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {secondsRemaining < 60 
              ? `CRITICAL ALERT: Less than 1 minute remaining (${secondsRemaining}s)! Prepare for automatic test submission.`
              : `TIME WARNING: Only ${Math.ceil(secondsRemaining / 60)} minutes remaining! Review your unanswered questions.`}
          </span>
        </div>
      )}

      {/* Main Examination Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8-9 Columns: Question View Area */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="space-y-6">
            {/* Question Header Bar & Live Question Pacer */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-2">
              <div className="flex items-center flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black rounded-xl text-xs">
                  Question {currentQuestionIndex + 1} of {test.questions.length}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold">
                  Section: {currentQ?.section}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  {currentQ?.topic}
                </span>
              </div>

              {/* Per-Question Live Timer & Marks Scheme */}
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5" title="Time spent on current question">
                  <Hourglass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Time: {formatTime(currentQuestionSeconds)}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">+{test.marksPerQuestion}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">-{test.negativeMarksPerQuestion}</span>
                </div>
              </div>
            </div>

            {/* Reading Passage if available */}
            {currentQ?.passage && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-h-48 overflow-y-auto space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider block text-[10px]">
                  Passage / Reference Context:
                </span>
                <p>{currentQ.passage}</p>
              </div>
            )}

            {/* Question Text */}
            <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              <p className="whitespace-pre-line">{currentQ?.text}</p>
            </div>

            {/* 4 Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ?.options.map(opt => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between text-xs sm:text-sm ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-200 ring-1 ring-amber-400 font-semibold shadow-xs'
                        : 'bg-white dark:bg-slate-850/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono uppercase text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Question Controls */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleReview}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  markedForReview[currentQ?.id]
                    ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{markedForReview[currentQ?.id] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              {selectedAnswers[currentQ?.id] && (
                <button
                  onClick={handleClearResponse}
                  className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Response</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                disabled={currentQuestionIndex === test.questions.length - 1}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right 4 Columns: Question Palette & Status Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 flex flex-col justify-between">
          
          <div className="space-y-5">
            {/* Palette Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Question Palette
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {currentQuestionIndex + 1} / {test.questions.length}
              </span>
            </div>

            {/* Section Filter / Jumper */}
            {test.sections && test.sections.length > 1 && (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Paper Sections:</span>
                <div className="flex flex-wrap gap-1.5">
                  {test.sections.map(sec => {
                    const isActiveSec = sec.section === currentQ?.section;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          const firstQIndex = test.questions.findIndex(q => sec.questionIds.includes(q.id));
                          if (firstQIndex !== -1) setCurrentQuestionIndex(firstQIndex);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isActiveSec 
                            ? 'bg-cyan-600 text-white shadow-xs' 
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {sec.section}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Status Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-3.5 rounded-md bg-emerald-600 font-mono text-[9px] text-white flex items-center justify-center font-bold">
                  {answeredCount}
                </div>
                <span className="text-slate-700 dark:text-slate-300">Answered</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-3.5 rounded-md bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 font-mono text-[9px] text-rose-800 dark:text-rose-300 flex items-center justify-center font-bold">
                  {unansweredCount}
                </div>
                <span className="text-slate-700 dark:text-slate-300">Not Answered</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-3.5 rounded-md bg-purple-600 font-mono text-[9px] text-white flex items-center justify-center font-bold">
                  {reviewCount}
                </div>
                <span className="text-slate-700 dark:text-slate-300">Marked for Review</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-3.5 rounded-md bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono text-[9px] text-slate-600 dark:text-slate-300 flex items-center justify-center">
                  -
                </div>
                <span className="text-slate-500 dark:text-slate-400">Not Visited</span>
              </div>
            </div>

            {/* Question Matrix Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Select Question to Jump:
              </span>
              
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-1 scrollbar-thin">
                {test.questions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = !!selectedAnswers[q.id];
                  const isMarked = !!markedForReview[q.id];
                  const isVisited = !!visitedQuestions[q.id];

                  let btnStyle = 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600';
                  if (isMarked) {
                    btnStyle = 'bg-purple-600 text-white font-bold border-purple-500';
                  } else if (isAnswered) {
                    btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
                  } else if (isVisited) {
                    btnStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-bold';
                  }

                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-amber-500 scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-xl border flex items-center justify-center text-xs font-mono transition-all cursor-pointer ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Emergency Exit / Early Leave */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to exit the examination? Unsaved responses will be submitted.')) {
                  handleFinalSubmit();
                }
              }}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold cursor-pointer"
            >
              Exit Early
            </button>

            <button
              onClick={() => setShowSubmitConfirmModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Final Submit
            </button>
          </div>

        </div>

      </div>

      {/* Paused Screen Overlay (Preserves examination security) */}
      {isTimerPaused && (
        <div className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md shadow-xl flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Pause className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-serif">Examination Timer Paused</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The examination countdown has been paused. Test questions are obscured to ensure exam integrity. Click resume to continue your timed session.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-mono text-amber-900 dark:text-amber-300 font-bold text-lg w-full">
              Time Remaining: {formatTime(secondsRemaining)}
            </div>
            <button
              onClick={() => setIsTimerPaused(false)}
              className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Resume Examination</span>
            </button>
          </div>
        </div>
      )}

      {/* Time Up Auto-Submit Notification Modal */}
      {isTimeUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-3xl w-full max-w-md shadow-xl p-6 sm:p-8 space-y-5 text-center text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto">
              <Clock className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Examination Time Has Expired!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The timer for this paper has reached 00:00. Your saved responses are being compiled and evaluated automatically.
              </p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="h-full bg-amber-500 animate-pulse w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
            
            <div className="flex items-center space-x-3 text-amber-700 dark:text-amber-400">
              <ShieldAlert className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Final Examination Submission</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Review your responses before finalizing scorecard</p>
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 dark:text-slate-400">Total Questions:</span>
                <p className="text-base font-bold font-mono text-slate-900 dark:text-white">{test.questions.length}</p>
              </div>
              <div className="space-y-1">
                <span className="text-emerald-700 dark:text-emerald-400">Answered Questions:</span>
                <p className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400">{answeredCount}</p>
              </div>
              <div className="space-y-1">
                <span className="text-rose-600 dark:text-rose-400">Unattempted:</span>
                <p className="text-base font-bold font-mono text-rose-600 dark:text-rose-400">{unansweredCount}</p>
              </div>
              <div className="space-y-1">
                <span className="text-purple-700 dark:text-purple-400">Marked for Review:</span>
                <p className="text-base font-bold font-mono text-purple-700 dark:text-purple-400">{reviewCount}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono">
                <span>Time Remaining:</span>
                <span className="text-amber-800 dark:text-amber-400 font-bold">{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Once submitted, your responses will be evaluated against official answer keys and <strong className="text-amber-800 dark:text-amber-300">{selectedCategory} Category Cutoffs</strong> with full negative marking calculation.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Back to Test
              </button>

              <button
                onClick={handleFinalSubmit}
                className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Submit</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};


