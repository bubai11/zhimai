const express=require("express");
const router=express.Router();
router.get('/hello',async(req,res)=>{
    res.json({message:"hhhhhhh"})
})
module.exports=router;