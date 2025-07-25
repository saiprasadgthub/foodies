import express from 'express'
 const route1=express.Router()
import {user} from '../models/user.js'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator';
const jwtsecret="this is jwtsecret"
route1.post("/createuser",
    
     body('email').isEmail(),
  
  body('password','invalid password').isLength({ min: 5 })
    ,async(req,res)=>{ 
      const salt=await bcrypt.genSalt(10);
      let secpassword=await bcrypt.hash(req.body.password,salt);
  
try{
   const newUser= await user.create({ 
        name:req.body.name,
        password:secpassword, 
        email:req.body.email,
        location:req.body.location


      })
      res.json({success:true, data: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    location: newUser.location
  }});
}
catch(err)
{
    res.json({success:false,error:err.message});

}
    
})

route1.post("/loginuser",body('email').isEmail(),
  
  body('password','invalid password').isLength({ min: 5 }),
    
     
    async(req,res)=>{
         const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
let email=req.body.email;  
try{

   let userdata= await user.findOne({email:email})
       if(!userdata)
       {
        return res.status(400).json({errors:"Email id you have entered is incorrect"})
       }
       const passwordcompare=await bcrypt.compare(req.body.password,userdata.password);
       if(!passwordcompare)
       {  return res.status(400).json({errors:"Password is incorrect "})


       }
       const data={
        user:{
          id:userdata.id
        }
       }
       const authtoken=jwt.sign(data,jwtsecret);
       return  res.json({success:true,authToken:authtoken,
        user:{
            email:userdata.email,
          
        }
       });

     
}

catch(err)
{
    res.json({success:false,error:err.message});

}
    
})
export {route1}