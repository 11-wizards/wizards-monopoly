import { Response, Request } from 'express';
import { Topic } from '../models/Topic';
import { Emotion } from '../models/Emotion';

class EmotionController {
  async getEmotionByTopicId(req: Request, res: Response) {
    const { id } = req.params;
    const desiredTopic = await Topic.findOne({
      where: {
        topic_id: id,
      },
      include: Emotion,
    });
    if (!desiredTopic) {
      res.status(404).json({
        message: 'Топик не был найден',
      });
      return;
    }
    res.status(200).json({
      emotions: desiredTopic.get().Emotions,
    });
  }
  async writeEmotionByTopicId(req: Request, res: Response) {
    const { id } = req.params;
    const { emotion } = req.body;
    const desiredTopic = await Topic.findOne({
      where: { topic_id: id },
    });
    if (!desiredTopic) {
      res.status(404).json({
        message: 'Топик не был найден',
      });
      return;
    }
    await Emotion.create({
      topic_id: id,
      emotion,
    });
    res.status(200).json({
      message: 'Смайлик был записан',
    });
  }
}

export default new EmotionController();
