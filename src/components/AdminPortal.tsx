import React, { useState } from 'react';
import { 
  Question, 
  MockTest, 
  CurrentAffairsItem, 
  AdminAnalytics,
  ExamCategory,
  CurrentAffairsCategory,
  SectionName,
  PracticeTopic,
  CategoryCutoffs
} from '../types';
import { 
  saveCustomQuestion, 
  deleteCustomQuestion, 
  saveCurrentAffairsPost, 
  deleteCurrentAffairsPost,
  saveMockTest,
  deleteMockTest,
  getAdminAnalytics,
  getAllQuestions,
  getAllCurrentAffairs,
  getMockTests
} from '../data/storage';
import { 
  ShieldCheck, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  BookOpen, 
  FileText, 
  Download, 
  Upload, 
  CheckCircle2, 
  Search, 
  TrendingUp, 
  Users, 
  Award, 
  Layers, 
  Clock, 
  Sparkles,
  Calendar,
  X
} from 'lucide-react';

interface AdminPortalProps {
  questions: Question[];
  currentAffairs: CurrentAffairsItem[];
  mockTests: MockTest[];
  onDataChanged: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  questions,
  currentAffairs,
  mockTests,
  onDataChanged
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'ca_crud' | 'questions_crud' | 'tests_crud'>('analytics');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Analytics
  const analytics: AdminAnalytics = getAdminAnalytics();

  // --- Current Affairs Form State ---
  const [caTitle, setCaTitle] = useState('');
  const [caCategory, setCaCategory] = useState<CurrentAffairsCategory>('National');
  const [caDate, setCaDate] = useState(new Date().toISOString().split('T')[0]);
  const [caSummary, setCaSummary] = useState('');
  const [caFullArticle, setCaFullArticle] = useState('');
  const [caKeyTakeaways, setCaKeyTakeaways] = useState('');
  const [caSource, setCaSource] = useState('Official Press Release / PIB');
  const [caTags, setCaTags] = useState('UPSC GS-2, SSC CGL');
  const [caReadTime, setCaReadTime] = useState(4);
  const [caSearch, setCaSearch] = useState('');

  // Attached MCQ for CA
  const [caQText, setCaQText] = useState('');
  const [caOptA, setCaOptA] = useState('');
  const [caOptB, setCaOptB] = useState('');
  const [caOptC, setCaOptC] = useState('');
  const [caOptD, setCaOptD] = useState('');
  const [caCorrectOpt, setCaCorrectOpt] = useState('a');
  const [caQExpl, setCaQExpl] = useState('');

  // --- Question Form State ---
  const [qSection, setQSection] = useState<SectionName>('General Studies');
  const [qTopic, setQTopic] = useState<PracticeTopic>('Polity & Constitution');
  const [qExamCategory, setQExamCategory] = useState<ExamCategory>('UPSC Civil Services');
  const [qExamTag, setQExamTag] = useState('UPSC Prelims GS-1');
  const [qDifficulty, setQDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [qPassage, setQPassage] = useState('');
  const [qText, setQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOptId, setCorrectOptId] = useState('a');
  const [explanation, setExplanation] = useState('');
  const [qSearch, setQSearch] = useState('');

  // --- Mock Test Creator State ---
  const [testTitle, setTestTitle] = useState('');
  const [testSubtitle, setTestSubtitle] = useState('');
  const [testCategory, setTestCategory] = useState<ExamCategory>('UPSC Civil Services');
  const [testDurationMins, setTestDurationMins] = useState(60);
  const [testMarksPerQ, setTestMarksPerQ] = useState(2.0);
  const [testNegMarks, setTestNegMarks] = useState(0.66);
  const [testCutoffUR, setTestCutoffUR] = useState(12.0);
  const [testCutoffOBC, setTestCutoffOBC] = useState(11.0);
  const [testCutoffEWS, setTestCutoffEWS] = useState(10.5);
  const [testCutoffSC, setTestCutoffSC] = useState(9.0);
  const [testCutoffST, setTestCutoffST] = useState(8.0);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // CA Submit
  const handleCASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caTitle.trim() || !caSummary.trim() || !caFullArticle.trim()) {
      showNotification('Please fill in required title, summary, and article content.');
      return;
    }

    const takeawaysArray = caKeyTakeaways
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const tagsArray = caTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    let attachedQuestion = undefined;
    if (caQText.trim() && caOptA.trim() && caOptB.trim()) {
      attachedQuestion = {
        questionText: caQText.trim(),
        options: [
          { id: 'a', text: caOptA.trim() },
          { id: 'b', text: caOptB.trim() },
          { id: 'c', text: caOptC.trim() || 'Option C' },
          { id: 'd', text: caOptD.trim() || 'Option D' }
        ],
        correctOptionId: caCorrectOpt,
        explanation: caQExpl.trim() || 'Conceptual solution rationale'
      };
    }

    saveCurrentAffairsPost({
      title: caTitle.trim(),
      summary: caSummary.trim(),
      fullArticle: caFullArticle.trim(),
      keyTakeaways: takeawaysArray.length > 0 ? takeawaysArray : ['Essential concept for competitive examinations.'],
      category: caCategory,
      date: caDate,
      readTimeMinutes: Number(caReadTime) || 4,
      source: caSource.trim() || 'Official Gazette / PIB',
      tags: tagsArray.length > 0 ? tagsArray : ['Current Affairs', 'Competitive Exams'],
      practiceQuestion: attachedQuestion
    });

    // Reset
    setCaTitle('');
    setCaSummary('');
    setCaFullArticle('');
    setCaKeyTakeaways('');
    setCaQText('');
    setCaOptA('');
    setCaOptB('');
    setCaOptC('');
    setCaOptD('');
    setCaQExpl('');

    showNotification('Current Affairs article published successfully!');
    onDataChanged();
  };

  // Question Submit
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim() || !explanation.trim()) {
      alert('Please complete all question fields, options, and step-by-step solution rationale.');
      return;
    }

    saveCustomQuestion({
      section: qSection,
      topic: qTopic,
      examCategory: qExamCategory,
      passage: qPassage.trim() || undefined,
      text: qText.trim(),
      options: [
        { id: 'a', text: optA.trim() },
        { id: 'b', text: optB.trim() },
        { id: 'c', text: optC.trim() },
        { id: 'd', text: optD.trim() }
      ],
      correctOptionId: correctOptId,
      explanation: explanation.trim(),
      difficulty: qDifficulty,
      examTag: qExamTag.trim() || 'Competitive Exam'
    });

    // Reset
    setQText('');
    setQPassage('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');

    showNotification('New question successfully added to the central Question Bank!');
    onDataChanged();
  };

  // Mock Test Submit
  const handleMockTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) {
      showNotification('Please provide a mock test title.');
      return;
    }

    const testQuestions = selectedQuestionIds.length > 0
      ? questions.filter(q => selectedQuestionIds.includes(q.id))
      : questions.slice(0, 8);

    const newTest: MockTest = {
      id: `custom-test-${Date.now()}`,
      title: testTitle.trim(),
      subtitle: testSubtitle.trim() || `${testCategory} Custom Practice Paper`,
      examCategory: testCategory,
      totalQuestions: testQuestions.length,
      overallTimeLimitMinutes: Number(testDurationMins) || 60,
      marksPerQuestion: Number(testMarksPerQ) || 1.0,
      negativeMarksPerQuestion: Number(testNegMarks) || 0.33,
      overallCutoffMarks: Number(testCutoffUR) || 10.0,
      categoryCutoffs: {
        UR: Number(testCutoffUR) || 10.0,
        OBC: Number(testCutoffOBC) || 9.0,
        EWS: Number(testCutoffEWS) || 8.5,
        SC: Number(testCutoffSC) || 7.0,
        ST: Number(testCutoffST) || 6.0
      },
      sections: [
        {
          id: `sec-${Date.now()}`,
          section: 'General Studies',
          questionIds: testQuestions.map(q => q.id),
          timeLimitMinutes: Math.floor(testDurationMins / 2),
          cutoffMarks: Math.floor(testCutoffUR / 2)
        }
      ],
      questions: testQuestions
    };

    saveMockTest(newTest);
    setTestTitle('');
    setTestSubtitle('');
    setSelectedQuestionIds([]);
    showNotification('Mock Test scheduled and published for aspirants!');
    onDataChanged();
  };

  // JSON Export / Import
  const handleExportAllJSON = () => {
    const exportData = {
      exportTimestamp: new Date().toISOString(),
      questions,
      currentAffairs,
      mockTests
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam_portal_data_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.questions && Array.isArray(parsed.questions)) {
          parsed.questions.forEach((q: any) => saveCustomQuestion(q));
        }
        if (parsed.currentAffairs && Array.isArray(parsed.currentAffairs)) {
          parsed.currentAffairs.forEach((ca: any) => saveCurrentAffairsPost(ca));
        }
        onDataChanged();
        showNotification('Database successfully imported from JSON backup!');
      } catch (err) {
        showNotification('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="admin-portal-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Faculty & Admin Management Panel
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
            Portal Control & Question Bank Administration
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Nirmala Memorial Foundation College of Commerce and Science (Autonomous) • Dept of IT
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={handleExportAllJSON}
            className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 font-bold shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Export Full JSON Backup</span>
          </button>

          <label className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer font-bold shadow-xs">
            <Upload className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Admin Module Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl gap-1.5 text-xs font-bold">
        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'analytics'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Aggregate Analytics</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('ca_crud')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'ca_crud'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Current Affairs Posts ({currentAffairs.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('questions_crud')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'questions_crud'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Question Bank ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('tests_crud')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAdminTab === 'tests_crud'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Mock Test Scheduler ({mockTests.length})</span>
        </button>
      </div>

      {/* --- TAB 1: Aggregate Analytics --- */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Enrolled Students</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">{analytics.totalStudents}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Nirmala Memorial College IT Dept</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Tests Attempted</span>
              <p className="text-3xl font-black text-amber-800 dark:text-amber-400 font-mono">{analytics.totalTestsAttempted}</p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">82% Completion Rate</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Average Student Score</span>
              <p className="text-3xl font-black text-cyan-800 dark:text-cyan-400 font-mono">{analytics.averageScorePercentage}%</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Class Average</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Total Questions in Bank</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">{questions.length}</p>
              <p className="text-[11px] text-amber-800 dark:text-amber-400 font-semibold">{mockTests.length} Active Mock Tests</p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Faculty Guide Note</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This administrative module empowers project coordinators and educators to maintain a real-time, authentic curriculum of daily current affairs and competitive examination test sets. All scoring computations strictly implement negative penalties (-0.25 for Banking, -0.33 for Railways, -0.50 for SSC, and -0.66 for UPSC).
            </p>
          </div>
        </div>
      )}

      {/* --- TAB 2: Current Affairs CRUD --- */}
      {activeAdminTab === 'ca_crud' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Add Article */}
          <form onSubmit={handleCASubmit} className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Publish Daily Current Affairs Article
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category *</label>
                <select
                  value={caCategory}
                  onChange={e => setCaCategory(e.target.value as CurrentAffairsCategory)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 font-semibold transition-colors"
                >
                  <option value="National">National</option>
                  <option value="International">International</option>
                  <option value="Economy & Banking">Economy & Banking</option>
                  <option value="Science & Technology">Science & Technology</option>
                  <option value="Government Schemes">Government Schemes</option>
                  <option value="Environment & Ecology">Environment & Ecology</option>
                  <option value="Sports">Sports</option>
                  <option value="Awards & Honours">Awards & Honours</option>
                  <option value="Appointments & Summits">Appointments & Summits</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Publication Date *</label>
                <input
                  type="date"
                  value={caDate}
                  onChange={e => setCaDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">Headline / Title *</label>
              <input
                type="text"
                value={caTitle}
                onChange={e => setCaTitle(e.target.value)}
                placeholder="e.g. ISRO Launches Shukrayaan Venus Mission Payload Testing"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">Executive Summary (2-3 lines) *</label>
              <textarea
                rows={2}
                value={caSummary}
                onChange={e => setCaSummary(e.target.value)}
                placeholder="Brief summary for quick revision ticker..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">Full Comprehensive Article *</label>
              <textarea
                rows={4}
                value={caFullArticle}
                onChange={e => setCaFullArticle(e.target.value)}
                placeholder="Detailed article body for aspirants..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">
                Key Takeaways for Aspirants (One bullet point per line)
              </label>
              <textarea
                rows={3}
                value={caKeyTakeaways}
                onChange={e => setCaKeyTakeaways(e.target.value)}
                placeholder="Bullet 1: Outlay and key statutory sections&#10;Bullet 2: Target date and constitutional provisions"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Source Citation</label>
                <input
                  type="text"
                  value={caSource}
                  onChange={e => setCaSource(e.target.value)}
                  placeholder="e.g. PIB Delhi / The Hindu"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Exam Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={caTags}
                  onChange={e => setCaTags(e.target.value)}
                  placeholder="UPSC GS-3, SSC CGL, Banking GA"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Attached MCQ sub-card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                Attach Diagnostic Practice MCQ (Optional)
              </span>
              <input
                type="text"
                value={caQText}
                onChange={e => setCaQText(e.target.value)}
                placeholder="Question text..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white text-xs transition-colors"
              />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={caOptA}
                  onChange={e => setCaOptA(e.target.value)}
                  placeholder="Option A"
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white transition-colors"
                />
                <input
                  type="text"
                  value={caOptB}
                  onChange={e => setCaOptB(e.target.value)}
                  placeholder="Option B"
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <select
                  value={caCorrectOpt}
                  onChange={e => setCaCorrectOpt(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-emerald-700 dark:text-emerald-400 font-bold transition-colors"
                >
                  <option value="a">Correct: Option A</option>
                  <option value="b">Correct: Option B</option>
                </select>
                <input
                  type="text"
                  value={caQExpl}
                  onChange={e => setCaQExpl(e.target.value)}
                  placeholder="Rationale"
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Publish to Current Affairs Feed
            </button>
          </form>

          {/* Right List: Manage Articles */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Published Articles ({currentAffairs.length})</h3>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={caSearch}
                    onChange={e => setCaSearch(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white w-44 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {currentAffairs
                  .filter(c => c.title.toLowerCase().includes(caSearch.toLowerCase()))
                  .map(ca => (
                    <div
                      key={ca.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded text-[10px] font-bold">
                            {ca.category}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px]">{ca.date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{ca.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 line-clamp-2 text-[11px]">{ca.summary}</p>
                      </div>

                      {ca.id.startsWith('ca-post-') && (
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this current affairs article?')) {
                              deleteCurrentAffairsPost(ca.id);
                              onDataChanged();
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: Question Bank CRUD --- */}
      {activeAdminTab === 'questions_crud' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Create Question */}
          <form onSubmit={handleQuestionSubmit} className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Add New Examination Question
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section *</label>
                <select
                  value={qSection}
                  onChange={e => setQSection(e.target.value as SectionName)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                >
                  <option value="General Studies">General Studies</option>
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="Reasoning & Logical Intelligence">Reasoning & Logical Intelligence</option>
                  <option value="General Awareness">General Awareness</option>
                  <option value="General Science">General Science</option>
                  <option value="English Comprehension">English Comprehension</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Exam *</label>
                <select
                  value={qExamCategory}
                  onChange={e => setQExamCategory(e.target.value as ExamCategory)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                >
                  <option value="UPSC Civil Services">UPSC Civil Services</option>
                  <option value="SSC (CGL/CHSL/MTS)">SSC (CGL/CHSL/MTS)</option>
                  <option value="Banking (IBPS/SBI/RBI)">Banking (IBPS/SBI/RBI)</option>
                  <option value="Railways (RRB NTPC/Group D)">Railways (RRB NTPC/Group D)</option>
                  <option value="General Studies & Science">General Studies & Science</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Difficulty</label>
                <select
                  value={qDifficulty}
                  onChange={e => setQDifficulty(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-bold transition-colors"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">Question Text *</label>
              <textarea
                rows={3}
                value={qText}
                onChange={e => setQText(e.target.value)}
                placeholder="Type examination question statement..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            {/* 4 Options */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block text-xs">4 Answer Options *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={optA}
                  onChange={e => setOptA(e.target.value)}
                  placeholder="Option (a)"
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                  required
                />
                <input
                  type="text"
                  value={optB}
                  onChange={e => setOptB(e.target.value)}
                  placeholder="Option (b)"
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                  required
                />
                <input
                  type="text"
                  value={optC}
                  onChange={e => setOptC(e.target.value)}
                  placeholder="Option (c)"
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                  required
                />
                <input
                  type="text"
                  value={optD}
                  onChange={e => setOptD(e.target.value)}
                  placeholder="Option (d)"
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Correct Answer *</label>
                <select
                  value={correctOptId}
                  onChange={e => setCorrectOptId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-emerald-700 dark:text-emerald-400 font-extrabold transition-colors"
                >
                  <option value="a">Option (a)</option>
                  <option value="b">Option (b)</option>
                  <option value="c">Option (c)</option>
                  <option value="d">Option (d)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Exam Tag</label>
                <input
                  type="text"
                  value={qExamTag}
                  onChange={e => setQExamTag(e.target.value)}
                  placeholder="e.g. UPSC GS-1, SSC CGL"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">Detailed Solution & Rationale *</label>
              <textarea
                rows={3}
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                placeholder="Explain the step-by-step conceptual rationale, formula, or statutory article..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Save Question to Question Bank
            </button>
          </form>

          {/* Right: Question Bank List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Bank Questions ({questions.length})</h3>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={qSearch}
                    onChange={e => setQSearch(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white w-44 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {questions
                  .filter(q => q.text.toLowerCase().includes(qSearch.toLowerCase()))
                  .map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded text-[10px] font-bold">
                            {q.section}
                          </span>
                          <span className="text-cyan-800 dark:text-cyan-300 text-[10px] font-semibold">{q.examCategory}</span>
                        </div>
                        <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                          <strong className="text-amber-800 dark:text-amber-400 mr-1">#{idx + 1}</strong> {q.text}
                        </p>
                      </div>

                      {q.id.startsWith('custom-cq-') && (
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this question from question bank?')) {
                              deleteCustomQuestion(q.id);
                              onDataChanged();
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: Mock Test Scheduler & Creator --- */}
      {activeAdminTab === 'tests_crud' && (
        <form onSubmit={handleMockTestSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Assemble & Schedule New Mock Test Paper
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Test Title *</label>
              <input
                type="text"
                value={testTitle}
                onChange={e => setTestTitle(e.target.value)}
                placeholder="e.g. UPSC Prelims 2026 Special Mock Paper #3"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Exam Category *</label>
              <select
                value={testCategory}
                onChange={e => setTestCategory(e.target.value as ExamCategory)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
              >
                <option value="UPSC Civil Services">UPSC Civil Services</option>
                <option value="SSC (CGL/CHSL/MTS)">SSC (CGL/CHSL/MTS)</option>
                <option value="Banking (IBPS/SBI/RBI)">Banking (IBPS/SBI/RBI)</option>
                <option value="Railways (RRB NTPC/Group D)">Railways (RRB NTPC/Group D)</option>
                <option value="General Studies & Science">General Studies & Science</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={testDurationMins}
                onChange={e => setTestDurationMins(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marks per Correct (+)</label>
              <input
                type="number"
                step="0.1"
                value={testMarksPerQ}
                onChange={e => setTestMarksPerQ(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-emerald-700 dark:text-emerald-400 font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Negative Penalty (-)</label>
              <input
                type="number"
                step="0.01"
                value={testNegMarks}
                onChange={e => setTestNegMarks(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-rose-700 dark:text-rose-400 font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">UR Benchmark Cutoff (Marks)</label>
              <input
                type="number"
                step="0.1"
                value={testCutoffUR}
                onChange={e => setTestCutoffUR(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-amber-800 dark:text-amber-400 font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
              Reservation Category Cutoffs (UR / OBC / EWS / SC / ST)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1 text-[11px]">UR Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  value={testCutoffUR}
                  onChange={e => setTestCutoffUR(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1 text-[11px]">OBC Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  value={testCutoffOBC}
                  onChange={e => setTestCutoffOBC(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1 text-[11px]">EWS Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  value={testCutoffEWS}
                  onChange={e => setTestCutoffEWS(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1 text-[11px]">SC Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  value={testCutoffSC}
                  onChange={e => setTestCutoffSC(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1 text-[11px]">ST Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  value={testCutoffST}
                  onChange={e => setTestCutoffST(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4" /> Save & Schedule Mock Test
          </button>
        </form>
      )}

    </div>
  );
};
