const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Bank = require('../models/bank');

const router = Router();

// /api/calculator/calc
router.post('/calc',
    async (req, res) => {
        try {

            const { initLoan, downPay, nomp, name } = req.body;

            // перевіряю чи існує банк з такою назвою в бд
            const candidateBank = await Bank.findOne({ name });
            if (!candidateBank) {
                res.status(400).json({ message: "Noone bank with that name" });
                return null
            }

            function monthlyPayment(initLoan, nomp, downPay, maxBank, procBank, mdpBank, termBank) {
                if(maxBank < initLoan) {
                    return res.status(201).json({ message: "Bank can`t give that initial loan!" }); 
                }
                if(mdpBank > downPay) {
                    return res.status(201).json({ message: "Low down payment! Bank can`t give loan" });
                }
                if(termBank < nomp) {
                    return res.status(201).json({ message: "Too big number of monthly payments" });
                }
                let M = 0;
                M = ( initLoan * ( procBank / 12 ) * Math.pow(( 1 + ( procBank / 12 ) ), nomp) ) / ( Math.pow(( 1 + ( procBank / 12 ) ), nomp) - 1 );

                console.log(M)
                return res.status(201).json({ data: M.toString() });
            }

            monthlyPayment(initLoan, nomp, downPay, candidateBank.maxLoan, candidateBank.interestRate, candidateBank.minDownPay, candidateBank.loanTerm);
            

        } catch (e) {
            res.status(500).json({ message: "Something was wrong, try again" });
        }
    })

module.exports = router;
