import React, { useState } from 'react';
import { Question, PracticeTopic, ExamCategory } from '../types';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';
import { toggleQuestionBookmark, getQuestionBookmarks } from '../data/storage';

interface TopicPracticeViewProps {
  questions: Question[];
}

export const TopicPracticeView: React.FC<TopicPracticeViewProps> = ({ questions }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedExamCategory, setSelectedExamCategory] = useState<string>('All');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [practiceBookmarks, setPracticeBookmarks] = useState<string[]>(getQuestionBookmarks());

  const topics = [
    'All',
    ...Array.from(new Set(questions.map(q => q.topic).filter(Boolean)))
  ];

  const examCategories = [
    'All',
    'Class 12 Aptitude & Entrance',
    'Class 10 Foundation Aptitude',
    'UPSC Civil Services',
    'SSC (CGL/CHSL/MTS)',
    'Banking (IBPS/SBI/RBI)',
    'Railways (RRB NTPC/Group D)'
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesExam = selectedExamCategory === 'All' || q.examCategory === selectedExamCategory;
    return matchesTopic && matchesExam;
  });

  const currentQ: Question | undefined = filteredQuestions[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (isAnswerRevealed) return;
    setUserSelectedOption(optId);
    setIsAnswerRevealed(true);
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setUserSelectedOption(null);
      setIsAnswerRevealed(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setUserSelectedOption(null);
      setIsAnswerRevealed(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedTopic('All');
    setSelectedExamCategory('All');
    setCurrentIdx(0);
    setUserSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handleToggleBookmark = (qId: string) => {
    const updated = toggleQuestionBookmark(qId);
    setPracticeBookmarks(updated);
  };

  return (
    <div id="topic-practice-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Topic-Wise Practice & Diagnostic Sets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Subject-Wise Practice Drills
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Practice questions organized by specific subject and exam category with instant answer reveal and comprehensive step-by-step solutions.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center shrink-0">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Filtered Questions</span>
          <span className="text-2xl font-black text-amber-800 dark:text-amber-400 font-mono">{filteredQuestions.length} Qs</span>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="space-y-4">
        {/* Exam Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2 shrink-0">Exam:</span>
          {examCategories.map((exam) => (
            <button
              key={exam}
              onClick={() => {
                setSelectedExamCategory(exam);
                setCurrentIdx(0);
                setUserSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedExamCategory === exam
                  ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* Topic Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2 shrink-0">Topic:</span>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedTopic(t);
                setCurrentIdx(0);
                setUserSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTopic === t
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Drill Card */}
      {currentQ ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Card Top */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold text-xs border border-amber-300 dark:border-amber-800">
                Question {currentIdx + 1} of {filteredQuestions.length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                {currentQ.examCategory}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{currentQ.topic}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                currentQ.difficulty === 'Hard' ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}>
                {currentQ.difficulty || 'Medium'}
              </span>

              <button
                onClick={() => handleToggleBookmark(currentQ.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  practiceBookmarks.includes(currentQ.id)
                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
                title="Bookmark for Revision Deck"
              >
                <Bookmark className={`w-4 h-4 ${practiceBookmarks.includes(currentQ.id) ? 'fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Passage if any */}
          {currentQ.passage && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[10px] block mb-1">Context Passage:</span>
              <p>{currentQ.passage}</p>
            </div>
          )}

          {/* Question Statement */}
          <div className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.text}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = userSelectedOption === opt.id;
              const isCorrect = opt.id === currentQ.correctOptionId;

              let style = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800';

              if (isAnswerRevealed) {
                if (isCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerRevealed}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${style}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-mono uppercase text-xs font-bold text-slate-600 dark:text-slate-300">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isAnswerRevealed && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswerRevealed && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Solution Rationale Reveal */}
          {isAnswerRevealed && (
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2 text-xs text-slate-700 dark:text-slate-300 animate-fadeIn">
              <span className="font-extrabold text-amber-900 dark:text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" /> Step-by-Step Solution & Concept:
              </span>
              <p className="leading-relaxed whitespace-pre-line">{currentQ.explanation}</p>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {isAnswerRevealed ? (
                <button
                  onClick={handleNext}
                  disabled={currentIdx === filteredQuestions.length - 1}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsAnswerRevealed(true)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Show Answer
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="py-16 text-center text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">No Questions Found for Selected Filter</h3>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-colors"
          >
            Reset Subject & Exam Filters
          </button>
        </div>
      )}

    </div>
  );
};
