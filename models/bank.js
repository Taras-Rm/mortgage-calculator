const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    interestRate: {type: Number, required: true},
    maxLoan: {type: Number, required: true},
    minDownPay: {type: Number, required: true},
    loanTerm: {type: Number, required: true},
    // для історії банку
    history: {type: Types.ObjectId, ref: "History"}
})

module.exports = model("Bank", schema);
