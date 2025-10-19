import express from 'express'

import { submitFeedback , getAllFeedbacks, deleteFeedback} from '../controllers/feedbackController.js'
import authMiddleware from '../middleware/auth.js';
import { authAdminMiddleware } from '../middleware/authAdmin.js';

const feedbackRouter = express.Router();

feedbackRouter.post("/feedback",authMiddleware ,submitFeedback)
feedbackRouter.get("/feedback",authMiddleware,authAdminMiddleware,getAllFeedbacks)
feedbackRouter.delete("/feedback",authMiddleware,authAdminMiddleware,deleteFeedback)

export default feedbackRouter;

