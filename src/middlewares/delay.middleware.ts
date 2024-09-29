import { Request, Response, NextFunction } from 'express';

import { cache } from '../instances/nodeCache';

const usedDelay: number = process.env.DELAY_MS ? parseInt(process.env.DELAY_MS) : 5000


const delayMiddleware = { 
  /* Создаем или перезаписываем запись
  key: ip с которого пришел запрос, value: unix дата запроса */
  addDelay: (req: any, res: Response, next: NextFunction) => { 
    cache.set(String(req.headers['x-forwarded-for']), Date.now() + usedDelay);
    setTimeout(() => { next() }, usedDelay);
  },
}


module.exports = delayMiddleware;
