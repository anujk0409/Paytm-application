const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router()

// getting the account balance 
router.get("/balance" , authMiddleware , async(req , res )=>{
    const account = await Account.findOne({
        userId :req.userId
    })

    res.json({
        balance : account.balance
    })
})

router.post("/transfer" , authMiddleware , async (req ,res)=>{

    const session = await mongoose.startSession()
    session.startTransaction()
    try {
    const { amount , to } = req.body

    const account = await Account.findOne({userId: req.userId}) .session(session)
    if(!account || account.balance < amount){
        await session.abortTransaction();
        session.endSession()
    return res.status(400).json({
        msg:"insufficient balance"
    })}

    const toAccount = await Account.findOne({userId:to}).session(session)
    if(!toAccount){
        await session.abortTransaction()
        session.endSession();
        return  res.status(400).json({
            msg:"invalid account"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
     
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}
catch (error) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    res.status(500).json({
        msg: "Transfer failed",
        error: error.message
    });
} finally {
    // End the session
    session.endSession();
}
})


module.exports = router;