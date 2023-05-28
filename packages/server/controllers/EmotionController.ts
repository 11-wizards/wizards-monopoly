import { Response, Request } from 'express';

class EmotionController {
  async getEmotionByTopicId(req: Request, res: Response) {
    console.log(req, res);
  }

  async writeEmotionByTopicId(req: Request, res: Response) {
    console.log(req, res);
  }
}

export default new EmotionController();
