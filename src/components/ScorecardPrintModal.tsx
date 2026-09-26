import React from 'react';
import { TestAttempt, UserProfile } from '../types';
import { 
  X, 
  Printer, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Target, 
  Building2,
  Calendar,
  User,
  FileText
} from 'lucide-react';

interface ScorecardPrintModalProps {
  attempt: TestAttempt;
  user: UserProfile;
  onClose: () => void;
}

export const ScorecardPrintModal: React.FC<ScorecardPrintModalProps> = ({
  attempt,
  user,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const isPassed = attempt.passedOverallCutoff || attempt.passedCategoryCutoff;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-slate-900 dark:text-slate-100 transition-colors duration-200 print:bg-white print:text-slate-950 print:border-none print:shadow-none print:max-w-none print:m-0 print:p-0">
        
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="p-4 sm:px-8 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">Official Test Scorecard & Performance Report</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Scorecard Document */}
        <div id="printable-scorecard-content" className="p-6 sm:p-10 space-y-8 print:p-8 print:text-black">
          
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-200 dark:border-slate-800 print:border-slate-800 pb-6 text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 print:text-amber-700 tracking-wider uppercase mb-1">
              <Building2 className="w-4 h-4" /> Department of Information Technology • Academic Year 2026-27
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white print:text-black font-serif tracking-tight">
              Nirmala Memorial Foundation College of Commerce & Science (Autonomous)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600 font-medium">
              Competitive Exam and Current Affairs Mock Test Portal • Performance Assessment Record
            </p>
          </div>

          {/* Candidate & Exam Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 border border-slate-200 dark:border-slate-700 print:border-slate-300 rounded-2xl text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 flex items-center gap-1 font-semibold">
                <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Candidate Name
              </span>
              <p className="font-bold text-slate-900 dark:text-white print:text-black text-sm">{attempt.studentName || user.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 font-semibold">Roll No & Class</span>
              <p className="font-bold text-slate-900 dark:text-white print:text-black text-sm">Roll #{attempt.rollNo || user.rollNo} • {user.className || 'TYIT B'}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Attempt Date & Time
              </span>
              <p className="font-bold text-slate-900 dark:text-white print:text-black">{attempt.dateFormatted}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 font-semibold">Category Evaluated</span>
              <p className="font-bold text-amber-800 dark:text-amber-400 print:text-amber-800">{attempt.selectedCategory || 'UR'} Category</p>
            </div>
          </div>

          {/* Primary Result Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isPassed 
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 print:bg-emerald-50 border-emerald-300 dark:border-emerald-800 print:border-emerald-600 text-emerald-950 dark:text-emerald-200 print:text-emerald-950'
              : 'bg-rose-50/90 dark:bg-rose-950/40 print:bg-rose-50 border-rose-300 dark:border-rose-800 print:border-rose-600 text-rose-950 dark:text-rose-200 print:text-rose-950'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3.5 rounded-2xl shrink-0 ${isPassed ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'}`}>
                {isPassed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold opacity-80">
                  {attempt.testTitle}
                </span>
                <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-white">
                  {isPassed ? 'QUALIFIED / CLEARED CUTOFF' : 'NEEDS REVISION — DID NOT CLEAR CUTOFF'}
                </h3>
                <p className="text-xs opacity-90 mt-0.5 text-slate-700 dark:text-slate-300">
                  Category Cutoff: {attempt.categoryCutoffsUsed?.[attempt.selectedCategory] || attempt.overallCutoffMarks} Marks • Your Score: {attempt.scoreMarks.toFixed(2)} Marks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-center shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 print:border-slate-300 pt-4 md:pt-0 md:pl-6">
              <div>
                <div className="text-3xl font-black font-mono text-amber-800 dark:text-amber-400 print:text-amber-700">
                  {attempt.scoreMarks.toFixed(2)}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-600">
                  Out of {attempt.maxMarks}
                </div>
              </div>
              <div>
                <div className="text-3xl font-black font-mono text-cyan-800 dark:text-cyan-400 print:text-cyan-700">
                  {attempt.accuracyPercentage}%
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-600">
                  Accuracy
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 print:bg-slate-100 border border-slate-200 dark:border-slate-700 print:border-slate-300 text-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 print:text-slate-600 uppercase">Attempted</span>
              <p className="text-xl font-bold font-mono text-slate-900 dark:text-white print:text-black mt-1">
                {attempt.attemptedQuestions} / {attempt.totalQuestions}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 print:bg-emerald-50 border border-emerald-200 dark:border-emerald-800 print:border-emerald-300 text-center">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 print:text-emerald-700 uppercase">Correct Answers</span>
              <p className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300 print:text-emerald-800 mt-1">
                +{attempt.correctAnswers}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 print:bg-rose-50 border border-rose-200 dark:border-rose-800 print:border-rose-300 text-center">
              <span className="text-[11px] font-bold text-rose-800 dark:text-rose-400 print:text-rose-700 uppercase">Incorrect (Penalty)</span>
              <p className="text-xl font-bold font-mono text-rose-700 dark:text-rose-300 print:text-rose-800 mt-1">
                -{attempt.wrongAnswers}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 print:bg-slate-100 border border-slate-200 dark:border-slate-700 print:border-slate-300 text-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 print:text-slate-600 uppercase">Time Utilized</span>
              <p className="text-xl font-bold font-mono text-cyan-800 dark:text-cyan-400 print:text-cyan-800 mt-1">
                {Math.floor(attempt.totalTimeSeconds / 60)}m {attempt.totalTimeSeconds % 60}s
              </p>
            </div>
          </div>

          {/* Sectional Performance Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Section-Wise Diagnostic Breakdown
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 print:border-slate-300">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 print:bg-slate-200 print:text-slate-700 uppercase font-bold text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Section Name</th>
                    <th className="px-4 py-3 text-center">Total Qs</th>
                    <th className="px-4 py-3 text-center">Correct</th>
                    <th className="px-4 py-3 text-center">Wrong</th>
                    <th className="px-4 py-3 text-center">Accuracy</th>
                    <th className="px-4 py-3 text-center">Score</th>
                    <th className="px-4 py-3 text-center">Cutoff</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-slate-300 font-medium">
                  {attempt.sectionResults?.map((sec, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 print:hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white print:text-black">{sec.section}</td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 dark:text-slate-300">{sec.totalQuestions}</td>
                      <td className="px-4 py-3 text-center font-mono text-emerald-700 dark:text-emerald-400 print:text-emerald-700">+{sec.correct}</td>
                      <td className="px-4 py-3 text-center font-mono text-rose-700 dark:text-rose-400 print:text-rose-700">{sec.wrong}</td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 dark:text-slate-300">{sec.accuracyPercentage}%</td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-amber-800 dark:text-amber-400 print:text-amber-700">{sec.scoreMarks.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center font-mono text-slate-500 dark:text-slate-400 print:text-slate-600">{sec.cutoffMarks}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sec.passedSectionCutoff
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 print:bg-emerald-100 print:text-emerald-800 border border-emerald-300 dark:border-emerald-700'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 print:bg-rose-100 print:text-rose-800 border border-rose-300 dark:border-rose-700'
                        }`}>
                          {sec.passedSectionCutoff ? 'CLEARED' : 'BELOW CUTOFF'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification & Academic Signatures */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 print:border-slate-400 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-4">
              <div className="h-10 border-b border-dashed border-slate-300 dark:border-slate-700 print:border-slate-500"></div>
              <p className="font-bold text-slate-800 dark:text-slate-200 print:text-black">Candidate Signature</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Shivraj Gond / Chris Anthony</p>
            </div>

            <div className="space-y-4">
              <div className="h-10 border-b border-dashed border-slate-300 dark:border-slate-700 print:border-slate-500 flex items-center justify-center">
                <span className="text-[11px] font-serif italic text-amber-900 dark:text-amber-300 print:text-slate-700 font-bold">
                  Prof. Shraddha Parab
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200 print:text-black">Project Guide & Verifier</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Dept of Information Technology</p>
            </div>

            <div className="space-y-4 col-span-2 sm:col-span-1">
              <div className="h-10 border-b border-dashed border-slate-300 dark:border-slate-700 print:border-slate-500 flex items-center justify-center">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 print:text-slate-800 border border-amber-200 dark:border-amber-700 rounded text-[10px] font-mono uppercase">
                  VERIFIED DIGITAL RECORD
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200 print:text-black">Institutional Portal Seal</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Nirmala Memorial College (Autonomous)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
