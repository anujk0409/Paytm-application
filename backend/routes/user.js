const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const{ JWT_SECRET} = require("../config")
const router = express.Router()
const { User , Account} = require("../db")
const { authMiddleware } = require("../middleware")



const userSchema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname: zod.string(),
    password : zod.string()

})

router.post("/signup" , async (req , res)=>{
    const response = userSchema.safeParse(req.body)

    if(!response.success){
       return res.status(411).json({
            msg :"Incorrect inputs"
        })
        
    }
const existingUser = await  User.findOne({
    username : req.body.username
})
if(existingUser)
{
   return res.status(411).json({
        msg:"Email already taken "
    })
}
   const user = await  User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
   })
   const userId = user._id


  await Account.create({
    userId ,
    balance : 1+ Math.random()*10000
  })

   const token = jwt.sign({userId} , JWT_SECRET)

   res.status(200).json({
    token,
    msg:"user account created successfully"
   })
})


const signUpSchema = zod.object({
    username : zod.string().email(),
    password :zod.string()

})
router.post("/signin" ,async  (req , res)=>{
   const response = signUpSchema.safeParse(req.body)

   if(!response.success){
   return res.status(411).json({
        msg:"invalid input"
    })
   }
  
  const user = await User.findOne({
    username : req.body.username,
    password: req.body.password
  })
  if(user){

    const token = jwt.sign({userId : user._id} , JWT_SECRET)
    res.status(200).json({
        token ,
        msg:" user login successfully"
    })
    return ;
  }

  res.status(411).json({
    msg:"Error while login"
  })


  const updateBody = zod.object({
    password:zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional()

  })
  router.put("/" , authMiddleware , async (req , res )=>{
    const response = updateBody.safeParse(req.body)
    if(!response.success)
    {
        res.status(411).json({
            msg:"error while updating"
        })
    }
    await User.updateOne({_id :req.userId} , req.body)

    res.json({
        msg:"update successfully"
    })
  })

})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstname: {
              "$regex": filter
          }
      }, {
          lastname: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id
      }))
  })
})

module.exports = router
