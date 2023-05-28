import express from 'express';
import EmotionController from '../controllers/EmotionController';

const emotionRouter = express.Router();

emotionRouter.route('/topics/:id/emotion').get(EmotionController.getEmotionByTopicId);
emotionRouter.route('/topics/:id/emotion').post(EmotionController.writeEmotionByTopicId);

export default emotionRouter;
