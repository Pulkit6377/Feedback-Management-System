import express from 'express'

import { submitFeedback , getAllFeedbacks, deleteFeedback,getMyFeedback,updateMyFeedback} from '../controllers/feedbackController.js'
import authMiddleware from '../middleware/auth.js';
import { authAdminMiddleware } from '../middleware/authAdmin.js';

const feedbackRouter = express.Router();

//user Route
feedbackRouter.post("/feedback",authMiddleware ,submitFeedback)
feedbackRouter.get("/myfeedback",authMiddleware,getMyFeedback)
feedbackRouter.put("/myfeedback/:id",authMiddleware,updateMyFeedback)


//admin Route
feedbackRouter.get("/feedback",authMiddleware,authAdminMiddleware,getAllFeedbacks)
feedbackRouter.delete("/feedback/:id",authMiddleware,authAdminMiddleware,deleteFeedback)

export default feedbackRouter;

