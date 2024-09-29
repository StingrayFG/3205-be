import { Router } from 'express';

const testController = require('../controllers/test.controller.ts');
const testMiddleware = require('../middlewares/test.middleware.ts');
const delayMiddleware = require('../middlewares/delay.middleware.ts');

const router = Router();


router.post('/get', delayMiddleware.addDelay, testMiddleware.checkBody, testController.getData);


module.exports = router;
