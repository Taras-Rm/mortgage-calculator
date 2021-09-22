const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Bank = require('../models/bank');

const router = Router();


// /api/banks/create
router.post('/create',
    [
        check('name', "Uncorrect name").isLength({ min: 5}),
        check('interestRate', "Uncorrect interestRate").isLength({ min: 2}),
        check('maxLoan', "Uncorrect maxLoan").isLength({ min: 2}),
        check('minDownPay', "Uncorrect minDownPay").isLength({ min: 2}),
        check('loanTerm', "Uncorrect loanTerm").isLength({ min: 2})
    ],
    async (req, res) => {
        try {
            // валідація полів
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Uncorrect bank creation data"
                })
            }

            const { name, interestRate, maxLoan, minDownPay, loanTerm } = req.body;

            // перевіряю чи не існує банку з такою назвою в бд
            const candidateBank = await Bank.findOne({ name });
            if (candidateBank) {
                return res.status(400).json({ message: "This bank has already exists" });
            }

            // створюю новий банк
            const bank = new Bank({ name, interestRate, maxLoan, minDownPay, loanTerm });

            await bank.save();

            res.status(201).json({ message: "Bank created!" });

        } catch (e) {
            res.status(500).json({ message: "Something was wrong, try again" });
        }
    })

// /api/banks/
router.get('/', async (req, res) => {
    try {
        const banks = await Bank.find();
        res.json(banks);
    } catch(e) {
        res.status(500).json({ message: "Something was wrong, try again" })
    }
})

// /api/banks/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const bank = await Bank.findOneAndDelete({_id: req.params.id});
        res.json(bank).json({ message: "Bank was deleted" });
    } catch(e) {
        res.status(500).json({ message: "Something was wrong, try again" })
    }
})

// /api/banks/update
router.put('/update', 
        [
            check('name', "Uncorrect name").isLength({ min: 5}),
            check('interestRate', "Uncorrect interestRate").isLength({ min: 2}),
            check('maxLoan', "Uncorrect maxLoan").isLength({ min: 2}),
            check('minDownPay', "Uncorrect minDownPay").isLength({ min: 2}),
            check('loanTerm', "Uncorrect loanTerm").isLength({ min: 2})
        ],
        async (req, res) => {
        try {
            
            // валідація полів
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Uncorrect bank creation data"
                })
            }

            const { _id, name, interestRate, maxLoan, minDownPay, loanTerm }  = req.body;

            console.log(req.body);

            const candidateBank = await Bank.findOne({ _id });
            if (!candidateBank) {
            return res.status(400).json({ message: "This bank no in db" });
            }

            const bank = await Bank.findOneAndUpdate({ _id }, { name, interestRate, maxLoan, minDownPay, loanTerm });

            await bank.save();

            res.status(201).json({ message: "Bank was updated!" });
        } catch(e) {
            res.status(500).json({ message: "Something was wrong, try again" })
        }
})

module.exports = router;
