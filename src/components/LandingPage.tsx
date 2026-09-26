import React, { useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  Clock, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BarChart3, 
  Bookmark, 
  Flame, 
  ChevronRight, 
  FileText, 
  Zap,
  HelpCircle,
  Building2
} from 'lucide-react';
import { MockTest, ExamCategory } from '../types';
import { ThemeToggle } from '../context/ThemeContext';

interface LandingPageProps {
  mockTests: MockTest[];
  onNavigateToLogin: () => void;
  onQuickExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  mockTests,
  onNavigateToLogin,
  onQuickExplore
}) => {
  // Interactive sample question state on landing page
  const [selectedSampleOption, setSelectedSampleOption] = useState<string | null>(null);
  const [showSampleExplanation, setShowSampleExplanation] = useState(false);

  const sampleQuestion = {
    text: "Under which Article of the Constitution of India is the Finance Commission of India constituted by the President?",
    options: [
      { id: 'a', text: 'Article 275' },
      { id: 'b', text: 'Article 280' },
      { id: 'c', text: 'Article 300A' },
      { id: 'd', text: 'Article 324' }
    ],
    correctId: 'b',
    explanation: "Article 280 of the Constitution of India provides for the constitution of a Finance Commission by the President of India every five years to recommend the distribution of tax revenues between the Union and the States."
  };

  const handleSampleOptionClick = (id: string) => {
    setSelectedSampleOption(id);
    setShowSampleExplanation(true);
  };

  const examTracks = [
    {
      title: 'UPSC Civil Services',
      tagline: 'GS Paper-1 & CSAT Prelims',
      badge: 'IAS / IPS / IFS',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
      description: 'Indian Polity, Economy, Modern History, Geography, Environment, and General Science.',
      questionsCount: '100+ MCQs',
      timeStandard: '120 Mins',
      marking: '+2.0 / -0.66'
    },
    {
      title: 'Banking Exams',
      tagline: 'IBPS PO, SBI Clerk & RBI Grade B',
      badge: 'PO / Clerk',
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300',
      description: 'Reasoning Ability, Quantitative Aptitude, English Comprehension, and Banking Awareness.',
      questionsCount: '21-100 MCQs',
      timeStandard: '60 Mins',
      marking: '+1.0 / -0.25'
    },
    {
      title: 'Staff Selection (SSC)',
      tagline: 'SSC CGL, CHSL & MTS Tier-1',
      badge: 'CGL / CHSL',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
      description: 'General Intelligence & Reasoning, Quantitative Aptitude, English, and General Awareness.',
      questionsCount: '100 MCQs',
      timeStandard: '60 Mins',
      marking: '+2.0 / -0.50'
    },
    {
      title: 'Railways (RRB)',
      tagline: 'RRB NTPC, Group D & JE Stage-1',
      badge: 'NTPC / Gr-D',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300',
      description: 'General Science (Physics, Chemistry, Biology), Mathematics, and General Awareness.',
      questionsCount: '100 MCQs',
      timeStandard: '90 Mins',
      marking: '+1.0 / -0.33'
    },
    {
      title: 'Class 12 HSC Aptitude',
      tagline: 'Science, Commerce & Arts Entrances',
      badge: 'HSC / Entrance',
      color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-300',
      description: 'Physics, Chemistry, Mathematics, Accountancy, Economics, and Modern History.',
      questionsCount: '60+ MCQs',
      timeStandard: '60 Mins',
      marking: '+1.0 / -0.25'
    },
    {
      title: 'Class 10 Foundation',
      tagline: 'SSC Board & NTSE Aptitude',
      badge: 'SSC / NTSE',
      color: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-300',
      description: 'Verbal Ability, Basic Arithmetic, Logical Reasoning, and General Knowledge foundation.',
      questionsCount: '40+ MCQs',
      timeStandard: '45 Mins',
      marking: '+1.0 / -0.25'
    }
  ];

  const platformPillars = [
    {
      icon: Clock,
      title: 'Configurable Countdown Timers',
      desc: 'Practice with standard exam durations or choose rapid 15m, 20m, or 30m speed sprints with automated submission.'
    },
    {
      icon: Target,
      title: 'Category Cutoff Diagnostics',
      desc: 'Instant benchmarking against official reservation cutoffs for General (UR), OBC, EWS, SC, and ST categories.'
    },
    {
      icon: BookOpen,
      title: 'Daily Current Affairs & MCQs',
      desc: 'Curated bilingual editorial briefs with topic tags, source citations, integrated mini-quizzes, and revision decks.'
    },
    {
      icon: BarChart3,
      title: 'Sectional & Accuracy Analytics',
      desc: 'Granular question review with step-by-step explanations, time spent per section, and downloadable scorecards.'
    },
    {
      icon: ShieldCheck,
      title: 'Faculty & Admin Governance',
      desc: 'Faculty guide portal for real-time question authoring, custom mock paper generation, and student cohort monitoring.'
    },
    {
      icon: Award,
      title: 'Printable Official Scorecards',
      desc: 'Formal college-accredited scorecards with student registration credentials, category ranks, and QR verification.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-amber-200 selection:text-amber-950 dark:selection:bg-amber-500/30 dark:selection:text-amber-200 flex flex-col transition-colors duration-200">
      
      {/* Top Floating Academic Banner & Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Institution Brand */}
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-sm shadow-amber-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight font-serif">
                    ExamPrep & Current Affairs Portal
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 rounded-md text-[10px] font-bold">
                    Autonomous 2026-27
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation, Theme Toggle & Action CTAs */}
            <div className="flex items-center space-x-2.5">
              <ThemeToggle />

              <button
                onClick={onQuickExplore}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Explore Catalog</span>
              </button>

              <button
                onClick={onNavigateToLogin}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Candidate & Faculty Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-colors duration-200">
        {/* Subtle Warm Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-200/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-blue-100/30 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Academic Department Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs font-bold shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Department of Information Technology • Academic Project</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-serif leading-[1.15]">
              Autonomous Competitive Exam & <br />
              <span className="text-amber-600 dark:text-amber-400">
                Current Affairs Assessment Portal
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Standardized computer-based examination simulations, dynamic custom countdown timers, 
              category-wise cutoff benchmarking, and bilingual current affairs intelligence for aspirants of 
              <strong className="text-slate-900 dark:text-slate-100 font-semibold"> UPSC, Banking (IBPS/SBI), SSC, Railways (RRB), Class 12 HSC, and Class 10 Foundation</strong>.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onNavigateToLogin}
                className="px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black shadow-md shadow-amber-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Enter Examination Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onQuickExplore}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Browse Mock Tests & Papers</span>
              </button>
            </div>

            {/* Live Key Metrics Badges */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="text-xl font-extrabold text-amber-700 dark:text-amber-400 font-serif">21+ Papers</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Standard & Sectional Sets</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-serif">1,500+ Qs</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Verified Questions Bank</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-serif">5 Cutoffs</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">UR / OBC / EWS / SC / ST</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-serif">Bilingual</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Daily Editorial Intelligence</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Exam Categories Track Showcase */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Target Examination Tracks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
                Comprehensive Syllabus Coverage
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Every paper is designed according to authentic national patterns with exact sectional allocations, negative penalties, and timer modes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {examTracks.map((track, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {track.badge}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      {track.timeStandard}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      {track.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Neg. Marking: <strong className="text-slate-800 dark:text-slate-200">{track.marking}</strong>
                  </span>

                  <button
                    onClick={onNavigateToLogin}
                    className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>Start Test</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Platform Pillars / Core Features */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Advanced Examination Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
              Engineered for Serious Exam Aspirants & Faculty
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Complete computer-based testing (CBT) capabilities designed to match real exam conditions with deep diagnostic reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Sample Question Teaser */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Interactive Preview</span>
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-serif">
              Experience the Testing Engine
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Try solving this live Constitution question to see instant feedback and explanation.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-amber-700 dark:text-amber-400">UPSC / GS-Polity Practice Sample</span>
              <span className="text-slate-500 dark:text-slate-400 font-mono">1 Mark • Negative -0.33</span>
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {sampleQuestion.text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {sampleQuestion.options.map((opt) => {
                const isSelected = selectedSampleOption === opt.id;
                const isCorrect = opt.id === sampleQuestion.correctId;
                let btnStyle = "bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800";

                if (selectedSampleOption) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 dark:bg-rose-950/50 border-rose-500 dark:border-rose-600 text-rose-950 dark:text-rose-200 font-bold";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSampleOptionClick(opt.id)}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-[11px] shrink-0 uppercase text-slate-700 dark:text-slate-200">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {showSampleExplanation && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Correct Answer: Option (b) - Article 280</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {sampleQuestion.explanation}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-400">
                Want to practice full 100-question timed mocks with instant ranking?
              </span>
              <button
                onClick={onNavigateToLogin}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs transition-all cursor-pointer"
              >
                Sign In to Start Full Mock
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Final Call to Action Footer Section */}
      <footer className="py-12 bg-slate-100/70 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Begin Your Exam Preparation Today</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Access the complete collection of mock tests, topic-wise practice, and current affairs briefs.
            </p>
            <button
              onClick={onNavigateToLogin}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              Go to Candidate Login
            </button>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 space-y-1">
            <p>© 2026-2027 Competitive Exam & Current Affairs Portal • Autonomous College Project</p>
            <p className="text-[11px]">Nirmala Memorial Foundation College of Commerce and Science, Mumbai</p>
          </div>

        </div>
      </footer>

    </div>
  );
};

