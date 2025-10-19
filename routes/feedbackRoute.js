import express from 'express'

import { submitFeedback , getAllFeedbacks} from '../controllers/feedbackController.js'
import authMiddleware from '../middleware/auth.js';

const feedbackRouter = express.Router();

feedbackRouter.post("/feedback",authMiddleware ,submitFeedback)
feedbackRouter.get("/feedback",authMiddleware,getAllFeedbacks)

export default feedbackRouter;

