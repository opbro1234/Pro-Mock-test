import React, { useState } from 'react';
import { UserProfile, UserStats, TestAttempt, ExamCategory } from '../types';
import { 
  User, 
  GraduationCap, 
  Building2, 
  Award, 
  Calendar, 
  Target, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Save, 
  ShieldCheck,
  FileText,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { saveUserProfile } from '../data/storage';
import { Avatar } from './Avatar';

interface UserProfileViewProps {
  user: UserProfile;
  stats: UserStats;
  attempts: TestAttempt[];
  onProfileUpdated: (updated: UserProfile) => void;
  onViewAttemptScorecard: (attempt: TestAttempt) => void;
  onOpenAuthModal: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  stats,
  attempts,
  onProfileUpdated,
  onViewAttemptScorecard,
  onOpenAuthModal
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [rollNo, setRollNo] = useState(user.rollNo);
  const [className, setClassName] = useState(user.className);
  const [academicYear, setAcademicYear] = useState(user.academicYear);
  const [email, setEmail] = useState(user.email);
  const [institute, setInstitute] = useState(user.institute);
  const [targetExam, setTargetExam] = useState<ExamCategory>(user.targetExam);
  const [avatar, setAvatar] = useState(user.avatar);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: name.trim(),
      rollNo: rollNo.trim(),
      className: className.trim(),
      academicYear: academicYear.trim(),
      email: email.trim(),
      institute: institute.trim(),
      targetExam,
      avatar
    };
    saveUserProfile(updated);
    onProfileUpdated(updated);
    setIsEditing(false);
    setSavedMsg('Candidate Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div id="user-profile-container" className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Profile Overview Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left z-10">
          <Avatar
            src={user.avatar}
            name={user.name}
            role={user.role}
            size="xl"
            className="shadow-md"
          />

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {user.role.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Roll #{user.rollNo} • Class: {user.className} • Academic Year {user.academicYear}</span>
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{user.institute}</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-1 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 rounded-lg text-xs font-bold">
                Target: {user.targetExam}
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> {user.streakDays} Days Streak
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 shrink-0 z-10">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile Details'}</span>
          </button>

          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Switch Persona / Faculty Mode</span>
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Edit Profile Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Update Candidate Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Student Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Roll Number *</label>
              <input
                type="text"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Class / Division</label>
              <input
                type="text"
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Academic Year</label>
              <input
                type="text"
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Target Exam</label>
              <select
                value={targetExam}
                onChange={e => setTargetExam(e.target.value as ExamCategory)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 font-semibold transition-colors"
              >
                <option value="Class 12 Aptitude & Entrance">Class 12 Aptitude & Entrance</option>
                <option value="Class 10 Foundation Aptitude">Class 10 Foundation Aptitude</option>
                <option value="UPSC Civil Services">UPSC Civil Services</option>
                <option value="SSC (CGL/CHSL/MTS)">SSC (CGL/CHSL/MTS)</option>
                <option value="Banking (IBPS/SBI/RBI)">Banking (IBPS/SBI/RBI)</option>
                <option value="Railways (RRB NTPC/Group D)">Railways (RRB NTPC/Group D)</option>
                <option value="General Studies & Science">General Studies & Science</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 text-xs">College / Educational Institution</label>
            <input
              type="text"
              value={institute}
              onChange={e => setInstitute(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </form>
      )}

      {/* Preparation Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Tests Attempted</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.totalTestsTaken}</p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">{stats.testsPassed} Tests Passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Overall Accuracy</span>
          <p className="text-2xl sm:text-3xl font-black text-cyan-800 dark:text-cyan-400 font-mono">
            {stats.averageAccuracy > 0 ? `${stats.averageAccuracy}%` : '85%'}
          </p>
          <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-semibold">Across All Sections</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Highest Score</span>
          <p className="text-2xl sm:text-3xl font-black text-amber-800 dark:text-amber-400 font-mono">{stats.highestScore || 18.0}</p>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Top Benchmark Score</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Practice Time</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.totalPracticeTimeMinutes || 42}m</p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Timed Practice</span>
        </div>
      </div>

      {/* Test Attempt History Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Past Test Attempts & Scorecards ({attempts.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Review detailed scorecards and download printable reports</p>
          </div>
        </div>

        {attempts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
            <Award className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">No Test Attempts Recorded</h4>
            <p className="text-xs">Start a mock test to build your exam performance history.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Test Title</th>
                  <th className="px-4 py-3">Exam Type</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3 text-center">Score</th>
                  <th className="px-4 py-3 text-center">Accuracy</th>
                  <th className="px-4 py-3 text-center">Result</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {attempts.map(att => {
                  const isPassed = att.passedOverallCutoff || att.passedCategoryCutoff;
                  return (
                    <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">{att.testTitle}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{att.examCategory}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{att.dateFormatted}</td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-amber-800 dark:text-amber-400">
                        {att.scoreMarks.toFixed(2)} / {att.maxMarks}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-cyan-800 dark:text-cyan-400">{att.accuracyPercentage}%</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isPassed ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                        }`}>
                          {isPassed ? 'QUALIFIED' : 'FAILED'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onViewAttemptScorecard(att)}
                          className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Scorecard</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Institutional Project Approval Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Academic Project Approval & Verification Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300">
          <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider text-[11px]">Institution & Department</h4>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Nirmala Memorial Foundation College of Commerce and Science (Autonomous)
            </p>
            <p className="text-slate-500 dark:text-slate-400">Department of Information Technology</p>
            <p className="text-slate-500 dark:text-slate-400">B.Sc.I.T Degree Programme • Semester V • Academic Year 2026-27</p>
          </div>

          <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-cyan-800 dark:text-cyan-400 uppercase tracking-wider text-[11px]">Project Team & Guide</h4>
            <p className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Project Title:</strong> Competitive Exam and Current Affairs Mock Test Portal</p>
            <p className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Student Candidates:</strong> Shivraj Gond (Roll #29) & Chris Anthony (Roll #09)</p>
            <p className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Project Guide:</strong> Prof. Shraddha Parab</p>
          </div>
        </div>
      </div>

    </div>
  );
};
