import mongoose, { Schema } from 'mongoose';
import type { Model } from 'mongoose';

// Connection state tracking with singleton promise caching to prevent race conditions
let connectionPromise: Promise<boolean> | null = null;
let isConnected = false;
let lastError: string | null = null;

export const connectToMongoDB = async (): Promise<boolean> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    lastError = 'MONGODB_URI is not set in environment variables';
    return false;
  }

  // ReadyState 1 = connected
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  // If a connection attempt is already in-flight, await and share the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      lastError = null;
      
      // Connect to MongoDB Atlas with optimized pool and timeout settings
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
        minPoolSize: 2,
        socketTimeoutMS: 45000,
      });

      isConnected = true;
      console.log('Successfully connected to MongoDB Atlas');
      return true;
    } catch (error: any) {
      isConnected = false;
      lastError = error?.message || 'Failed to connect to MongoDB Atlas';
      console.warn('MongoDB Atlas connection notice:', lastError);
      return false;
    } finally {
      connectionPromise = null;
    }
  })();

  return connectionPromise;
};

export const getDBStatus = () => {
  const readyState = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const stateStr = states[readyState] || 'unknown';

  return {
    database: 'MongoDB Atlas',
    status: stateStr,
    isConnected: readyState === 1,
    uriConfigured: Boolean(process.env.MONGODB_URI),
    host: mongoose.connection.host || null,
    dbName: mongoose.connection.name || null,
    lastError
  };
};

// --- Mongoose Schemas & Models ---

const TestAttemptSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  sessionId: { type: String, index: true },
  testId: { type: String, required: true },
  testTitle: { type: String, required: true },
  examCategory: { type: String, required: true },
  studentName: { type: String },
  rollNo: { type: String },
  selectedCategory: { type: String, required: true },
  passedCategoryCutoff: { type: Boolean, default: false },
  totalQuestions: { type: Number, required: true },
  attemptedQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  scoreMarks: { type: Number, required: true },
  maxMarks: { type: Number, required: true },
  overallCutoffMarks: { type: Number, required: true },
  passedOverallCutoff: { type: Boolean, default: false },
  accuracyPercentage: { type: Number, required: true },
  totalTimeSeconds: { type: Number, required: true },
  dateFormatted: { type: String, required: true },
  timestamp: { type: Schema.Types.Mixed },
  userAnswers: { type: Schema.Types.Mixed, default: {} },
  sectionResults: { type: [Schema.Types.Mixed], default: [] }
}, {
  timestamps: true,
  minimize: false
});

const UserProfileSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  sessionId: { type: String },
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  className: { type: String, required: true },
  academicYear: { type: String, required: true },
  email: { type: String, required: true },
  institute: { type: String, required: true },
  targetExam: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  streakDays: { type: Number, default: 1 },
  lastActiveDate: { type: String }
}, {
  timestamps: true
});

const QuestionSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  section: { type: String, required: true },
  topic: { type: String, required: true },
  examCategory: { type: String, required: true },
  passage: { type: String },
  text: { type: String, required: true },
  options: [{
    id: { type: String, required: true },
    text: { type: String, required: true }
  }],
  correctOptionId: { type: String, required: true },
  explanation: { type: String, required: true },
  difficulty: { type: String, default: 'Medium' },
  examTag: { type: String },
  dateAdded: { type: String }
}, {
  timestamps: true
});

const CurrentAffairsSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  fullArticle: { type: String, required: true },
  keyTakeaways: { type: [String], default: [] },
  category: { type: String, required: true },
  date: { type: String, required: true },
  readTimeMinutes: { type: Number, default: 3 },
  source: { type: String, default: 'Official PIB' },
  tags: { type: [String], default: [] },
  practiceQuestion: { type: Schema.Types.Mixed }
}, {
  timestamps: true
});

const MockTestSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  examCategory: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  overallTimeLimitMinutes: { type: Number, required: true },
  marksPerQuestion: { type: Number, required: true },
  negativeMarksPerQuestion: { type: Number, required: true },
  overallCutoffMarks: { type: Number, required: true },
  categoryCutoffs: { type: Schema.Types.Mixed, required: true },
  sections: { type: [Schema.Types.Mixed], default: [] },
  questions: { type: [Schema.Types.Mixed], default: [] }
}, {
  timestamps: true
});

// Optimized compound and sorting indexes
TestAttemptSchema.index({ createdAt: -1 });
TestAttemptSchema.index({ examCategory: 1, createdAt: -1 });
QuestionSchema.index({ examCategory: 1, section: 1 });
CurrentAffairsSchema.index({ date: -1 });
MockTestSchema.index({ examCategory: 1 });

export const TestAttemptModel: Model<any> = mongoose.models.TestAttempt || mongoose.model('TestAttempt', TestAttemptSchema);
export const UserProfileModel: Model<any> = mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);
export const QuestionModel: Model<any> = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export const CurrentAffairsModel: Model<any> = mongoose.models.CurrentAffairs || mongoose.model('CurrentAffairs', CurrentAffairsSchema);
export const MockTestModel: Model<any> = mongoose.models.MockTest || mongoose.model('MockTest', MockTestSchema);
