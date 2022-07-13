const express = require("express");
const booksRouter = express.Router();
const bookdata = require("../model/Bookdata");


function router(nav){

//books page
booksRouter.get("/",(req,res)=>{
        bookdata.find()
        .then((books)=>{
            res.render("books",{
                nav,
                title:"Library App",
                books
        })
    });
});

//for display single book page - book page
booksRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    bookdata.findOne({_id:id})
    .then((book)=>{
        res.render("book",{
        nav,
        title:"Library App",
        book
    })
    })
    
})

//for deleting single book
booksRouter.get("/delete/:no",(req,res)=>{
    const no = req.params.no;
    bookdata.deleteOne({"_id":no})
    .then(()=>{
        res.redirect('/user/admin/books');
    })
  

})


return booksRouter;
}


module.exports = router;
