const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    username : String ,
    password : String,
    firstname : String,
    lastname : String,
   
})

const User = mongoose.model("User" , userSchema)



const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require: true 
    },
    balance :{
        type : Number,
        require: true 

    }
})
const Account = mongoose.model("Account" , accountSchema)

module.exports ={
    User,
    Account
}