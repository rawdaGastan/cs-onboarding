import express from 'express';
import controller from '../controllers/calc';
const router = express.Router();

router.post('/calc', (req, res, next) => {
    const firstValue: number = req.body.firstValue;
    const operator: string = req.body.operator;
    const secondValue: number = req.body.secondValue;

    const result: number = controller.calc(firstValue, operator, secondValue);
    
    res.send({ answer: result });
    next();
});
//router.post('/calculate', controller.calculate);

export = router;