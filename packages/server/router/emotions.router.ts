import express from 'express';
import EmotionController from '../controllers/EmotionController';

export const emotionsRouter = express.Router();

emotionsRouter.route('/topics/:id/emotion').get(EmotionController.getEmotionByTopicId);
emotionsRouter.route('/topics/:id/emotion').post(EmotionController.writeEmotionByTopicId);
emotionsRouter.route('/topics/:id/emotion').delete(EmotionController.deleteEmotionByTopicId);
