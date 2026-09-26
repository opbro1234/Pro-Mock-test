import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  ShieldCheck, 
  LogIn, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Building2, 
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  AlertCircle
} from 'lucide-react';
import { UserProfile, ExamCategory, CategoryName } from '../types';
import { switchStudentPersona, saveUserProfile } from '../data/storage';
import { ADMIN_USER_PROFILE } from '../data/seedData';
import { Avatar } from './Avatar';
import { ThemeToggle } from '../context/ThemeContext';

interface LoginPageProps {
  currentUser: UserProfile;
  onLoginSuccess: (profile: UserProfile) => void;
  onBackToLanding: () => void;
  onGuestAccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLoginSuccess,
  onBackToLanding,
  onGuestAccess
}) => {
  const [authMode, setAuthMode] = useState<'persona' | 'custom' | 'admin'>('persona');
  
  // Custom Candidate Form State
  const [name, setName] = useState(currentUser.name || 'Candidate Student');
  const [rollNo, setRollNo] = useState(currentUser.rollNo || '2026-NMF-101');
  const [email, setEmail] = useState(currentUser.email || 'student@nmf.edu.in');
  const [targetExam, setTargetExam] = useState<ExamCategory>(currentUser.targetExam || 'UPSC Civil Services');
  const [candidateCategory, setCandidateCategory] = useState<CategoryName>('UR');
  const [institute, setInstitute] = useState(currentUser.institute || 'Nirmala Memorial Foundation College of Commerce and Science (Autonomous)');
  
  // Admin PIN State
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1-Click Persona Login
  const handlePersonaSelect = (persona: 'shivraj' | 'chris' | 'admin') => {
    setErrorMsg('');
    const updated = switchStudentPersona(persona);
    setSuccessMsg(`Welcome, ${updated.name}! Logging you in...`);
    setTimeout(() => {
      onLoginSuccess(updated);
    }, 600);
  };

  // Custom Student Login
  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !rollNo.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name, roll number, and valid email address.');
      return;
    }

    const updated: UserProfile = {
      ...currentUser,
      name: name.trim(),
      rollNo: rollNo.trim(),
      email: email.trim(),
      targetExam,
      institute: institute.trim() || 'Nirmala Memorial Foundation College (Autonomous)',
      role: 'student'
    };

    saveUserProfile(updated);
    setSuccessMsg('Candidate authentication successful! Entering dashboard...');
    setTimeout(() => {
      onLoginSuccess(updated);
    }, 600);
  };

  // Admin / Faculty Login
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (adminPin === 'admin123' || adminPin === '2026' || adminPin === 'admin') {
      const updated: UserProfile = {
        ...ADMIN_USER_PROFILE,
        role: 'admin'
      };
      saveUserProfile(updated);
      setSuccessMsg('Faculty Administrator Access Granted! Opening Control Center...');
      setTimeout(() => {
        onLoginSuccess(updated);
      }, 600);
    } else {
      setErrorMsg('Invalid Administrator Passcode. (Try default: "admin123" or "2026")');
    }
  };

  const examOptions: ExamCategory[] = [
    'UPSC Civil Services',
    'Banking (IBPS/SBI/RBI)',
    'SSC (CGL/CHSL/MTS)',
    'Railways (RRB NTPC/Group D)',
    'Class 12 Aptitude & Entrance',
    'Class 10 Foundation Aptitude',
    'General Studies & Science'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950 dark:selection:bg-amber-500/30 dark:selection:text-amber-200 transition-colors duration-200">
      
      {/* Top Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-8 py-4 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal Overview</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
            <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Nirmala Memorial Foundation College (Autonomous)</span>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle size="sm" />

            <button
              onClick={onGuestAccess}
              className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              Guest Demo Mode
            </button>
          </div>

        </div>
      </header>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Card Banner */}
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center border border-amber-300 dark:border-amber-800">
                <GraduationCap className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-serif">
                  Examination & Candidate Login
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Competitive Exam and Current Affairs Mock Test Portal • Autonomous Year 2026-27
                </p>
              </div>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/50 p-2 gap-2 text-xs font-bold">
            <button
              onClick={() => { setAuthMode('persona'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 px-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'persona'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Personas</span>
            </button>

            <button
              onClick={() => { setAuthMode('custom'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 px-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'custom'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate Sign In</span>
            </button>

            <button
              onClick={() => { setAuthMode('admin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2.5 px-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Faculty Admin</span>
            </button>
          </div>

          {/* Notifications */}
          {errorMsg && (
            <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            
            {/* Mode 1: 1-Click Fast Student Persona */}
            {authMode === 'persona' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Select a pre-configured student or faculty profile to log in instantly with populated stats and history:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Persona 1: Shivraj Gond */}
                  <div
                    onClick={() => handlePersonaSelect('shivraj')}
                    className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                        name="Shivraj Gond"
                        size="lg"
                        className="group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Shivraj Gond</h3>
                          <span className="px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[10px] font-bold rounded">
                            Roll #29
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">UPSC Civil Services</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">TYBSc-IT • Autonomous</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Streak: <strong className="text-amber-700 dark:text-amber-400 font-bold">14 Days</strong></span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Sign In</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Persona 2: Chris Anthony */}
                  <div
                    onClick={() => handlePersonaSelect('chris')}
                    className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                        name="Chris Anthony"
                        size="lg"
                        className="group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Chris Anthony</h3>
                          <span className="px-1.5 py-0.2 bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 text-[10px] font-bold rounded">
                            Roll #09
                          </span>
                        </div>
                        <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Banking (IBPS/SBI) & SSC</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">TYBSc-IT • Autonomous</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Streak: <strong className="text-blue-600 dark:text-blue-400 font-bold">9 Days</strong></span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Sign In</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>

                {/* Faculty Quick Button */}
                <div
                  onClick={() => handlePersonaSelect('admin')}
                  className="mt-4 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-700 cursor-pointer flex items-center justify-between group text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        Quick Faculty Admin Access (Prof. Shraddha Parab)
                      </span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">Manage mock tests, question banks, and cohort scorecards</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-amber-700 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            )}

            {/* Mode 2: Custom Candidate Sign-In & Registration */}
            {authMode === 'custom' && (
              <form onSubmit={handleCustomLogin} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Candidate Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Roll / Hall Ticket No. *</label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="e.g. 2026-NMF-108"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@nmf.edu.in"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Reservation Category (for Cutoff)</label>
                    <select
                      value={candidateCategory}
                      onChange={(e) => setCandidateCategory(e.target.value as CategoryName)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="UR">UR (General Merit)</option>
                      <option value="OBC">OBC (Other Backward Classes)</option>
                      <option value="EWS">EWS (Economically Weaker Section)</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Target Examination *</label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as ExamCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    {examOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">College / Autonomous Institution</label>
                  <input
                    type="text"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    placeholder="Nirmala Memorial Foundation College of Commerce and Science (Autonomous)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Enter Examination Dashboard</span>
                </button>
              </form>
            )}

            {/* Mode 3: Administrator / Faculty Login */}
            {authMode === 'admin' && (
              <form onSubmit={handleAdminAuth} className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Faculty & Department Authority Access</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Access restricted to faculty supervisor (Prof. Shraddha Parab) and authorized exam coordinators.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Security PIN / Passcode *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="Enter Admin PIN (e.g. admin123 or 2026)"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Default demo passcodes: <code className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-1 py-0.5 rounded border border-amber-200 dark:border-amber-800">admin123</code> or <code className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-1 py-0.5 rounded border border-amber-200 dark:border-amber-800">2026</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Faculty Session</span>
                </button>
              </form>
            )}

          </div>

          {/* Card Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            <span>Need help or experiencing login issues? Contact Department IT Lab Roll #29 / #09</span>
          </div>

        </div>
      </div>

      {/* Page Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-4 px-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        Nirmala Memorial Foundation College of Commerce and Science (Autonomous) • Department of Information Technology
      </footer>

    </div>
  );
};

// Helper chevron icon
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

