import React, { useState } from 'react';
import { 
  ArrowLeft, 
  GraduationCap, 
  Lock, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { UserProfile, ExamCategory } from '../types';
import { switchStudentPersona, saveUserProfile } from '../data/storage';
import { ADMIN_USER_PROFILE } from '../data/seedData';
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
  const [roleMode, setRoleMode] = useState<'student' | 'admin'>('student');
  
  // Minimal candidate form fields
  const [name, setName] = useState(currentUser.name || 'Candidate Student');
  const [rollNo, setRollNo] = useState(currentUser.rollNo || '2026-NMF-101');
  const [email, setEmail] = useState(currentUser.email || 'student@nmf.edu.in');
  const [targetExam, setTargetExam] = useState<ExamCategory>(currentUser.targetExam || 'UPSC Civil Services');
  
  // Faculty PIN
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const examOptions: ExamCategory[] = [
    'UPSC Civil Services',
    'Banking (IBPS/SBI/RBI)',
    'SSC (CGL/CHSL/MTS)',
    'Railways (RRB NTPC/Group D)',
    'Class 12 Aptitude & Entrance',
    'Class 10 Foundation Aptitude',
    'General Studies & Science'
  ];

  // Quick 1-click persona switch
  const handleQuickPersona = (persona: 'shivraj' | 'chris' | 'admin') => {
    setErrorMsg('');
    const updated = switchStudentPersona(persona);
    setSuccessMsg(`Welcome back, ${updated.name}!`);
    setTimeout(() => {
      onLoginSuccess(updated);
    }, 450);
  };

  // Candidate login
  const handleCandidateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !rollNo.trim() || !email.trim()) {
      setErrorMsg('Please provide your name, roll number, and email.');
      return;
    }

    const updated: UserProfile = {
      ...currentUser,
      name: name.trim(),
      rollNo: rollNo.trim(),
      email: email.trim(),
      targetExam,
      role: 'student'
    };

    saveUserProfile(updated);
    setSuccessMsg('Signing in...');
    setTimeout(() => {
      onLoginSuccess(updated);
    }, 450);
  };

  // Faculty Admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (adminPin === 'admin123' || adminPin === '2026' || adminPin === 'admin') {
      const updated: UserProfile = {
        ...ADMIN_USER_PROFILE,
        role: 'admin'
      };
      saveUserProfile(updated);
      setSuccessMsg('Faculty admin authenticated!');
      setTimeout(() => {
        onLoginSuccess(updated);
      }, 450);
    } else {
      setErrorMsg('Invalid passcode. Use demo passcode: admin123 or 2026');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200 selection:bg-amber-200 selection:text-amber-950 dark:selection:bg-amber-500/30 dark:selection:text-amber-200">
      
      {/* Minimal Top Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />
        </div>
      </header>

      {/* Main Minimalist Login Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-200">
          
          {/* Card Title & Branding */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 mx-auto shadow-sm shadow-amber-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in to the Competitive Exam & Assessment Portal
              </p>
            </div>
          </div>

          {/* Minimal Role Tabs */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setRoleMode('student'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleMode === 'student'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Candidate</span>
            </button>

            <button
              type="button"
              onClick={() => { setRoleMode('admin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleMode === 'admin'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Faculty Admin</span>
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Candidate Sign In Form */}
          {roleMode === 'student' && (
            <form onSubmit={handleCandidateLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Roll / Hall Ticket
                  </label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="2026-NMF-101"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Exam
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as ExamCategory)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    {examOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@nmf.edu.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Faculty Admin Form */}
          {roleMode === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Security Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter passcode (default: admin123 or 2026)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                    autoFocus
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Demo passcodes: <code className="font-mono text-amber-700 dark:text-amber-400">admin123</code> or <code className="font-mono text-amber-700 dark:text-amber-400">2026</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Faculty Access</span>
              </button>
            </form>
          )}

          {/* 1-Click Fast Profile Switcher */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Quick Demo Access:
              </span>
              <button
                type="button"
                onClick={onGuestAccess}
                className="text-amber-700 dark:text-amber-400 hover:underline font-bold cursor-pointer"
              >
                Guest Mode
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersona('shivraj')}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center transition-colors cursor-pointer"
              >
                <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">Shivraj</span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Roll #29</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('chris')}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center transition-colors cursor-pointer"
              >
                <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">Chris</span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Roll #09</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('admin')}
                className="p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100/60 dark:hover:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-center transition-colors cursor-pointer"
              >
                <span className="block text-xs font-bold text-amber-900 dark:text-amber-300 truncate">Faculty</span>
                <span className="block text-[10px] text-amber-700 dark:text-amber-400">Admin</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
        Autonomous Competitive Exam & Current Affairs Portal
      </footer>

    </div>
  );
};
