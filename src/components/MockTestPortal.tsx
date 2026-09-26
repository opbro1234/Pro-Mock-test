import React, { useState } from 'react';
import { MockTest, ExamCategory, CategoryCutoffs } from '../types';
import { 
  Target, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  BookOpen, 
  Filter, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  Info,
  Calendar,
  X,
  Sliders,
  Sparkles,
  Zap
} from 'lucide-react';

interface MockTestPortalProps {
  mockTests: MockTest[];
  onStartTest: (test: MockTest, selectedCategory: keyof CategoryCutoffs) => void;
}

export const MockTestPortal: React.FC<MockTestPortalProps> = ({
  mockTests,
  onStartTest
}) => {
  const [selectedExamCategory, setSelectedExamCategory] = useState<string>('All');
  const [selectedTestForInstructions, setSelectedTestForInstructions] = useState<MockTest | null>(null);
  const [candidateCategory, setCandidateCategory] = useState<keyof CategoryCutoffs>('UR');
  const [instructionsAccepted, setInstructionsAccepted] = useState<boolean>(false);
  
  // Custom Timer Preference for selected test
  const [selectedTimerMinutes, setSelectedTimerMinutes] = useState<number>(60);
  const [customTimerInput, setCustomTimerInput] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const categories = [
    'All',
    'Class 12 Aptitude & Entrance',
    'Class 10 Foundation Aptitude',
    'UPSC Civil Services',
    'SSC (CGL/CHSL/MTS)',
    'Banking (IBPS/SBI/RBI)',
    'Railways (RRB NTPC/Group D)',
    'General Studies & Science'
  ];

  const filteredTests = mockTests.filter(test => {
    return selectedExamCategory === 'All' || test.examCategory === selectedExamCategory;
  });

  const handleOpenInstructions = (test: MockTest) => {
    setSelectedTestForInstructions(test);
    setSelectedTimerMinutes(test.overallTimeLimitMinutes || 60);
    setCustomTimerInput('');
    setInstructionsAccepted(false);
    setValidationError('');
  };

  const handleConfirmStart = () => {
    if (!selectedTestForInstructions) return;
    if (!instructionsAccepted) {
      setValidationError('Please check the confirmation box acknowledging the examination instructions and negative marking rules.');
      return;
    }
    
    // Apply selected timer duration to the test instance
    const updatedTest: MockTest = {
      ...selectedTestForInstructions,
      overallTimeLimitMinutes: selectedTimerMinutes
    };

    onStartTest(updatedTest, candidateCategory);
    setSelectedTestForInstructions(null);
  };

  return (
    <div id="mock-test-portal-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-bold">
            <Target className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Full-Length Examination Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Competitive Exam Mock Test Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Real-time simulated tests with precision countdown timers, strict negative marking penalties, question navigator palette (Answered, Not Answered, Marked for Review), and instant category cutoff evaluation.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 relative z-10">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Available Tests</span>
            <span className="text-2xl font-black text-amber-800 dark:text-amber-400 font-mono">{mockTests.length} Papers</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedExamCategory(cat)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedExamCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <span>{cat}</span>
            {cat !== 'All' && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedExamCategory === cat ? 'bg-amber-100 text-amber-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {mockTests.filter(t => t.examCategory === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mock Tests Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              {/* Card Top Badges & Timer Indicator */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  {test.examCategory}
                </span>

                <div className="flex items-center space-x-1.5 text-xs text-amber-800 dark:text-amber-300 font-bold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{test.overallTimeLimitMinutes} mins set</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {test.subtitle}
                </p>
              </div>

              {/* Key Exam Parameters */}
              <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Total Questions</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{test.totalQuestions} MCQs</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Max Marks</span>
                  <span className="text-sm font-bold font-mono text-amber-800 dark:text-amber-400">
                    {(test.totalQuestions * test.marksPerQuestion).toFixed(1)} Marks
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Paper Timer</span>
                  <span className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-400">⏱️ {test.overallTimeLimitMinutes} Mins</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Negative Penalty</span>
                  <span className="text-xs font-bold font-mono text-rose-600 dark:text-rose-400">-{test.negativeMarksPerQuestion} Mark</span>
                </div>
              </div>

              {/* Cutoff Reference Pills */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Category Cutoffs Benchmark:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-slate-200 dark:border-slate-700">
                    UR: {test.categoryCutoffs?.UR || test.overallCutoffMarks}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700">
                    OBC: {test.categoryCutoffs?.OBC || 9}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-800 dark:text-purple-300 border border-slate-200 dark:border-slate-700">
                    EWS: {test.categoryCutoffs?.EWS || 8.5}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 border border-slate-200 dark:border-slate-700">
                    SC/ST: {test.categoryCutoffs?.SC || 7}
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => handleOpenInstructions(test)}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Review Instructions & Start Test</span>
            </button>
          </div>
        ))}
      </div>

      {/* Pre-Test Examination Guidelines Modal */}
      {selectedTestForInstructions && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-xl flex flex-col text-slate-900 dark:text-slate-100">
            
            {/* Modal Top */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">General Examination Guidelines & Timer Configuration</span>
              </div>
              <button
                onClick={() => setSelectedTestForInstructions(null)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-600 dark:text-slate-300">
              <div className="space-y-1">
                <span className="text-amber-800 dark:text-amber-400 font-extrabold uppercase tracking-wider text-[11px]">
                  {selectedTestForInstructions.examCategory}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                  {selectedTestForInstructions.title}
                </h3>
              </div>

              {/* Timer Configuration Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Set Examination Timer for this Paper:</span>
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-mono font-bold text-xs rounded-lg border border-amber-300 dark:border-amber-800">
                    {selectedTimerMinutes} Minutes
                  </span>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Standard', mins: selectedTestForInstructions.overallTimeLimitMinutes || 60, icon: Target },
                    { label: '30m Sprint', mins: 30, icon: Zap },
                    { label: '20m Blitz', mins: 20, icon: Sparkles },
                    { label: '15m Speed', mins: 15, icon: Clock }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setSelectedTimerMinutes(preset.mins);
                        setCustomTimerInput('');
                      }}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        selectedTimerMinutes === preset.mins
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <preset.icon className="w-3.5 h-3.5" />
                      <span>{preset.label}</span>
                      <span className="text-[10px] font-mono opacity-80">{preset.mins}m</span>
                    </button>
                  ))}
                </div>

                {/* Custom Timer Input */}
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">Custom Duration:</span>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    placeholder="Enter minutes (5-180)"
                    value={customTimerInput}
                    onChange={(e) => {
                      setCustomTimerInput(e.target.value);
                      const parsed = parseInt(e.target.value, 10);
                      if (!isNaN(parsed) && parsed > 0) {
                        setSelectedTimerMinutes(parsed);
                      }
                    }}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Rules List */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 leading-relaxed">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Standard Test Rules:
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
                  <li>The clock will countdown from <strong className="text-slate-900 dark:text-white">{selectedTimerMinutes} minutes</strong>. The countdown timer in the top header will display the remaining time.</li>
                  <li><strong className="text-slate-900 dark:text-white">Marks per correct response:</strong> <span className="text-emerald-700 dark:text-emerald-400 font-bold">+{selectedTestForInstructions.marksPerQuestion} Mark</span></li>
                  <li><strong className="text-slate-900 dark:text-white">Negative penalty for incorrect response:</strong> <span className="text-rose-600 dark:text-rose-400 font-bold">-{selectedTestForInstructions.negativeMarksPerQuestion} Mark</span>. Unattempted questions will not receive any negative penalty.</li>
                  <li>You can navigate freely across questions using the question palette and change your selected option at any time before final submission.</li>
                  <li>When the timer expires, the test will automatically submit your saved responses.</li>
                </ul>
              </div>

              {/* Candidate Category Selection */}
              <div className="space-y-2 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <label className="font-bold text-amber-900 dark:text-amber-300 block text-xs">
                  Select Your Reservation Category for Cutoff Evaluation:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['UR', 'OBC', 'EWS', 'SC', 'ST'] as (keyof CategoryCutoffs)[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCandidateCategory(cat)}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        candidateCategory === cat
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="block text-[10px] font-mono mt-0.5 opacity-80">
                        {selectedTestForInstructions.categoryCutoffs?.[cat] || 10} M
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={instructionsAccepted}
                  onChange={e => {
                    setInstructionsAccepted(e.target.checked);
                    if (e.target.checked) setValidationError('');
                  }}
                  className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  I have read and understood all instructions. I confirm that I will not switch tabs or use unfair means during the timed session.
                </span>
              </label>

              {validationError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Action */}
              <button
                onClick={handleConfirmStart}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Begin Examination ({selectedTimerMinutes} Mins Timer)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );

};

