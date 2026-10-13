import express from 'express';
import type { Request, Response } from 'express';
const Router = express.Router;
import { 
  connectToMongoDB, 
  getDBStatus, 
  TestAttemptModel, 
  UserProfileModel, 
  QuestionModel, 
  CurrentAffairsModel, 
  MockTestModel 
} from './db.ts';

export const apiRouter = Router();

// Middleware to ensure DB connection is attempted on every API call
apiRouter.use(async (_req, _res, next) => {
  await connectToMongoDB();
  next();
});

// Database & Health Status
apiRouter.get('/status', async (_req: Request, res: Response) => {
  const status = getDBStatus();
  
  let stats = {
    testAttempts: 0,
    questions: 0,
    currentAffairs: 0,
    mockTests: 0,
    userProfiles: 0
  };

  if (status.isConnected) {
    try {
      const [attemptsCount, qCount, caCount, mtCount, pCount] = await Promise.all([
        TestAttemptModel.countDocuments(),
        QuestionModel.countDocuments(),
        CurrentAffairsModel.countDocuments(),
        MockTestModel.countDocuments(),
        UserProfileModel.countDocuments()
      ]);
      stats = {
        testAttempts: attemptsCount,
        questions: qCount,
        currentAffairs: caCount,
        mockTests: mtCount,
        userProfiles: pCount
      };
    } catch {
      // Ignore count errors if disconnected
    }
  }

  res.json({
    status: 'ok',
    database: status,
    counts: stats,
    timestamp: new Date().toISOString()
  });
});

// --- Test Attempts ---
apiRouter.get('/test-attempts', async (_req: Request, res: Response) => {
  try {
    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ source: 'local-fallback', attempts: [] });
    }
    const attempts = await TestAttemptModel.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json({ source: 'mongodb-atlas', attempts });
  } catch (error: any) {
    res.status(500).json({ error: error.message, source: 'error' });
  }
});

apiRouter.post('/test-attempts', async (req: Request, res: Response) => {
  try {
    const attemptData = req.body;
    if (!attemptData || !attemptData.id) {
      return res.status(400).json({ error: 'Attempt data with unique ID is required' });
    }

    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ 
        message: 'Saved to local buffer (MongoDB Atlas disconnected)', 
        synced: false,
        attempt: attemptData 
      });
    }

    const saved = await TestAttemptModel.findOneAndUpdate(
      { id: attemptData.id },
      { $set: attemptData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ 
      message: 'Successfully persisted attempt to MongoDB Atlas', 
      synced: true,
      attempt: saved 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- User Profile ---
apiRouter.get('/user-profile', async (req: Request, res: Response) => {
  try {
    const userId = (req.query.id as string) || 'student-shivraj-01';
    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ source: 'local-fallback', profile: null });
    }
    const profile = await UserProfileModel.findOne({ id: userId }).lean();
    res.json({ source: 'mongodb-atlas', profile });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/user-profile', async (req: Request, res: Response) => {
  try {
    const profileData = req.body;
    if (!profileData || !profileData.id) {
      return res.status(400).json({ error: 'Profile data with ID is required' });
    }

    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ 
        message: 'Saved locally (MongoDB Atlas disconnected)', 
        synced: false,
        profile: profileData 
      });
    }

    const updated = await UserProfileModel.findOneAndUpdate(
      { id: profileData.id },
      { $set: profileData },
      { upsert: true, new: true }
    );

    res.json({ 
      message: 'Successfully saved user profile to MongoDB Atlas', 
      synced: true,
      profile: updated 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Questions ---
apiRouter.get('/questions', async (_req: Request, res: Response) => {
  try {
    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ source: 'local-fallback', questions: [] });
    }
    const questions = await QuestionModel.find().sort({ createdAt: -1 }).limit(300).lean();
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.json({ source: 'mongodb-atlas', questions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/questions', async (req: Request, res: Response) => {
  try {
    const qData = req.body;
    if (!qData || !qData.id) {
      return res.status(400).json({ error: 'Question data with ID is required' });
    }

    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ message: 'Saved locally', synced: false, question: qData });
    }

    const saved = await QuestionModel.findOneAndUpdate(
      { id: qData.id },
      { $set: qData },
      { upsert: true, new: true }
    );

    res.json({ message: 'Question saved to MongoDB Atlas', synced: true, question: saved });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete('/questions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = getDBStatus();
    if (status.isConnected) {
      await QuestionModel.deleteOne({ id });
    }
    res.json({ message: 'Deleted question', id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Current Affairs ---
apiRouter.get('/current-affairs', async (_req: Request, res: Response) => {
  try {
    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ source: 'local-fallback', currentAffairs: [] });
    }
    const currentAffairs = await CurrentAffairsModel.find().sort({ date: -1 }).limit(100).lean();
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.json({ source: 'mongodb-atlas', currentAffairs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/current-affairs', async (req: Request, res: Response) => {
  try {
    const caData = req.body;
    if (!caData || !caData.id) {
      return res.status(400).json({ error: 'Current Affairs data with ID is required' });
    }

    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ message: 'Saved locally', synced: false, currentAffairs: caData });
    }

    const saved = await CurrentAffairsModel.findOneAndUpdate(
      { id: caData.id },
      { $set: caData },
      { upsert: true, new: true }
    );

    res.json({ message: 'Current affairs saved to MongoDB Atlas', synced: true, currentAffairs: saved });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete('/current-affairs/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = getDBStatus();
    if (status.isConnected) {
      await CurrentAffairsModel.deleteOne({ id });
    }
    res.json({ message: 'Deleted current affairs post', id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Mock Tests ---
apiRouter.get('/mock-tests', async (_req: Request, res: Response) => {
  try {
    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ source: 'local-fallback', mockTests: [] });
    }
    const mockTests = await MockTestModel.find().sort({ createdAt: -1 }).limit(100).lean();
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.json({ source: 'mongodb-atlas', mockTests });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/mock-tests', async (req: Request, res: Response) => {
  try {
    const testData = req.body;
    if (!testData || !testData.id) {
      return res.status(400).json({ error: 'Mock test data with ID is required' });
    }

    const status = getDBStatus();
    if (!status.isConnected) {
      return res.json({ message: 'Saved locally', synced: false, mockTest: testData });
    }

    const saved = await MockTestModel.findOneAndUpdate(
      { id: testData.id },
      { $set: testData },
      { upsert: true, new: true }
    );

    res.json({ message: 'Mock test saved to MongoDB Atlas', synced: true, mockTest: saved });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete('/mock-tests/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = getDBStatus();
    if (status.isConnected) {
      await MockTestModel.deleteOne({ id });
    }
    res.json({ message: 'Deleted mock test', id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
