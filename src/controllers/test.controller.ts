import { Request, Response } from 'express';
import { readFileSync } from 'fs';

import { cache } from '../instances/nodeCache';
import { testBody } from '../models/test.model';

const testData = JSON.parse(readFileSync('src/testData/testData.json', 'utf8'));


const testController = {

  getData: async (req: Request, res: Response) => {
    // Находим запись в файле
    const data: testBody = testData.find((element: testBody) => 
    ((element.email === req.body.email) && (element.number === req.body.number)));

    // Получаем unix дату последнего запроса для ip с которого пришел запрос
    const latestRequestDate: number = cache.get(String(req.headers['x-forwarded-for'])) || Date.now();

    if ((Date.now() + 50) > latestRequestDate) {
      // Если текущая unix дата больше, чем та что сохранена в кэше, то этот запрос самый свежий.
      if (data) {
        return res.send(data);
      } else {
        return res.sendStatus(404);
      }
    } else {
      // Иначе вовзращаем ответ о закрытии запроса
      res.statusMessage = 'Server closed request';
      return res.status(498).end();
    }
  }

}


module.exports = testController;