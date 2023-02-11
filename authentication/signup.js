const express = require('express');
const router = express.Router();
const User = require("../schemas/user");
const Posts = require("../schemas/post");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authorizationValidation = require("../middleware/middleware")
// const user = require("./");
router.get("/router",(req,res)=>{
    res.send('done')
})

router.post("/signup",async(req,res)=>{
    try{

        console.log(req.body);
        const {userName,password,confirmPassword} = req.body;
        // console.log(req.body);
        let user = await User.findOne({userName:userName});
        if(user){
            return res.status(400).json({
                error:"user already existed"
            })
        }
        bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                console.log(err)
            }
            user = await User.create({
                userName,
                password:hash,
                confirmPassword:hash
            });
            
            res.json({
                message:"succesfully registered",
               user
            })
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }



})


    router.post("/signin",async(req,res)=>{
            try{
            const {userName,password}= req.body;
            console.log(userName)
            const user = await User.findOne({userName:userName});
            console.log(user,"user")
            if(!user){
                return res.status(422).json({
                    error:"invalid user name or password"
                })
            }
            let loginPassword = await bcrypt.compare(password,user.password);
            console.log(loginPassword.valueOf,"loginpassword")
            // if(!loginPassword){
            //     return res.status(402).json({
            //         error:"invalid user name or password"
            //     })
            // }
                if(loginPassword === true){
                    const token = jwt.sign({_id:user._id},process.env.SECRETKEY);
                    const {userName} = user;
                    res.json({
                        token,userName
                    })
                }
                else{
                    return res.status(422).json({
                        status:"Failed",
                        error:"plese verify user details and try again"
                    })
                }

            res.json({
                message:"succesfully signin",
               user
            })
        }catch(err){
    
        }
        })

        router.get("/alldata",async(req,res)=>{
            try{

            }catch(err){
                res.status(400).json({
                    error:err.message
                })
            }
        })

      router.post("/addBooks",authorizationValidation, async(req,res)=>{
        try{
            const {Title,Author,ISBN,Publisher,Published_date,Publisher_of_Book} = req.body
            const bookAdd = {Title:Title,
                Author:Author,
                ISBN:ISBN,
                Publisher:Publisher,
                Published_date:Published_date,
                Publisher_of_Book:Publisher_of_Book

            }
            console.log(req.body.addBookData)
            // const newBookAdd = await Activity.create(bookAdd);
            // const user = await User.findById(req.user._id)
            // user.tasks.push(newBookAdd._id)
            // await user.save();
            const post = await Posts.create(req.body.addBookData)
            res.status(201).json({
                message:"task created"
                
            })
           
        }catch(err){
            res.status(402).json({
                error:err.message
            })
        }
      })
      router.get("/getBooks",authorizationValidation, async(req,res)=>{
        try{
            const posts = await Posts.find();
            res.json({

                posts
            })
        }catch(err){
            res.status(400).json({
                error:err.message
            })
        }
      })

module.exports = router;