const express = require("express");
const authorRouter = express.Router();
const booksData= require("../model/Bookdata")

function router(nav){

    authorRouter.get("/",(req,res)=>{
        booksData.find()
        .then((books)=>{
             res.render("author",{
            title:"Author",
            nav,
            books
        })
        })
       
    })

    authorRouter.get("/:id",(req,res)=>{
        let id = req.params.id;
        booksData.findOne({_id:id})
        .then((book)=>{
            res.render("singleAuthor",{
            nav,
            title:"Author",
            book
        })
        })
    })


    authorRouter.post("/updateAuthor/:id",(req,res)=>{
        let id = req.params.id;
        booksData.findByIdAndUpdate(id,{$set:{author:req.body.author}})
        .then(()=>{
            res.redirect("/user/admin/author")
        })
        })
    

    return authorRouter;
}


module.exports = router;
