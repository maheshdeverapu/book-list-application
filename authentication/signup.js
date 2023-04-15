const express = require('express');
const router = express.Router();
const User = require("../schemas/user");
const Posts = require("../schemas/post");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authorizationValidation = require("../middleware/middleware")
router.get("/router",(req,res)=>{
    res.send('done')
})

router.post("/signup",async(req,res)=>{
    try{
        const {userName,password,confirmPassword} = req.body;
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
            const user = await User.findOne({userName:userName});
            if(!user){
                return res.status(422).json({
                    error:"invalid user name or password"
                })
            }
            let loginPassword = await bcrypt.compare(password,user.password);
                if(loginPassword === true){
                    const token = jwt.sign({_id:user._id},process.env.SECRETKEY);
                    const {userName} = user;
                    res.json({
                        token,user
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
            const user = await User.findOne({_id:req.body.user._id})
            const post = await Posts.create(req.body.addBookData);
            user.books.push(post._id);
            await user.save();
            res.status(201).json({
                message:"task created"             
            })        
        }catch(err){
            res.status(402).json({
                error:err.message
            })
        }
      })
      router.get("/getBooks/:id",authorizationValidation, async(req,res)=>{
        try{
            let user= await User.findById(req.params.id)
       let books=user.books
       var book_ids= books.map(function(id){return String(id)})
       let data= await Posts.find({"_id":{$in:book_ids}})   
            res.json({
                data
            })
        }catch(err){
            res.status(400).json({
                error:err.message
            })
        }
      })
      router.put("/updateBook/:id", async (req, res) => {
        try {
           let book= await Posts.findById(req.params.id)
           let update= await Posts.updateOne(
            {_id:req.params.id},
            {
                $set:req.body.addBookData
            })
            res.json({
                messgae:"book updated",
                book
            })
        } catch (error) {
            res.json({
                error:error.message
            })
    }
    })

    router.delete("/deleteBook/:id", async (req, res) => {
        try {   
            console.log(req.params.id);
                    let book= await Posts.findOne({_id:req.params.id})
                    await book.remove()
                    let user= await User.findById(req.params.userName)
                    let index=user.books.indexOf(req.params.id)
                    user.books.splice(index,1)
                    await user.save()
                     res.json({
                         messgae:"book deleted"
                     })
                 } catch (error) {
                     res.json({
                         error:error.message
                     })
             }
    })

module.exports = router;