import { Response, NextFunction } from 'express';


const testMiddleware = {

  checkBody: (req: any, res: Response, next: NextFunction) => { 
    /* Последовательно проверяем тело запроса и проверяем корректность его содержимого */
    if (req.body) {
      if (req.body.email && req.body.number) {
        if (!req.body.email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
          res.statusMessage = 'Invalid req.body.email';
          res.status(400).end();
        } else if (!(parseInt(req.body.number) + '' === req.body.number)) {
          res.statusMessage = 'Invalid req.body.number';
          res.status(400).end();
        } else {
          next();
        }

      } else {
        res.statusMessage = 'Invalid req.body';
        res.status(422).end();
      }

    } else {
      res.statusMessage = 'Missing req.body';
      res.status(422).end();
    }
  }
  
}


module.exports = testMiddleware;
